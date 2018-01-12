class CtrlBase implements IDispose {
	public facade:CtrlFacade;
	public ctrlId:CtrlId;
	public z_ui:GComponent;
	public constructor(ui:GComponent) {
		this.z_ui = ui;
	}
	public init(){
	}
	public open(){
	}
	public close(){
	}
	public dispose():void{
		if(this.z_ui!=null){
			this.z_ui.dispose();
			this.z_ui = null;
		}
		this.facade = null;
	}
}