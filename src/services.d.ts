interface ReplicatedStorage extends Instance {
	models: Folder;
	signals: Folder & {
		Place: RemoteFunction;
	};
}

interface Workspace extends Model {
	Map: Model & {
		Baseplate: Part;
	};
	plots: Folder & {
		plot6: Model & {
			items: Folder;
			owner: StringValue;
			base: Part;
		};
		plot4: Model & {
			items: Folder;
			owner: StringValue;
			base: Part;
		};
		plot1: Model & {
			items: Folder;
			owner: StringValue;
			base: Part;
		};
		plot2: Model & {
			items: Folder;
			owner: StringValue;
			base: Part;
		};
		plot5: Model & {
			items: Folder;
			owner: StringValue;
			base: Part;
		};
		plot3: Model & {
			items: Folder;
			owner: StringValue;
			base: Part;
		};
	};
}
