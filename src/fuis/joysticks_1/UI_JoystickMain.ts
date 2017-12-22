/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.joysticks_1 {

	export class UI_JoystickMain extends fairygui.GComponent {

		public joystick_dir:fairygui.GImage;
		public joystick_center:fairygui.GImage;
		public joystick:UI_circle;
		public joystick_touch:fairygui.GGraph;
		public n9:fairygui.GTextField;

		public static URL:string = "ui://rbw1tvvviitt1";

		public static createInstance():UI_JoystickMain {
			return <UI_JoystickMain><any>(fairygui.UIPackage.createObject("joysticks_1","JoystickMain"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.joystick_dir = <fairygui.GImage><any>(this.getChildAt(0));
			this.joystick_center = <fairygui.GImage><any>(this.getChildAt(1));
			this.joystick = <UI_circle><any>(this.getChildAt(2));
			this.joystick_touch = <fairygui.GGraph><any>(this.getChildAt(3));
			this.n9 = <fairygui.GTextField><any>(this.getChildAt(4));
		}
	}
}