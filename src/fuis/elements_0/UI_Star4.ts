/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.elements_0 {

	export class UI_Star4 extends fairygui.GComponent {

		public m_img:fairygui.GLoader;
		public m_crack:UI_CrackStar;

		public static URL:string = "ui://ybsps8tfxk2t1f";

		public static createInstance():UI_Star4 {
			return <UI_Star4><any>(fairygui.UIPackage.createObject("elements_0","Star4"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_img = <fairygui.GLoader><any>(this.getChildAt(0));
			this.m_crack = <UI_CrackStar><any>(this.getChildAt(1));
		}
	}
}