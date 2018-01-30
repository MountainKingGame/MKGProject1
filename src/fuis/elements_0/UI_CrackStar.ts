/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.elements_0 {

	export class UI_CrackStar extends fairygui.GComponent {

		public m_lv:fairygui.Controller;
		public m_imgCrack:fairygui.GLoader;

		public static URL:string = "ui://ybsps8tfxk2t1j";

		public static createInstance():UI_CrackStar {
			return <UI_CrackStar><any>(fairygui.UIPackage.createObject("elements_0","CrackStar"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_lv = this.getControllerAt(0);
			this.m_imgCrack = <fairygui.GLoader><any>(this.getChildAt(0));
		}
	}
}