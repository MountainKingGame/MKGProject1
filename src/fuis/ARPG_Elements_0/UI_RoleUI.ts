/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.ARPG_Elements_0 {

	export class UI_RoleUI extends fairygui.GComponent {

		public m_avatar:UI_RoleAvatar;
		public m_txt0:fairygui.GTextField;
		public m_txt1:fairygui.GTextField;
		public m_txt2:fairygui.GTextField;

		public static URL:string = "ui://cl98qbvqq06t0";

		public static createInstance():UI_RoleUI {
			return <UI_RoleUI><any>(fairygui.UIPackage.createObject("ARPG_Elements_0","RoleUI"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_avatar = <UI_RoleAvatar><any>(this.getChildAt(0));
			this.m_txt0 = <fairygui.GTextField><any>(this.getChildAt(1));
			this.m_txt1 = <fairygui.GTextField><any>(this.getChildAt(2));
			this.m_txt2 = <fairygui.GTextField><any>(this.getChildAt(3));
		}
	}
}