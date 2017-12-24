/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.battles {

	export class UI_MapCell extends fairygui.GComponent {

		public m_icon:fairygui.GLoader;

		public static URL:string = "ui://ybsps8tfu9boc";

		public static createInstance():UI_MapCell {
			return <UI_MapCell><any>(fairygui.UIPackage.createObject("battles","MapCell"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_icon = <fairygui.GLoader><any>(this.getChildAt(0));
		}
	}
}