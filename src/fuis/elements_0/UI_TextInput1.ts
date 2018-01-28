/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.elements_0 {

	export class UI_TextInput1 extends fairygui.GLabel {

		public m_bg:fairygui.GGraph;
		public m_title:fairygui.GTextInput;

		public static URL:string = "ui://ybsps8tfysfl15";

		public static createInstance():UI_TextInput1 {
			return <UI_TextInput1><any>(fairygui.UIPackage.createObject("elements_0","TextInput1"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_bg = <fairygui.GGraph><any>(this.getChildAt(0));
			this.m_title = <fairygui.GTextInput><any>(this.getChildAt(1));
		}
	}
}