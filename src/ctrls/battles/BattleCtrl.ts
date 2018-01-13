class BattleCtrl extends CtrlBase {
	public onFrame: BattleCtrlPartialOnFrame = new BattleCtrlPartialOnFrame(this);
	/**
	 * battle model
	 */
	public get model(): BattleModel {
		return this.proxy.model;
	}
	public proxy: BattleProxy;

	public joystick: JoystickCtrl;

	public ui: fuis.battles_1.UI_Battle;
	public tanks: TankCtrl[] = [];
	constructor(view: fuis.battles_1.UI_Battle) {
		super(view);
		this.ui = view;
	}
	public dispose(): void {
		if (this.ui != null) {
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
		this.initEvent();
		//
		setInterval(() => this.onFrame.onFrame_model(), BattleConfig.si.modelFrameMs);
		setInterval(() => this.onFrame.onFrame_view(), CtrlConfig.si.viewFrameMs);
		//-test
		this.AddTank();
	}
	initUI() {
		this.ui
		this.facade.ctrlMgr.addCtrl(CtrlId.Joysick, this.joystick = new JoystickCtrl(this.ui.m_joysick as fuis.joysticks_1.UI_JoystickMain));
	}
	initEvent() {
		MsgMgr.si.add(JoystickCtrl.JoystickMoving, this.OnInputMove, this);
	}
	currInputMoveDir: Direction4;
	OnInputMove(dir: Direction4) {
		console.log("[info]",dir);
		if (this.currInputMoveDir != dir) {
			this.currInputMoveDir = dir;
			//TODO:
		}
	}

	public AddTank() {
		let tank: TankCtrl = new TankCtrl();
		this.tanks.push(tank);
		this.ui.addChild(tank.ui);
	}

}