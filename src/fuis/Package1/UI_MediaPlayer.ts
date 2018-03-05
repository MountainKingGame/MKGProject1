/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.Package1 {

	export class UI_MediaPlayer extends fairygui.GComponent {

		public m_btnNext:UI_ArrowButton;
		public m_btnPrev:UI_ArrowButton;
		public m_txtCurr:fairygui.GTextField;
		public m_listSentense:fairygui.GList;

		public static URL:string = "ui://zsfj90l3rhcz0";

		public static createInstance():UI_MediaPlayer {
			return <UI_MediaPlayer><any>(fairygui.UIPackage.createObject("Package1","MediaPlayer"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_btnNext = <UI_ArrowButton><any>(this.getChildAt(0));
			this.m_btnPrev = <UI_ArrowButton><any>(this.getChildAt(1));
			this.m_txtCurr = <fairygui.GTextField><any>(this.getChildAt(2));
			this.m_listSentense = <fairygui.GList><any>(this.getChildAt(3));
		}
	}
}