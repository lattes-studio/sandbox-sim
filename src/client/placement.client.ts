import { constructorE, place } from "modules/placementMan";
import { Players, ReplicatedStorage, Workspace } from "@rbxts/services";

/*
gridSize1: number,
items1: Folder,
rotateKey1: Enum.KeyCode,
killerKey1: Enum.KeyCode,
placed1: Folder,
plot1: Model,
itemName1: string,
*/
const plot = ReplicatedStorage.signals.RequestPlot.InvokeServer() as Model;
const base = plot.FindFirstChild("base") as Part;
if (plot.IsA("Player")) Players.LocalPlayer.Kick("PLOT_ERROR");
const items = plot.FindFirstChild("items") as Folder;
constructorE(1, ReplicatedStorage.models, Enum.KeyCode.R, Enum.KeyCode.B, items, plot, "block");

const mouse = Players.LocalPlayer.GetMouse();

mouse.Button1Down.Connect(() => {
	place();
});

Players.LocalPlayer.CharacterAdded.Connect((char) => {
	wait(0.5);
	char.PivotTo(new CFrame(base.Position.X, base.Position.Y + 20, base.Position.Z));
});
const char = Players.LocalPlayer.Character as Model;
wait(0.5);
char.PivotTo(new CFrame(base.Position.X, base.Position.Y + 20, base.Position.Z));
