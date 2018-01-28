/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.tools_0 {

	export class UI_MapEditor extends fairygui.GComponent {

		public m_mapArea:fairygui.GComponent;
		public m_menuBg:fairygui.GGraph;
		public m_list_cell:fairygui.GList;
		public m_txtMapId:fairygui.GLabel;
		public m_txtCol:fairygui.GLabel;
		public m_x:fairygui.GLabel;
		public m_txtRow:fairygui.GLabel;
		public m_btnSave:fairygui.GButton;
		public m_btnOpen:fairygui.GButton;
		public m_btnSetSize:fairygui.GButton;
		public m_groupMenu:fairygui.GGroup;

		public static URL:string = "ui://i6vaqd5aysfl0";

		public static createInstance():UI_MapEditor {
			return <UI_MapEditor><any>(fairygui.UIPackage.createObject("tools_0","MapEditor"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_mapArea = <fairygui.GComponent><any>(this.getChildAt(0));
			this.m_menuBg = <fairygui.GGraph><any>(this.getChildAt(1));
			this.m_list_cell = <fairygui.GList><any>(this.getChildAt(2));
			this.m_txtMapId = <fairygui.GLabel><any>(this.getChildAt(3));
			this.m_txtCol = <fairygui.GLabel><any>(this.getChildAt(4));
			this.m_x = <fairygui.GLabel><any>(this.getChildAt(5));
			this.m_txtRow = <fairygui.GLabel><any>(this.getChildAt(6));
			this.m_btnSave = <fairygui.GButton><any>(this.getChildAt(7));
			this.m_btnOpen = <fairygui.GButton><any>(this.getChildAt(8));
			this.m_btnSetSize = <fairygui.GButton><any>(this.getChildAt(9));
			this.m_groupMenu = <fairygui.GGroup><any>(this.getChildAt(10));
		}
	}
}