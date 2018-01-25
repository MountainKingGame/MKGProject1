/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.test_1 {

	export class UI_TestComp1 extends fairygui.GComponent {

		public m_n0:fairygui.GComponent;
		public m_t0:fairygui.Transition;

		public static URL:string = "ui://hz9k4363eycn0";

		public static createInstance():UI_TestComp1 {
			return <UI_TestComp1><any>(fairygui.UIPackage.createObject("test_1","TestComp1"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n0 = <fairygui.GComponent><any>(this.getChildAt(0));
			this.m_t0 = this.getTransitionAt(0);
		}
	}
}