/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.elements_0 {

	export class UI_ScaleBar extends fairygui.GComponent {

		public m_btnAdd:fairygui.GButton;
		public m_btnSub:fairygui.GButton;
		public m_btnVal:fairygui.GButton;

		public static URL:string = "ui://ybsps8tfnk1s1k";

		public static createInstance():UI_ScaleBar {
			return <UI_ScaleBar><any>(fairygui.UIPackage.createObject("elements_0","ScaleBar"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_btnAdd = <fairygui.GButton><any>(this.getChildAt(0));
			this.m_btnSub = <fairygui.GButton><any>(this.getChildAt(1));
			this.m_btnVal = <fairygui.GButton><any>(this.getChildAt(2));
		}
	}
}