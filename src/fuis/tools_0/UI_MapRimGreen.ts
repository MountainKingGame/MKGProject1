/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.tools_0 {

	export class UI_MapRimGreen extends fairygui.GComponent {

		public m_n0:fairygui.GImage;

		public static URL:string = "ui://i6vaqd5axk2t4";

		public static createInstance():UI_MapRimGreen {
			return <UI_MapRimGreen><any>(fairygui.UIPackage.createObject("tools_0","MapRimGreen"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n0 = <fairygui.GImage><any>(this.getChildAt(0));
		}
	}
}