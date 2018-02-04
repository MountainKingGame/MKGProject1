/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.tools_0 {

	export class UI_MapEditor extends fairygui.GComponent {

		public m_mapArea:fairygui.GComponent;
		public m_menu:UI_MapEditorMenu;

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
			this.m_menu = <UI_MapEditorMenu><any>(this.getChildAt(1));
		}
	}
}