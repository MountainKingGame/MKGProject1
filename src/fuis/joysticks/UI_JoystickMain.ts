/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.joysticks {

	export class UI_JoystickMain extends fairygui.GComponent {

		public m_joystick_dir:fairygui.GImage;
		public m_joystick_center:fairygui.GImage;
		public m_joystick:UI_circle;
		public m_joystick_touch:fairygui.GGraph;
		public m_n9:fairygui.GTextField;

		public static URL:string = "ui://rbw1tvvviitt1";

		public static createInstance():UI_JoystickMain {
			return <UI_JoystickMain><any>(fairygui.UIPackage.createObject("joysticks","JoystickMain"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_joystick_dir = <fairygui.GImage><any>(this.getChildAt(0));
			this.m_joystick_center = <fairygui.GImage><any>(this.getChildAt(1));
			this.m_joystick = <UI_circle><any>(this.getChildAt(2));
			this.m_joystick_touch = <fairygui.GGraph><any>(this.getChildAt(3));
			this.m_n9 = <fairygui.GTextField><any>(this.getChildAt(4));
		}
	}
}