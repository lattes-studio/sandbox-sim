import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";

const player = Players.LocalPlayer;
const parent = player.WaitForChild("PlayerGui").WaitForChild("ScreenGui");

const element = (
	<frame
		Key="stats-bar"
		Size={new UDim2(1, 0, 0.1, -15)}
		BackgroundColor3={new Color3(0, 0, 0)}
		BackgroundTransparency={0.5}
	>
		<textlabel
			Size={new UDim2(0.1, 0, 1, 0)}
			Text="$1,000"
			BackgroundTransparency={1}
			TextColor3={new Color3(0, 1, 0.25)}
		/>
	</frame>
);

Roact.mount(element, parent);
