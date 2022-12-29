/* eslint-disable roblox-ts/lua-truthiness */
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";

const player = Players.LocalPlayer;
const parent = player.WaitForChild("PlayerGui").WaitForChild("ScreenGui");

const element = (
	<frame Key="SideBar" Size={new UDim2(0.1, 0, 0.5, 0)} Position={new UDim2(0, 5, 0.25, 0)} Transparency={1}>
		<textbutton
			Text={"?"}
			TextColor3={new Color3(1, 1, 1)}
			TextStrokeTransparency={1}
			TextScaled={true}
			TextXAlignment={"Center"}
			Size={new UDim2(0, 25, 0, 25)}
			Position={new UDim2(0, 0, 0, 0)}
			BackgroundColor3={new Color3(0, 0, 0)}
			Event={{
				Activated: (rbx) => {
					const menu = rbx.Parent?.Parent?.WaitForChild("menu").WaitForChild("help") as Frame;
					if (menu.Visible) return (menu.Visible = false);
					rbx.Parent?.Parent?.WaitForChild("menu")
						.GetChildren()
						.forEach((child) => {
							if (child.IsA("Frame")) child.Visible = false;
						});
					menu.Visible = true;
				},
			}}
		>
			<uicorner CornerRadius={new UDim(0, 5)} />
			<uistroke Thickness={2} Color={new Color3(0, 0.25, 1)} />
		</textbutton>
		<textbutton
			Text={"%"}
			TextColor3={new Color3(1, 1, 1)}
			TextStrokeTransparency={1}
			TextScaled={true}
			TextXAlignment={"Center"}
			Size={new UDim2(0, 25, 0, 25)}
			Position={new UDim2(0, 0, 0, 30)}
			BackgroundColor3={new Color3(0, 0, 0)}
			Event={{
				Activated: (rbx) => {
					const menu = rbx.Parent?.Parent?.WaitForChild("menu").WaitForChild("stats") as Frame;
					if (menu.Visible) return (menu.Visible = false);
					rbx.Parent?.Parent?.WaitForChild("menu")
						.GetChildren()
						.forEach((child) => {
							if (child.IsA("Frame")) child.Visible = false;
						});
					menu.Visible = true;
				},
			}}
		>
			<uicorner CornerRadius={new UDim(0, 5)} />
			<uistroke Thickness={2} Color={new Color3(0, 0.25, 1)} />
		</textbutton>
		<textbutton
			Text={"!"}
			TextColor3={new Color3(1, 1, 1)}
			TextStrokeTransparency={1}
			TextScaled={true}
			TextXAlignment={"Center"}
			Size={new UDim2(0, 25, 0, 25)}
			Position={new UDim2(0, 0, 0, 60)}
			BackgroundColor3={new Color3(0, 0, 0)}
			Event={{
				Activated: (rbx) => {
					const menu = rbx.Parent?.Parent?.WaitForChild("menu").WaitForChild("quests") as Frame;
					if (menu.Visible) return (menu.Visible = false);
					rbx.Parent?.Parent?.WaitForChild("menu")
						.GetChildren()
						.forEach((child) => {
							if (child.IsA("Frame")) child.Visible = false;
						});
					menu.Visible = true;
				},
			}}
		>
			<uicorner CornerRadius={new UDim(0, 5)} />
			<uistroke Thickness={2} Color={new Color3(0, 0.25, 1)} />
		</textbutton>
	</frame>
);

Roact.mount(element, parent);
