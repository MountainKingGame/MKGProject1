/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.battles {

	export class UI_Tank extends fairygui.GComponent {

		public m_icon:fairygui.GLoader;

		public static URL:string = "ui://ybsps8tfu9bo3";

		public static createInstance():UI_Tank {
			return <UI_Tank><any>(fairygui.UIPackage.createObject("battles","Tank"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_icon = <fairygui.GLoader><any>(this.getChildAt(0));
		}
	}
}