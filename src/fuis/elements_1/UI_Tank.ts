/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.elements_1 {

	export class UI_Tank extends fairygui.GComponent {

		public m_kind:fairygui.Controller;
		public m_color:fairygui.Controller;
		public m_avatar:UI_TankAvatar;
		public m_txt_kind:fairygui.GTextField;

		public static URL:string = "ui://u4vu42kzh02b0";

		public static createInstance():UI_Tank {
			return <UI_Tank><any>(fairygui.UIPackage.createObject("elements_1","Tank"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_kind = this.getControllerAt(0);
			this.m_color = this.getControllerAt(1);
			this.m_avatar = <UI_TankAvatar><any>(this.getChildAt(0));
			this.m_txt_kind = <fairygui.GTextField><any>(this.getChildAt(1));
		}
	}
}