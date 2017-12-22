/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.elements_1 {

	export class UI_Tank extends fairygui.GComponent {

		public kind:fairygui.Controller;
		public color:fairygui.Controller;
		public n0:fairygui.GGraph;
		public n1:fairygui.GGraph;

		public static URL:string = "ui://u4vu42kzh02b0";

		public static createInstance():UI_Tank {
			return <UI_Tank><any>(fairygui.UIPackage.createObject("elements_1","Tank"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.kind = this.getControllerAt(0);
			this.color = this.getControllerAt(1);
			this.n0 = <fairygui.GGraph><any>(this.getChildAt(0));
			this.n1 = <fairygui.GGraph><any>(this.getChildAt(1));
		}
	}
}