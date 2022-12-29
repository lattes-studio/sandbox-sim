/* eslint-disable roblox-ts/lua-truthiness */
import Roact from "@rbxts/roact";
import { StarterGui, Players } from "@rbxts/services";

const player = Players.LocalPlayer;
const Gui = player.WaitForChild("PlayerGui");

StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, false);
StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Chat, true);

const element = (
	<screengui
		Key="ScreenGui"
		IgnoreGuiInset={true}
		Change={{
			AbsoluteSize: (rbx) => {
				const menu = rbx.FindFirstChild("menu") as Frame;
				const ratio = rbx.AbsoluteSize.X / 3 / (rbx.AbsoluteSize.Y / 2);
				if (ratio < 1) menu.Size = new UDim2(0, rbx.AbsoluteSize.X, 0, rbx.AbsoluteSize.X * 0.66);
				if (ratio > 1) menu.Size = new UDim2(0, rbx.AbsoluteSize.Y * 1.5, 0, rbx.AbsoluteSize.Y);
				if (ratio === 1) menu.Size = new UDim2(0, rbx.AbsoluteSize.X / 1.5, 0, rbx.AbsoluteSize.Y / 1.5);
				menu.Position = new UDim2(0.5, -menu.Size.X.Offset / 2, 0.5, -menu.Size.Y.Offset / 2);
			},
		}}
	>
		<frame
			Key="menu"
			Size={new UDim2(0, 600, 0, 400)}
			Position={new UDim2(0.5, -300, 0.5, -200)}
			BackgroundTransparency={1}
			Visible={true}
			Event={{
				InputBegan: (rbx, Input) => {
					let menu: Frame;
					print(Input.KeyCode);
					switch (Input.KeyCode) {
						case Enum.KeyCode.H:
							menu = rbx.WaitForChild("help") as Frame;
							break;
						case Enum.KeyCode.Tab:
							menu = rbx.WaitForChild("stats") as Frame;
							break;
						case Enum.KeyCode.Q:
							menu = rbx.WaitForChild("quests") as Frame;
							break;
						default:
							return;
					}
					if (menu.Visible) return (menu.Visible = false);
					rbx.Parent?.Parent?.WaitForChild("menu")
						.GetChildren()
						.forEach((child) => {
							if (child.IsA("Frame")) child.Visible = false;
						});
					menu.Visible = true;
					return;
				},
			}}
		/>
	</screengui>
);

Roact.mount(element, Gui);
