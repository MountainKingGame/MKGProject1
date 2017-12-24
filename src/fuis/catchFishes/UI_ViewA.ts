/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.catchFishes {

	export class UI_ViewA extends fairygui.GComponent {

		public m_c1:fairygui.Controller;
		public m_fishA:UI_FishA;
		public m_btnA:UI_ButtonA;
		public m_txtA:fairygui.GTextField;

		public static URL:string = "ui://x2dkl1ufhmf20";

		public static createInstance():UI_ViewA {
			return <UI_ViewA><any>(fairygui.UIPackage.createObject("catchFishes","ViewA"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_c1 = this.getControllerAt(0);
			this.m_fishA = <UI_FishA><any>(this.getChildAt(0));
			this.m_btnA = <UI_ButtonA><any>(this.getChildAt(1));
			this.m_txtA = <fairygui.GTextField><any>(this.getChildAt(2));
		}
	}
}