/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.elements_0 {

	export class UI_FirstPage extends fairygui.GComponent {

		public m_btnFight:UI_Button1;
		public m_btnTool:UI_Button1;

		public static URL:string = "ui://ybsps8tfysfl17";

		public static createInstance():UI_FirstPage {
			return <UI_FirstPage><any>(fairygui.UIPackage.createObject("elements_0","FirstPage"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_btnFight = <UI_Button1><any>(this.getChildAt(0));
			this.m_btnTool = <UI_Button1><any>(this.getChildAt(1));
		}
	}
}