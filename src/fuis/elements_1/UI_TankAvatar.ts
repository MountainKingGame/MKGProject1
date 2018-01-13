/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.elements_1 {

	export class UI_TankAvatar extends fairygui.GComponent {

		public m_color:fairygui.Controller;
		public m_n3:fairygui.GGraph;
		public m_n0:fairygui.GGraph;
		public m_n1:fairygui.GGraph;

		public static URL:string = "ui://u4vu42kzcqc44";

		public static createInstance():UI_TankAvatar {
			return <UI_TankAvatar><any>(fairygui.UIPackage.createObject("elements_1","TankAvatar"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_color = this.getControllerAt(0);
			this.m_n3 = <fairygui.GGraph><any>(this.getChildAt(0));
			this.m_n0 = <fairygui.GGraph><any>(this.getChildAt(1));
			this.m_n1 = <fairygui.GGraph><any>(this.getChildAt(2));
		}
	}
}