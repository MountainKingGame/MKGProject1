/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.tools_0 {

	export class UI_MapCell4 extends fairygui.GComponent {

		public m_n0:fairygui.GComponent;
		public m_n1:fairygui.GComponent;
		public m_n2:fairygui.GComponent;
		public m_n3:fairygui.GComponent;

		public static URL:string = "ui://i6vaqd5aysfl2";

		public static createInstance():UI_MapCell4 {
			return <UI_MapCell4><any>(fairygui.UIPackage.createObject("tools_0","MapCell4"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n0 = <fairygui.GComponent><any>(this.getChildAt(0));
			this.m_n1 = <fairygui.GComponent><any>(this.getChildAt(1));
			this.m_n2 = <fairygui.GComponent><any>(this.getChildAt(2));
			this.m_n3 = <fairygui.GComponent><any>(this.getChildAt(3));
		}
	}
}