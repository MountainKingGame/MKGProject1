interface ICtrlBase extends IDispose{
	ctrlId:CtrlId;
	ui:fairygui.GComponent;
	init();
	__open();
	__close();
	getUIAsGComponent():fairygui.GComponent;
}
class CtrlBase<T extends fairygui.GComponent> implements ICtrlBase  {
	public ctrlId:CtrlId;
	public ui:T;
	public constructor(ui:T) {
		this.ui = ui;
	}
	public init(){
	}
	public __open(){
	}
	public __close(){
	}
	public dispose(){
		if(this.ui!=null){
			this.ui.dispose();
			this.ui = null;
		}
	}
	public getUIAsGComponent():fairygui.GComponent{
		return this.ui;
	}
	public closeThis(){
		CtrlMgr.si.closeCtrl(this.ctrlId);
	}
}