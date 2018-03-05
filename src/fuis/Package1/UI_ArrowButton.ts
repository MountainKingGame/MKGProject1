/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.Package1 {

	export class UI_ArrowButton extends fairygui.GButton {

		public m_button:fairygui.Controller;
		public m_n1:fairygui.GImage;

		public static URL:string = "ui://zsfj90l3rhcz2";

		public static createInstance():UI_ArrowButton {
			return <UI_ArrowButton><any>(fairygui.UIPackage.createObject("Package1","ArrowButton"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_button = this.getControllerAt(0);
			this.m_n1 = <fairygui.GImage><any>(this.getChildAt(0));
		}
	}
}