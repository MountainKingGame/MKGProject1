class BattleCtrl extends CtrlBase<fuis.battles_1.UI_Battle> {
	public partialTick: BattleCtrlPartialTick = new BattleCtrlPartialTick(this);
	/**
	 * battle model
	 */
	public proxy: BattleProxy;
	public model:models.battles.BattleModel;

	public joystick: JoystickCtrl;

	/**all element in here */
	elementLayer:fairygui.GComponent = new fairygui.GComponent;
	tankLayer:fairygui.GComponent = new fairygui.GComponent;
	bulletLayer:fairygui.GComponent = new fairygui.GComponent;
	mapLayer:fairygui.GComponent = new fairygui.GComponent;

	public tanks: TankCtrl[] = [];
	public bulletMap: {[key:number]:BulletCtrl} = {};
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
		this.initMap();
		this.addTank(this.proxy.myTank);//TODO:
		//
		this.partialTick.init();
	}
	initUI() {
		this.facade.ctrlMgr.addCtrl(CtrlId.Joysick, this.joystick = new JoystickCtrl(this.ui.m_joysick as fuis.joysticks_1.UI_JoystickComp));
		this.facade.ctrlMgr.addCtrl(CtrlId.Battle_SkillSection, new SkillSectionCtrl(this.ui.m_skillComp as fuis.joysticks_1.UI_SkillSection));
		this.ui.addChildAt(this.elementLayer,0);
		this.elementLayer.addChild(this.mapLayer);
		this.elementLayer.addChild(this.tankLayer);
		this.elementLayer.addChild(this.bulletLayer);
		this.ui.m_touchLayer.alpha = 0;
	}
	initEvent() {
		this.ui.m_touchLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
	}
	// touchId:number = -1;
	private onTouchDown(evt: egret.TouchEvent) {
        // if (this.touchId == -1)//First touch
        // {
			// this.touchId = evt.touchPointID;
		// }
		//---test scale
		// var tempPos = new egret.Point;
		// this.elementLayer.globalToLocal(evt.stageX, evt.stageY, tempPos);
		// FgUtil.scaleAndMoveByXy(this.elementLayer,tempPos.x,tempPos.y,0.1);
	}
	initMap(){
		let stcMapVo:IStcMapVo = this.model.stcMapVo;
		for (let i = 0; i < stcMapVo.cells.length; i++) {
			let cellKind = this.model.stcMapVo.cells[i];
			let grid = CommonHelper.indexToGridH(i,stcMapVo.size.col);
			let cell:fuis.elements_1.UI_MapCell = fuis.elements_1.UI_MapCell.createInstance();
			cell.m_kind.selectedIndex = cellKind;
			cell.setXY(models.battles.BattleUtil.gridToPos(grid.col),models.battles.BattleUtil.gridToPos(grid.row));
			this.mapLayer.addChild(cell);
		}
	}

	public addTank(vo:models.battles.TankVo) {
		let tank:TankCtrl = new TankCtrl();
		tank.vo = vo;
		tank.battle = this;
		tank.init();
		this.tankLayer.addChild(tank.ui);
		this.tanks.push(tank);
	}
	public addBulletById(battleUid:number){
		this.addBullet(this.model.bullets[battleUid]);
	}
	public addBullet(vo:models.battles.BulletVo){
		let bullet:BulletCtrl = new BulletCtrl();
		bullet.vo = vo;
		bullet.battle = this;
		bullet.init();
		this.bulletLayer.addChild(bullet.ui);
		this.bulletMap[vo.uid] = bullet;
	}
}