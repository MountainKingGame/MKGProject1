/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.catchFishes {

	export class UI_ButtonA extends fairygui.GButton {

		public m_button:fairygui.Controller;
		public m_icon:fairygui.GImage;
		public m_title:fairygui.GTextField;

		public static URL:string = "ui://x2dkl1ufhmf22";

		public static createInstance():UI_ButtonA {
			return <UI_ButtonA><any>(fairygui.UIPackage.createObject("catchFishes","ButtonA"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_button = this.getControllerAt(0);
			this.m_icon = <fairygui.GImage><any>(this.getChildAt(0));
			this.m_title = <fairygui.GTextField><any>(this.getChildAt(1));
		}
	}
}