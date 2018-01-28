/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.elements_0 {

	export class UI_Label1 extends fairygui.GLabel {

		public m_title:fairygui.GTextInput;

		public static URL:string = "ui://ybsps8tfysfl16";

		public static createInstance():UI_Label1 {
			return <UI_Label1><any>(fairygui.UIPackage.createObject("elements_0","Label1"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_title = <fairygui.GTextInput><any>(this.getChildAt(0));
		}
	}
}