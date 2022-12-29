import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";

const player = Players.LocalPlayer;
const parent = player.WaitForChild("PlayerGui").WaitForChild("ScreenGui").WaitForChild("menu");

const element = (
	<frame
		Key="help"
		Visible={false}
		Size={new UDim2(0.8, 0, 0.8, 0)}
		Position={new UDim2(0.1, 0, 0.1, 0)}
		BackgroundColor3={new Color3(0, 0, 0)}
	>
		<uicorner CornerRadius={new UDim(0, 10)} />
		<uistroke Thickness={5} Color={new Color3(0, 0.25, 1)} />
	</frame>
);

Roact.mount(element, parent);
