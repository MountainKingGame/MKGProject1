/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.Package1 {

	export class UI_SentenseItem extends fairygui.GComponent {

		public m_bg:fairygui.GImage;
		public m_txtTime:fairygui.GTextField;
		public m_txtContent:fairygui.GTextField;
		public m_txtLineNumber:fairygui.GTextField;

		public static URL:string = "ui://zsfj90l3rhcz5";

		public static createInstance():UI_SentenseItem {
			return <UI_SentenseItem><any>(fairygui.UIPackage.createObject("Package1","SentenseItem"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_bg = <fairygui.GImage><any>(this.getChildAt(0));
			this.m_txtTime = <fairygui.GTextField><any>(this.getChildAt(1));
			this.m_txtContent = <fairygui.GTextField><any>(this.getChildAt(2));
			this.m_txtLineNumber = <fairygui.GTextField><any>(this.getChildAt(3));
		}
	}
}