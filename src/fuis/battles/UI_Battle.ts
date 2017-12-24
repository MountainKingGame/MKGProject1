/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.battles {

	export class UI_Battle extends fairygui.GComponent {

		public m_bg:fairygui.GGraph;
		public m_contentLayer:UI_ContentLayer;
		public m_joysick:fairygui.GComponent;

		public static URL:string = "ui://ybsps8tfqitl0";

		public static createInstance():UI_Battle {
			return <UI_Battle><any>(fairygui.UIPackage.createObject("battles","Battle"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_bg = <fairygui.GGraph><any>(this.getChildAt(0));
			this.m_contentLayer = <UI_ContentLayer><any>(this.getChildAt(1));
			this.m_joysick = <fairygui.GComponent><any>(this.getChildAt(2));
		}
	}
}