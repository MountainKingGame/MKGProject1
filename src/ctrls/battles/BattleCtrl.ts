class BattleCtrl extends CtrlBase {
	public partialOnFrame:BattleCtrlPartialOnFrame = new BattleCtrlPartialOnFrame(this);
	/**
	 * battle model
	 */
	public get model(): BattleModel {
		return this.proxy.model;
	}
	public proxy: BattleProxy;

	public joystick:JoystickCtrl;

	public view:fuis.battles_1.UI_Battle;
	constructor(view:fuis.battles_1.UI_Battle){
		super(view);
		this.view = view;
	}
	public dispose():void{
		if(this.view!=null){
			this.view.dispose();
			this.view = null;
		}
		super.dispose();
	}
	public init() {
		super.init();
		//
		this.proxy = new BattleProxy();
		this.proxy.facade = this.facade;
		this.proxy.init();
		//
		this.initUI();
		setInterval(() => this.partialOnFrame.onFrame_model(),BattleConst.inst.modelFrameMs);
		setInterval(() => this.partialOnFrame.onFrame_view(),GameConst.inst.viewFrameMs);
		//
		this.partialOnFrame.AddTank();
	}
	initUI(){
		this.facade.ctrlMgr.addCtrl(CtrlId.Joysick,this.joystick=new JoystickCtrl(this.view.m_joysick as fuis.joysticks_1.UI_JoystickMain));
	}

}