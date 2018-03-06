/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.Package1 {

	export class UI_MediaPlayer extends fairygui.GComponent {

		public m_listSentense:fairygui.GList;
		public m_btnNext:UI_ArrowButton;
		public m_btnPrev:UI_ArrowButton;
		public m_txtCurrI:fairygui.GTextField;
		public m_txtCurrTime:fairygui.GTextField;
		public m_txtLoop:fairygui.GTextField;
		public m_btnLoopAdd:UI_ArrowButton;
		public m_btnLoopSub:UI_ArrowButton;
		public m_btnShowCN:UI_Button1;
		public m_btnShowEN:UI_Button1;
		public m_txtLog:fairygui.GTextField;

		public static URL:string = "ui://zsfj90l3rhcz0";

		public static createInstance():UI_MediaPlayer {
			return <UI_MediaPlayer><any>(fairygui.UIPackage.createObject("Package1","MediaPlayer"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_listSentense = <fairygui.GList><any>(this.getChildAt(0));
			this.m_btnNext = <UI_ArrowButton><any>(this.getChildAt(1));
			this.m_btnPrev = <UI_ArrowButton><any>(this.getChildAt(2));
			this.m_txtCurrI = <fairygui.GTextField><any>(this.getChildAt(3));
			this.m_txtCurrTime = <fairygui.GTextField><any>(this.getChildAt(4));
			this.m_txtLoop = <fairygui.GTextField><any>(this.getChildAt(5));
			this.m_btnLoopAdd = <UI_ArrowButton><any>(this.getChildAt(6));
			this.m_btnLoopSub = <UI_ArrowButton><any>(this.getChildAt(7));
			this.m_btnShowCN = <UI_Button1><any>(this.getChildAt(8));
			this.m_btnShowEN = <UI_Button1><any>(this.getChildAt(9));
			this.m_txtLog = <fairygui.GTextField><any>(this.getChildAt(10));
		}
	}
}