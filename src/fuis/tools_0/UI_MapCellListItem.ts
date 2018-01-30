/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.tools_0 {

	export class UI_MapCellListItem extends fairygui.GComponent {

		public m_cell1:fairygui.GComponent;

		public static URL:string = "ui://i6vaqd5aysfl1";

		public static createInstance():UI_MapCellListItem {
			return <UI_MapCellListItem><any>(fairygui.UIPackage.createObject("tools_0","MapCellListItem"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_cell1 = <fairygui.GComponent><any>(this.getChildAt(0));
		}
	}
}