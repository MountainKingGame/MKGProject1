/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.catchFishes {

	export class UI_BulletA extends fairygui.GComponent {

		public m_n0:fairygui.GImage;

		public static URL:string = "ui://x2dkl1uftm116";

		public static createInstance():UI_BulletA {
			return <UI_BulletA><any>(fairygui.UIPackage.createObject("catchFishes","BulletA"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n0 = <fairygui.GImage><any>(this.getChildAt(0));
		}
	}
}