import { Players, ReplicatedStorage } from "@rbxts/services";
import { givePlot, takePlot, requestPlot } from "./plotDude";

Players.PlayerAdded.Connect((player) => {
	givePlot(player);
});
Players.PlayerRemoving.Connect((player) => {
	takePlot(player);
});

ReplicatedStorage.signals.RequestPlot.OnServerInvoke = requestPlot;
ReplicatedStorage.signals.GivePlot.OnServerInvoke = takePlot;
