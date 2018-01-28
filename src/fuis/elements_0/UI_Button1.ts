/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.elements_0 {

	export class UI_Button1 extends fairygui.GButton {

		public m_button:fairygui.Controller;
		public m_bg:fairygui.GGraph;
		public m_title:fairygui.GTextField;

		public static URL:string = "ui://ybsps8tfysfl14";

		public static createInstance():UI_Button1 {
			return <UI_Button1><any>(fairygui.UIPackage.createObject("elements_0","Button1"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_button = this.getControllerAt(0);
			this.m_bg = <fairygui.GGraph><any>(this.getChildAt(0));
			this.m_title = <fairygui.GTextField><any>(this.getChildAt(1));
		}
	}
}