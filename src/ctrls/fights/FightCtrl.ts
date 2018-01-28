class FightCtrl extends CtrlBase<fuis.elements_0.UI_Fight> {
	public ticker: FightCtrl_Ticker = new FightCtrl_Ticker(this);
   //---
	public proxy: FightProxy;
	public model: models.fights.FightModel;
	//---
	public joystick: JoystickCtrl;
	/**all element in here */
	eleLayer: fairygui.GComponent = new fairygui.GComponent;
	//---
	/** */
	cellLayer: fairygui.GComponent = new fairygui.GComponent;
	tankLayer: fairygui.GComponent = new fairygui.GComponent;
	bulletLayer: fairygui.GComponent = new fairygui.GComponent;
	/**在坦克和子弹上面cell层 */
	coverCellLayer: fairygui.GComponent = new fairygui.GComponent;
	topEffLayer:fairygui.GComponent = new fairygui.GComponent();
	//---
	uiWidthHalf: number;
	uiHeightHalf: number;
	public mapSize: Vector2;
	//---
	floor:fairygui.GComponent;
	cellDic: { [key: number]: fuis.elements_0.UI_MapCell } = {};
	tankDic: { [key: number]: TankCtrl } = {};
	myTank: TankCtrl;
	bulletDic: { [key: number]: BulletCtrl } = {};
	//---
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
		this.proxy = new FightProxy();
		this.proxy.init();
		this.model = this.proxy.model;
		//
		this.initUI();
		this.uiWidthHalf = Math.round(this.ui.width / 2);
		this.uiHeightHalf = Math.round(this.ui.height / 2);
		this.initEvent();
		//
		this.initMap();
		//
		for (const tankUid in this.model.tankDic) {
			const element = this.model.tankDic[tankUid];
			this.addTank(this.model.tankDic[tankUid]);
		}
		this.myTank = this.tankDic[this.proxy.myTank.uid];
		//
		this.ticker.init();
	}
	initUI() {
		CtrlFacade.si.ctrlMgr.addCtrl(CtrlId.Joysick, this.joystick = new JoystickCtrl(this.ui.m_joysick as fuis.joysticks_1.UI_JoystickComp));
		CtrlFacade.si.ctrlMgr.addCtrl(CtrlId.Battle_SkillSection, new SkillSectionCtrl(this.ui.m_skillComp as fuis.joysticks_1.UI_SkillSection));
		this.ui.addChildAt(this.eleLayer, this.ui.getChildIndex(this.ui.m_bg) + 1);
		this.eleLayer.addChild(this.cellLayer);
		this.eleLayer.addChild(this.tankLayer);
		this.eleLayer.addChild(this.bulletLayer);
		this.eleLayer.addChild(this.coverCellLayer);
		this.eleLayer.addChild(this.topEffLayer);
		this.ui.m_touchLayer.alpha = 0;
	}
	initEvent() {
		MsgMgr.si.add(FConst.Msg_GamePause,this,this.OnMsg_GamePause);
		MsgMgr.si.add(FConst.MSG_GameResume,this,this.OnMsg_GameResume);
		this.ui.m_touchLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
		this.ui.m_touchLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.initInputEvent();
	}
	OnMsg_GamePause(){
		this.ticker.pausing = true;
	}
	OnMsg_GameResume(){
		this.ticker.pausing = false;
	}
	//===input Joystick keyboard mouse
	initInputEvent() {
		MsgMgr.si.add(JoystickCtrl.Msg_OnChange, this, this.onJoystickChange);
		MsgMgr.si.add(KeyBoardCtrl.KeyDown, this, this.onKeyDown);
		MsgMgr.si.add(KeyBoardCtrl.KeyUp, this, this.onKeyUp);
		MsgMgr.si.add(MouseWheelCtrl.Msg_OnChange, this, this.onMouseWheelChange)
	}
	mouseStageXY: egret.Point = new egret.Point();
	tempPoi: egret.Point = new egret.Point();
	onMouseWheelChange(delta: number) {
		// console.log("[info]",delta,"`delta`");
		//- kind 1
		// this.eleLayer.globalToLocal(this.mouseStageXY.x, this.mouseStageXY.y, this.tempPoi);
		// FgUtil.scaleAndMoveByXy(this.eleLayer, this.tempPoi.x, this.tempPoi.y, delta / 10000);
		//- kind 2
		if (this.myTank) {
			FuiUtil.scaleAndMoveByXy(this.eleLayer, this.myTank.ui.x, this.myTank.ui.y, delta / 1000);
			this.clampMapScale();
		}
	}
	onJoystickChange(dir: Direction4) {
		this.proxy.onMoveDirChange(dir);
	}
	dirKeyCode: number[] = [KeyBoardCtrl.KEY_D, KeyBoardCtrl.KEY_S, KeyBoardCtrl.KEY_A, KeyBoardCtrl.KEY_W];
	onKeyDown(keyCode: number, kbc: KeyBoardCtrl) {
		var dirKeyCodeIndex: number = this.dirKeyCode.indexOf(keyCode);
		if (dirKeyCodeIndex > -1) {
			this.proxy.onMoveDirChange(<Direction4>(dirKeyCodeIndex + 1));
		} else {
			switch (keyCode) {
				case KeyBoardCtrl.KEY_J:
					this.proxy.onSkillTrigger(StcSkillSid.DefaultOne);
					break;
			}
		}
	}
	onKeyUp(keyCode: number, kbc: KeyBoardCtrl) {
		var dirKeyCodeIndex: number = this.dirKeyCode.indexOf(keyCode);
		if (dirKeyCodeIndex > -1) {
			switch (CtrlConfig.si.keyBoardCtrlKind) {
				case 1:
					for (let i = 0; i < this.dirKeyCode.length; i++) {
						keyCode = this.dirKeyCode[i];
						if (KeyBoardCtrl.si.isKeyDown(keyCode)) {
							this.proxy.onMoveDirChange(<Direction4>(this.dirKeyCode.indexOf(keyCode) + 1));
							return;
						}
					}
					this.proxy.onMoveDirChange(Direction4.None);
					break;
				case 2:
					var dir: Direction4 = <Direction4>(dirKeyCodeIndex + 1);
					if (dir == this.proxy.myTank.dir) {
						this.proxy.onMoveDirChange(Direction4.None);
					}
					break;
			}
		} else {
			switch (keyCode) {
				case KeyBoardCtrl.KEY_J:
					this.proxy.onSkillUntrigger(StcSkillSid.DefaultOne);
					break;
				case KeyBoardCtrl.KEY_SPACE_BAR:
					this.ticker.pausing = !this.ticker.pausing;
					break;
			}
		}
	}
	//===
	// touchId:number = -1;
	private onTouchDown(e: egret.TouchEvent) {
		this.mouseStageXY.x = e.stageX,
			this.mouseStageXY.y = e.stageY;
		// if (this.touchId == -1)//First touch
		// {
		// this.touchId = evt.touchPointID;
		// }
	}
	private onTouchMove(e: egret.TouchEvent) {
		this.mouseStageXY.x = e.stageX,
			this.mouseStageXY.y = e.stageY;
	}
	initMap() {
		this.floor = fuis.elements_0.UI_MapFloor.createInstance();
		this.cellLayer.addChild(this.floor);
		this.mapSize = this.model.size;
		this.floor.setSize(this.mapSize.x,this.mapSize.y);
		for (const key in this.model.cellDic) {
			const vo = this.model.cellDic[parseInt(key)];
			// if(vo.sid>0){
			// let cell: fuis.elements_1.UI_MapCell = fuis.elements_1.UI_MapCell.createInstance();
			let cell: fuis.elements_0.UI_MapCell = fuis.elements_0.UI_MapCell.createInstance();
			FightCtrlUtil.initCrack(cell.m_crack as fuis.elements_0.UI_Crack);
			cell.setXY(vo.x, vo.y);
			cell.m_kind.selectedIndex = vo.sid;
			if (vo.sid == StcCellSid.cover) {
				this.coverCellLayer.addChild(cell);
			} else {
				this.cellLayer.addChild(cell);
			}
			this.cellDic[vo.uid] = cell;
			// }
		}
		this.eleLayer.scaleX = this.eleLayer.scaleY = 0.5;
		this.clampMapScale();
	}
	/**地图缩放检查,不能过于小或大 */
	clampMapScale() {
		let scale = Math.min(
			MathUtil.clamp(this.eleLayer.scaleX, this.ui.width / this.mapSize.x, 1),
			MathUtil.clamp(this.eleLayer.scaleY, this.ui.height / this.mapSize.y, 1)
		);
		this.eleLayer.scaleX = scale;
		this.eleLayer.scaleY = scale;
		// this.clampMapXY(this.eleLayer.x,this.eleLayer.y);//Don't need do this, because every tick will do it
	}
	/** 将myTank作为中点 */
	alginByMyTank() {
		if (this.myTank) {
			this.clampMapXY(
				Math.round(this.uiWidthHalf - this.myTank.ui.x * this.eleLayer.scaleX),
				Math.round(this.uiHeightHalf - this.myTank.ui.y * this.eleLayer.scaleY)
			);
		}
	}
	/** 不需要规范出界 */
	// clampMapXY(x:number,y:number){
	// 	this.eleLayer.x = Math.round(x);
	// 	this.eleLayer.y = Math.round(y);
	// }
	/** 规范地图,不要出边界 */
	clampMapXY(x: number, y: number) {
		let w: number = this.mapSize.x * this.eleLayer.scaleX;
		if (this.ui.width == w) {
			x = 0;
		} else if (this.ui.width > w) {
			x = (this.ui.width - w) / 2;
		} else {
			x = MathUtil.clamp(x, this.ui.width - w, 0);
		}
		this.eleLayer.x = Math.round(x);
		//-
		let h: number = this.mapSize.y * this.eleLayer.scaleY;
		if (this.ui.height == h) {
			y = 0;
		} else if (this.ui.height > h) {
			y = (this.ui.height - h) / 2;
		} else {
			y = MathUtil.clamp(y, this.ui.height - h, 0);
		}
		this.eleLayer.y = Math.round(y);
	}
	public addTank(vo: models.fights.TankVo) {
		let tank: TankCtrl = new TankCtrl();
		tank.vo = vo;
		tank.battle = this;
		tank.init();
		this.tankLayer.addChild(tank.ui);
		this.tankDic[vo.uid] = tank;
	}
	public addBulletById(battleUid: number) {
		this.addBullet(this.model.bulletDic[battleUid]);
	}
	public addBullet(vo: models.fights.BulletVo) {
		let bullet: BulletCtrl = new BulletCtrl();
		bullet.vo = vo;
		bullet.battle = this;
		bullet.init();
		this.bulletLayer.addChild(bullet.ui);
		this.bulletDic[vo.uid] = bullet;
	}
	public removeBulletByUid(uid: number) {
		let bullet: BulletCtrl = this.bulletDic[uid];
		if (bullet != undefined) {
			delete this.bulletDic[uid];
			if(this.ticker.pausing && DebugConfig.unremoveWhenPausing){
				bullet.ui.alpha = 0.3;
			}else{
				bullet.dispose();
			}
		}
	}
	public removeTank(tank: TankCtrl) {
		if (tank != undefined) {
			delete this.tankDic[tank.vo.uid];
			if(this.ticker.pausing && DebugConfig.unremoveWhenPausing){
				tank.ui.alpha = 0.3;
			}else{
				tank.dispose();
			}
		}
	}
}