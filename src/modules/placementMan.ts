/* eslint-disable roblox-ts/lua-truthiness */
// imports
import { Players, RunService, ContextActionService, ReplicatedFirst, ReplicatedStorage } from "@rbxts/services";
// const variables
const player = Players.LocalPlayer;
player.CharacterAdded.Wait();
const character = player.Character;
const mouse = player.GetMouse();

let model: Model;
let hitBox: Part;
let object: Part | UnionOperation;
let placed: Folder;
let plot: Model;
let stacks: boolean;

let itemName = "";
let active = false;
let hit = false;
let texture: Texture;
let speed = 1;
const maxHeight = 80;

let posX: number;
let posY: number;
let posZ: number;
let rot = 0;

let gridSize: number;
let items: Folder;
let rotateKey: Enum.KeyCode;
let killerKey: Enum.KeyCode;
/*
functions!!
*/
// changes the object color based of hits
function coloredHit() {
	if (hit) {
		hitBox.Color = Color3.fromRGB(255, 0, 0);
	} else {
		hitBox.Color = Color3.fromRGB(0, 255, 0);
	}
}
// returns if the object is out of bounds
function bounds() {
	const base = plot.FindFirstChild("base") as Part;
	const left = base.Position.X - base.Size.X / 2;
	const right = base.Position.X + base.Size.X / 2;
	const Bottom = base.Position.Z - base.Size.Z / 2;
	const Top = base.Position.Z + base.Size.Z / 2;

	const newX = math.clamp(object.Position.X, left + object.Size.X / 2, right - object.Size.X / 2);
	const newZ = math.clamp(object.Position.Z, Bottom + object.Size.Z / 2, Top - object.Size.Z / 2);
	const newY = math.clamp(
		object.Position.Y,
		base.Position.Y + base.Size.Y / 2 + object.Size.Y / 2,
		base.Position.Y + base.Size.Y / 2 - object.Size.Y / 2 + maxHeight,
	);

	return new Vector3(newX, newY, newZ);
}
// checks if the object is hit with something
function isHit() {
	hit = false;
	object.GetTouchingParts().forEach((part) => {
		if (part.IsDescendantOf(model) || part.Name === "base") return;
		hit = true;
		return;
	});
	coloredHit();
}
// renders grid for placement
function renderGrid() {
	texture = new Instance("Texture");
	texture.StudsPerTileU = gridSize;
	texture.StudsPerTileV = gridSize;
	texture.Texture = "http://www.roblox.com/asset/?id=8420430866";
	texture.Face = Enum.NormalId.Top;
	texture.Parent = plot.FindFirstChild("base");
}
// gets the y value of the top of an object!
function getTopY(basePart: Part | UnionOperation) {
	return basePart.Position.Y + basePart.Size.Y / 2 + object.Size.Y / 2;
}
//
function snap(x: number) {
	return math.round(x / gridSize) * gridSize;
}
// get object grid position!
function getPos() {
	if (!mouse.Target?.IsA("Part") && !mouse.Target?.IsA("UnionOperation")) return;
	if (mouse.Target?.Name !== "base" && mouse.Target?.Parent?.Name !== "items") return;
	posX = snap(mouse.Hit.X);
	posY = getTopY(mouse.Target);
	posZ = snap(mouse.Hit.Z);
}
// sets a objects position based on grid value!
function setPos() {
	getPos();
	if (model.Parent !== placed) return;
	model.PivotTo(
		model.WorldPivot.Lerp(new CFrame(posX, posY, posZ).mul(CFrame.fromEulerAnglesXYZ(0, math.rad(rot), 0)), speed),
	);
	const e = bounds();
	model.MoveTo(new Vector3(e.X, e.Y, e.Z));
	isHit();
}
// rotation function
function rotate(actionName: string, inputState: Enum.UserInputState, inputObject: InputObject) {
	if (inputState !== Enum.UserInputState.Begin) return;
	rot += 90;
}
// terminate placement mode :[
function killPlace() {
	active = false;
	RunService.UnbindFromRenderStep("Input");
	ContextActionService.UnbindAction("Rotate");
	if (texture) texture.Destroy();
	if (model) model.Destroy();
}
// on[rotateKey]Pressed AKA runs when player enter build mode!  (itemName = name of item to place | placed = folder of placed items on that plot | plot = the plot to build on | stacks = if the item can be built ontop of it)
function activate() {
	editItem(itemName);
	if (!stacks) {
		mouse.TargetFilter = placed;
	} else {
		mouse.TargetFilter = model;
	}
	renderGrid();
	wait();
	speed = 0.3;
	RunService.BindToRenderStep("Input", Enum.RenderPriority.Input.Value, setPos);
	ContextActionService.BindAction("Rotate", rotate, false, rotateKey);
	active = true;
}

// toggle build mode
function toggleActive(actionName: string, inputState: Enum.UserInputState, inputObject: InputObject) {
	if (inputState !== Enum.UserInputState.Begin) return;
	if (active) {
		killPlace();
	} else {
		activate();
	}
}

export function place() {
	if (
		!object ||
		hit ||
		!active ||
		(math.abs(math.round(object.Rotation.Y)) !== 90 && math.abs(math.round(object.Rotation.Y)) !== 0)
	)
		return;
	ReplicatedStorage.signals.Place.InvokeServer(object.Name, placed, model.WorldPivot, plot, gridSize);
}

export function editItem(name: string) {
	itemName = name;
	object = items.FindFirstChild(itemName)?.Clone() as Part | UnionOperation;
	model = new Instance("Model");
	object.Parent = model;
	hitBox = new Instance("Part");
	hitBox.Anchored = true;
	hitBox.Size = object.Size.add(new Vector3(0.05, 0.05, 0.05));
	hitBox.Transparency = 0.5;
	hitBox.BrickColor = BrickColor.Red();
	hitBox.CanCollide = false;
	hitBox.Position = object.Position;
	hitBox.Parent = model;
	model.Parent = placed;
}

// setup function!   (gridSize = placement grid size | items = the folder with all items to clone from | rotateKey = Enum.KeyCode.Name for rotating items | killerKey = Enum.KeyCode.Name for exiting buildmode)
export function constructorE(
	gridSize1: number,
	items1: Folder,
	rotateKey1: Enum.KeyCode,
	killerKey1: Enum.KeyCode,
	placed1: Folder,
	plot1: Model,
	itemName1: string,
) {
	stacks = true;
	itemName = itemName1;
	gridSize = gridSize1;
	placed = placed1;
	plot = plot1;
	items = items1;
	rotateKey = rotateKey1;
	killerKey = killerKey1;
	ContextActionService.BindAction("Toggle", toggleActive, false, killerKey);
}
