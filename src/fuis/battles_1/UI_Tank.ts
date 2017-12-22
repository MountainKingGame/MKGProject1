/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.battles_1 {

	export class UI_Tank extends fairygui.GComponent {

		public c1:fairygui.Controller;
		public icon:fairygui.GLoader;

		public static URL:string = "ui://ybsps8tfu9bo3";

		public static createInstance():UI_Tank {
			return <UI_Tank><any>(fairygui.UIPackage.createObject("battles_1","Tank"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.c1 = this.getControllerAt(0);
			this.icon = <fairygui.GLoader><any>(this.getChildAt(0));
		}
	}
}