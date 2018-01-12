class BattleCtrl extends CtrlBase {
	public onFrame:BattleCtrlPartialOnFrame = new BattleCtrlPartialOnFrame(this);
	/**
	 * battle model
	 */
	public get model(): BattleModel {
		return this.proxy.model;
	}
	public proxy: BattleProxy;

	public joystick:JoystickCtrl;

	public ui:fuis.battles_1.UI_Battle;
	constructor(view:fuis.battles_1.UI_Battle){
		super(view);
		this.ui = view;
	}
	public dispose():void{
		if(this.ui!=null){
			this.ui.dispose();
			this.ui = null;
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
		setInterval(() => this.onFrame.onFrame_model(),BattleConfig.si.modelFrameMs);
		setInterval(() => this.onFrame.onFrame_view(),CtrlConfig.si.viewFrameMs);
		//
		this.onFrame.AddTank();
	}
	initUI(){
		this.ui
		this.facade.ctrlMgr.addCtrl(CtrlId.Joysick,this.joystick=new JoystickCtrl(this.ui.m_joysick as fuis.joysticks_1.UI_JoystickMain));
	}

}