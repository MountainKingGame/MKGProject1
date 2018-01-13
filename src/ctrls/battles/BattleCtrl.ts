class BattleCtrl extends CtrlBase {
	public onFrame: BattleCtrlPartialOnFrame = new BattleCtrlPartialOnFrame(this);
	/**
	 * battle model
	 */
	public proxy: BattleProxy;
	public model:models.battles.BattleModel;

	public joystick: JoystickCtrl;

	public ui: fuis.battles_1.UI_Battle;
	tankLayer:fairygui.GComponent = new fairygui.GComponent;
	mapLayer:fairygui.GComponent = new fairygui.GComponent;

	public tanks: TankCtrl[] = [];
	constructor(ui: fuis.battles_1.UI_Battle) {
		super(ui);
		this.ui = ui;
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
		this.model = this.proxy.model;
		//
		this.initUI();
		this.initEvent();
		//
		setInterval(() => this.onFrame.onFrame_model(), models.battles.BattleConfig.si.modelFrameMs);
		setInterval(() => this.onFrame.onFrame_view(), CtrlConfig.si.viewFrameMs);
		//
		this.InitMap();
		this.AddTank(this.proxy.myTank);
	}
	initUI() {
		this.facade.ctrlMgr.addCtrl(CtrlId.Joysick, this.joystick = new JoystickCtrl(this.ui.m_joysick as fuis.joysticks_1.UI_JoystickMain));
		this.ui.m_contentLayer.addChild(this.mapLayer);
		this.ui.m_contentLayer.addChild(this.tankLayer);
	}
	initEvent() {

	}
	InitMap(){
		let stcMapVo:IStcMapVo = this.model.stcMapVo;
		for (let i = 0; i < stcMapVo.cells.length; i++) {
			let cellKind = this.model.stcMapVo.cells[i];
			let grid = CommonHelper.indexToGridH(i,stcMapVo.col);
			let cell:fuis.elements_1.UI_MapCell = fuis.elements_1.UI_MapCell.createInstance();
			cell.m_kind.selectedIndex = cellKind;
			cell.setXY(grid.col*models.battles.BattleConfig.si.cellSize,grid.row*models.battles.BattleConfig.si.cellSize);
			this.mapLayer.addChild(cell);
		}
	}

	public AddTank(vo:models.battles.TankVo) {
		let tank:TankCtrl = new TankCtrl();
		tank.vo = vo;
		this.tanks.push(tank);
		this.ui.m_contentLayer.addChild(tank.ui);
	}

}