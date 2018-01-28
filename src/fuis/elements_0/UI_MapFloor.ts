/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.elements_0 {

	export class UI_MapFloor extends fairygui.GComponent {

		public m_img:fairygui.GLoader;

		public static URL:string = "ui://ybsps8tfced511";

		public static createInstance():UI_MapFloor {
			return <UI_MapFloor><any>(fairygui.UIPackage.createObject("elements_0","MapFloor"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_img = <fairygui.GLoader><any>(this.getChildAt(0));
		}
	}
}