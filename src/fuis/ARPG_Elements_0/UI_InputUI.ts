/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.ARPG_Elements_0 {

	export class UI_InputUI extends fairygui.GComponent {

		public m_n0:fairygui.GGraph;

		public static URL:string = "ui://cl98qbvqq06t2";

		public static createInstance():UI_InputUI {
			return <UI_InputUI><any>(fairygui.UIPackage.createObject("ARPG_Elements_0","InputUI"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n0 = <fairygui.GGraph><any>(this.getChildAt(0));
		}
	}
}