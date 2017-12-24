/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fuis.catchFishes {

	export class UI_FishA extends fairygui.GComponent {

		public m_n0:fairygui.GMovieClip;
		public m_hit:fairygui.Transition;

		public static URL:string = "ui://x2dkl1uftm115";

		public static createInstance():UI_FishA {
			return <UI_FishA><any>(fairygui.UIPackage.createObject("catchFishes","FishA"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.m_n0 = <fairygui.GMovieClip><any>(this.getChildAt(0));
			this.m_hit = this.getTransitionAt(0);
		}
	}
}