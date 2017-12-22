/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.elements_1 {

	export class UI_MapCell extends fairygui.GComponent {

		public kind:fairygui.Controller;
		public n0:fairygui.GGraph;

		public static URL:string = "ui://u4vu42kzh02b1";

		public static createInstance():UI_MapCell {
			return <UI_MapCell><any>(fairygui.UIPackage.createObject("elements_1","MapCell"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.kind = this.getControllerAt(0);
			this.n0 = <fairygui.GGraph><any>(this.getChildAt(0));
		}
	}
}