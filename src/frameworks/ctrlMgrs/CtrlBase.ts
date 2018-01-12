class CtrlBase implements IDispose {
	public facade:CtrlFacade;
	public ctrlId:CtrlId;
	public __ui:GComponent;
	public constructor(ui:GComponent) {
		this.__ui = ui;
	}
	public init(){
	}
	public open(){
	}
	public close(){
	}
	public dispose():void{
		if(this.__ui!=null){
			this.__ui.dispose();
			this.__ui = null;
		}
		this.facade = null;
	}
}