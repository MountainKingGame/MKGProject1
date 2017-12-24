/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.battles {

	export class UI_ContentLayer extends fairygui.GComponent {

		public m_bg:fairygui.GGraph;

		public static URL:string = "ui://ybsps8tfqitl1";

		public static createInstance():UI_ContentLayer {
			return <UI_ContentLayer><any>(fairygui.UIPackage.createObject("battles","ContentLayer"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_bg = <fairygui.GGraph><any>(this.getChildAt(0));
		}
	}
}