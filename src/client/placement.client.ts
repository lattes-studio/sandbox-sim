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
constructorE(
	1,
	ReplicatedStorage.models,
	Enum.KeyCode.R,
	Enum.KeyCode.B,
	Workspace.plots.plot2.items,
	Workspace.plots.plot2,
	"block",
);

const mouse = Players.LocalPlayer.GetMouse();

mouse.Button1Down.Connect(() => {
	place();
});
