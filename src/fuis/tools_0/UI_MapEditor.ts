/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.tools_0 {

	export class UI_MapEditor extends fairygui.GComponent {

		public m_mapArea:fairygui.GComponent;
		public m_menuBg:fairygui.GGraph;
		public m_txtMapId:fairygui.GLabel;
		public m_txtCol:fairygui.GLabel;
		public m_x:fairygui.GLabel;
		public m_txtRow:fairygui.GLabel;
		public m_btnSave:fairygui.GButton;
		public m_btnOpen:fairygui.GButton;
		public m_btnSetSize:fairygui.GButton;
		public m_n18:fairygui.GLabel;
		public m_list_cell:fairygui.GList;
		public m_txtPositionSid:fairygui.GLabel;
		public m_btnPostionSelected:fairygui.GButton;
		public m_btnPostionPlayer:fairygui.GButton;
		public m_btnPostionHome:fairygui.GButton;
		public m_btnPostionEnemy:fairygui.GButton;
		public m_btnPostionBoss:fairygui.GButton;
		public m_btnPostionSize:fairygui.GButton;
		public m_menuTopBar:fairygui.GGraph;
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
			this.m_txtMapId = <fairygui.GLabel><any>(this.getChildAt(2));
			this.m_txtCol = <fairygui.GLabel><any>(this.getChildAt(3));
			this.m_x = <fairygui.GLabel><any>(this.getChildAt(4));
			this.m_txtRow = <fairygui.GLabel><any>(this.getChildAt(5));
			this.m_btnSave = <fairygui.GButton><any>(this.getChildAt(6));
			this.m_btnOpen = <fairygui.GButton><any>(this.getChildAt(7));
			this.m_btnSetSize = <fairygui.GButton><any>(this.getChildAt(8));
			this.m_n18 = <fairygui.GLabel><any>(this.getChildAt(9));
			this.m_list_cell = <fairygui.GList><any>(this.getChildAt(10));
			this.m_txtPositionSid = <fairygui.GLabel><any>(this.getChildAt(11));
			this.m_btnPostionSelected = <fairygui.GButton><any>(this.getChildAt(12));
			this.m_btnPostionPlayer = <fairygui.GButton><any>(this.getChildAt(13));
			this.m_btnPostionHome = <fairygui.GButton><any>(this.getChildAt(14));
			this.m_btnPostionEnemy = <fairygui.GButton><any>(this.getChildAt(15));
			this.m_btnPostionBoss = <fairygui.GButton><any>(this.getChildAt(16));
			this.m_btnPostionSize = <fairygui.GButton><any>(this.getChildAt(17));
			this.m_menuTopBar = <fairygui.GGraph><any>(this.getChildAt(18));
			this.m_groupMenu = <fairygui.GGroup><any>(this.getChildAt(19));
		}
	}
}