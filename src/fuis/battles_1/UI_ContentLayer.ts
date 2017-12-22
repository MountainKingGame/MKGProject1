/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.battles_1 {

	export class UI_ContentLayer extends fairygui.GComponent {

		public bg:fairygui.GGraph;

		public static URL:string = "ui://ybsps8tfqitl1";

		public static createInstance():UI_ContentLayer {
			return <UI_ContentLayer><any>(fairygui.UIPackage.createObject("battles_1","ContentLayer"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.bg = <fairygui.GGraph><any>(this.getChildAt(0));
		}
	}
}