/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.elements_1 {

	export class UI_Bullet extends fairygui.GComponent {

		public m_color:fairygui.Controller;
		public m_img0:fairygui.GGraph;
		public m_crack:fairygui.GComponent;

		public static URL:string = "ui://u4vu42kzh02b2";

		public static createInstance():UI_Bullet {
			return <UI_Bullet><any>(fairygui.UIPackage.createObject("elements_1","Bullet"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_color = this.getControllerAt(0);
			this.m_img0 = <fairygui.GGraph><any>(this.getChildAt(0));
			this.m_crack = <fairygui.GComponent><any>(this.getChildAt(1));
		}
	}
}