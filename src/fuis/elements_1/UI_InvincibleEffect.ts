/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.elements_1 {

	export class UI_InvincibleEffect extends fairygui.GComponent {

		public m_img:fairygui.GImage;
		public m_img2:fairygui.GImage;

		public static URL:string = "ui://u4vu42kz787g5";

		public static createInstance():UI_InvincibleEffect {
			return <UI_InvincibleEffect><any>(fairygui.UIPackage.createObject("elements_1","InvincibleEffect"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_img = <fairygui.GImage><any>(this.getChildAt(0));
			this.m_img2 = <fairygui.GImage><any>(this.getChildAt(1));
		}
	}
}