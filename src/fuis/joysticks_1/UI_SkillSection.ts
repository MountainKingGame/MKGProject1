/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.joysticks_1 {

	export class UI_SkillSection extends fairygui.GComponent {

		public m_btn0:UI_Button1;
		public m_btn1:UI_Button1;
		public m_btn2:UI_Button1;
		public m_btn3:UI_Button1;

		public static URL:string = "ui://rbw1tvvvhrji1c";

		public static createInstance():UI_SkillSection {
			return <UI_SkillSection><any>(fairygui.UIPackage.createObject("joysticks_1","SkillSection"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_btn0 = <UI_Button1><any>(this.getChildAt(0));
			this.m_btn1 = <UI_Button1><any>(this.getChildAt(1));
			this.m_btn2 = <UI_Button1><any>(this.getChildAt(2));
			this.m_btn3 = <UI_Button1><any>(this.getChildAt(3));
		}
	}
}