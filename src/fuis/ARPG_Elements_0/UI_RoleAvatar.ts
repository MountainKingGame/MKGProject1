/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.ARPG_Elements_0 {

	export class UI_RoleAvatar extends fairygui.GComponent {

		public m_color:fairygui.Controller;
		public m_n0:fairygui.GGraph;
		public m_n1:fairygui.GGraph;

		public static URL:string = "ui://cl98qbvqq06t1";

		public static createInstance():UI_RoleAvatar {
			return <UI_RoleAvatar><any>(fairygui.UIPackage.createObject("ARPG_Elements_0","RoleAvatar"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_color = this.getControllerAt(0);
			this.m_n0 = <fairygui.GGraph><any>(this.getChildAt(0));
			this.m_n1 = <fairygui.GGraph><any>(this.getChildAt(1));
		}
	}
}