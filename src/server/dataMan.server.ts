/* eslint-disable roblox-ts/lua-truthiness */
import { DataStoreService, Players, ReplicatedStorage } from "@rbxts/services";
import { requestPlot } from "./plotDude";
const prefix = "V008>";
const DataStore = DataStoreService.GetDataStore("<BASE_DATA_" + prefix);
function set(player: Player) {
	const plot = requestPlot(player) as Folder;
	const base = plot.FindFirstChild("base") as Part;
	const count = 0;
	const data = new Array<string>();
	print(plot);
	plot.FindFirstChild("items")
		?.GetChildren()
		.forEach((item) => {
			if (!item.IsA("Part") && !item.IsA("UnionOperation")) return print(item);
			const itemData = `${tostring(item.Name)};${tostring(item.Position.X - base.Position.X)};${tostring(
				item.Position.Y - base.Position.Y,
			)};${tostring(item.Position.Z - base.Position.Z)};${tostring(item.Rotation.Y)}`;
			data.push(itemData);
			print(itemData);
		});
	print(data);
	const dataString = data.join("|");
	print(dataString);

	DataStore.SetAsync(prefix + tostring(player.UserId), dataString);
}

function get(player: Player) {
	wait(0.1);
	const plot = requestPlot(player) as Folder;
	const base = plot.FindFirstChild("base") as Part;
	const items = plot.FindFirstChild("items") as Model;
	let data = "";

	const data1 = DataStore.GetAsync(prefix + tostring(player.UserId));
	data = data1[0] as string;
	print(data);

	if (data) {
		const dataList = data.split("|");
		dataList.forEach((value) => {
			const item = value.split(";");
			const model = ReplicatedStorage.models.WaitForChild(item[0]).Clone() as Part | UnionOperation;
			if (!model) return warn(`model not found for ${item[0]}`);
			print(model.Position);
			model.Orientation = new Vector3(0, tonumber(item[4]), 0);
			const [x, y, z] = [tonumber(item[1]) as number, tonumber(item[2]) as number, tonumber(item[3]) as number];
			model.PivotTo(new CFrame(x, y, z).add(base.Position));
			model.Parent = items;
			print(model.Position);
		});
		return data;
	} else {
		return {};
	}
}

Players.PlayerAdded.Connect(get);
Players.PlayerRemoving.Connect(set);

game.BindToClose(function () {
	Players.GetPlayers().forEach(set);
});
