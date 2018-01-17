interface ICtrlBase extends IDispose{
	facade:CtrlFacade;
	ctrlId:CtrlId;
	init();
	open();
	close();
	getUIAsGComponent():fairygui.GComponent;
}
class CtrlBase<T> implements ICtrlBase  {
	public facade:CtrlFacade;
	public ctrlId:CtrlId;
	public ui:T;
	public constructor(ui:T) {
		this.ui = ui;
	}
	public init(){
	}
	public open(){
	}
	public close(){
	}
	public dispose():void{
		if(this.ui!=null){
			(<IDispose><any>this.ui).dispose();
			this.ui = null;
		}
		this.facade = null;
	}
	public getUIAsGComponent():fairygui.GComponent{
		return <fairygui.GComponent><any>this.ui;
	}
}