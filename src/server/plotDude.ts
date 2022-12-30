import { Workspace } from "@rbxts/services";
export function givePlot(player: Player) {
	let done = false;
	let ret: Instance;
	ret = player;
	Workspace.plots.GetChildren().forEach((plot) => {
		if (done) return;
		const owner = plot.FindFirstChild("owner") as StringValue;
		if (owner.Value === "") {
			done = true;
			ret = plot;
			owner.Value = player.Name;
		}
	});
	if (!done) {
		player.Kick("no plots availible");
	} else {
		return ret;
	}
}

export function requestPlot(player: Player) {
	let ret: Instance;
	ret = player;
	Workspace.plots.GetChildren().forEach((plot) => {
		const owner = plot.FindFirstChild("owner") as StringValue;
		if (owner.Value === player.Name) {
			ret = plot;
		}
	});
	return ret;
}

export function takePlot(player: Player) {
	wait(0.1);
	Workspace.plots.GetChildren().forEach((plot) => {
		const owner = plot.FindFirstChild("owner") as StringValue;
		if (owner.Value === player.Name) {
			owner.Value = "";
		}
	});
}
