/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.Package1 {

	export class UI_Scene1 extends fairygui.GComponent {

		public m_n1:fairygui.GGraph;
		public m_n0:fairygui.GGraph;

		public static URL:string = "ui://5valqnxpqvpo0";

		public static createInstance():UI_Scene1 {
			return <UI_Scene1><any>(fairygui.UIPackage.createObject("Package1","Scene1"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n1 = <fairygui.GGraph><any>(this.getChildAt(0));
			this.m_n0 = <fairygui.GGraph><any>(this.getChildAt(1));
		}
	}
}