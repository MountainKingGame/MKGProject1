/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.joysticks_1 {

	export class UI_circle extends fairygui.GButton {

		public button:fairygui.Controller;
		public thumb:fairygui.GImage;

		public static URL:string = "ui://rbw1tvvvq9do18";

		public static createInstance():UI_circle {
			return <UI_circle><any>(fairygui.UIPackage.createObject("joysticks_1","circle"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.button = this.getControllerAt(0);
			this.thumb = <fairygui.GImage><any>(this.getChildAt(0));
		}
	}
}