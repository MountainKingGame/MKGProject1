/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.elements_0 {

	export class UI_EmptyComp extends fairygui.GComponent {

		public m_n0:fairygui.GGraph;

		public static URL:string = "ui://ybsps8tfysfl12";

		public static createInstance():UI_EmptyComp {
			return <UI_EmptyComp><any>(fairygui.UIPackage.createObject("elements_0","EmptyComp"));
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