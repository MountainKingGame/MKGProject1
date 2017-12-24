class CtrlBase implements IDispose {
	public facade:CtrlFacade;
	public CtrlId:CtrlId;
	public z_view:GComponent;
	public constructor(view:GComponent) {
		this.z_view = view;
	}
	public init(){
	}
	public open(){
	}
	public close(){
	}
	public dispose():void{
		if(this.z_view!=null){
			this.z_view.dispose();
			this.z_view = null;
		}
	}
}