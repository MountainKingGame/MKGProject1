/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.battles_1 {

	export class UI_MapCell extends fairygui.GComponent {

		public m_kind:fairygui.Controller;
		public m_img:fairygui.GLoader;
		public m_crack:UI_Crack;

		public static URL:string = "ui://ybsps8tfu9boc";

		public static createInstance():UI_MapCell {
			return <UI_MapCell><any>(fairygui.UIPackage.createObject("battles_1","MapCell"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_kind = this.getControllerAt(0);
			this.m_img = <fairygui.GLoader><any>(this.getChildAt(0));
			this.m_crack = <UI_Crack><any>(this.getChildAt(1));
		}
	}
}