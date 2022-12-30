/* eslint-disable roblox-ts/lua-truthiness */
import { ReplicatedStorage, Workspace } from "@rbxts/services";

function snap(x: number, gridSize: number) {
	return math.round(x / gridSize) * gridSize;
}

function isHit(object: Part | UnionOperation) {
	let hit = false;
	object.GetTouchingParts().forEach((part) => {
		if (part.IsDescendantOf(object) || part.Name === "base") return;
		hit = true;
	});
	return hit;
}

ReplicatedStorage.signals.Place.OnServerInvoke = function (player, name1, placed1, position1, plot, gridSize1) {
	const name = name1 as string;
	const placed = placed1 as Folder;
	const position = position1 as CFrame;
	const gridSize = gridSize1 as number;
	const item = ReplicatedStorage.models.FindFirstChild(name)?.Clone() as Part | UnionOperation;
	if (isHit(item)) return item.Destroy();
	item.PivotTo(position);
	item.PivotTo(new CFrame(snap(position.X, gridSize), position.Y, snap(position.Z, gridSize)).mul(position.Rotation));
	if (!item || !plot) return item.Destroy();
	const plot1 = plot as Folder;
	const owner = plot1.FindFirstChild("owner") as StringValue;
	// if (owner.Value !== player.Name) return;
	item.Parent = placed;
};
