/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.Package1 {

	export class UI_BtnArrow extends fairygui.GButton {

		public m_button:fairygui.Controller;
		public m_n1:fairygui.GGraph;
		public m_n2:fairygui.GGraph;
		public m_n3:fairygui.GGraph;

		public static URL:string = "ui://zsfj90l3rhcz1";

		public static createInstance():UI_BtnArrow {
			return <UI_BtnArrow><any>(fairygui.UIPackage.createObject("Package1","BtnArrow"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_button = this.getControllerAt(0);
			this.m_n1 = <fairygui.GGraph><any>(this.getChildAt(0));
			this.m_n2 = <fairygui.GGraph><any>(this.getChildAt(1));
			this.m_n3 = <fairygui.GGraph><any>(this.getChildAt(2));
		}
	}
}