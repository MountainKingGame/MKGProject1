/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.joysticks_1 {

	export class UI_Button1 extends fairygui.GButton {

		public m_button:fairygui.Controller;
		public m_n1:fairygui.GImage;
		public m_icon:fairygui.GLoader;

		public static URL:string = "ui://rbw1tvvvhrji1d";

		public static createInstance():UI_Button1 {
			return <UI_Button1><any>(fairygui.UIPackage.createObject("joysticks_1","Button1"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_button = this.getControllerAt(0);
			this.m_n1 = <fairygui.GImage><any>(this.getChildAt(0));
			this.m_icon = <fairygui.GLoader><any>(this.getChildAt(1));
		}
	}
}