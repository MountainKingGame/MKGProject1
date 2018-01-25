class BattleCtrl extends CtrlBase<fuis.battles_1.UI_Battle> {
	public ticker: BattleCtrl_Ticker = new BattleCtrl_Ticker(this);
	/**
	 * battle model
	 */
	public proxy: BattleProxy;
	public model: models.battles.BattleModel;

	public joystick: JoystickCtrl;

	/**all element in here */
	eleLayer: fairygui.GComponent = new fairygui.GComponent;
	tankLayer: fairygui.GComponent = new fairygui.GComponent;
	bulletLayer: fairygui.GComponent = new fairygui.GComponent;
	cellLayer: fairygui.GComponent = new fairygui.GComponent;
	coverCellLayer: fairygui.GComponent = new fairygui.GComponent;

	uiWidthHalf: number;
	uiHeightHalf: number;
	public mapSize: Vector2;

	public cellMap: { [key: number]: fuis.battles_1.UI_MapCell } = {};
	public tankMap: { [key: number]: TankCtrl } = {};
	myTank: TankCtrl;
	public bulletMap: { [key: number]: BulletCtrl } = {};
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
		for (const tankUid in this.model.tankMap) {
			const element = this.model.tankMap[tankUid];
			this.addTank(this.model.tankMap[tankUid]);
		}
		this.myTank = this.tankMap[this.proxy.myTank.uid];
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
		this.ui.m_touchLayer.alpha = 0;
	}
	initEvent() {
		this.ui.m_touchLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
		this.ui.m_touchLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.initInputEvent();
	}
	//===input Joystick keyboard mouse
	initInputEvent() {
		MsgMgr.si.add(JoystickCtrl.JoystickChange, this, this.onJoystickChange);
		MsgMgr.si.add(KeyBoardCtrl.KeyDown, this, this.onKeyDown);
		MsgMgr.si.add(KeyBoardCtrl.KeyUp, this, this.onKeyUp);
		MsgMgr.si.add(MouseWheelCtrl.OnChange, this, this.onMouseWheelChange)
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
			FgUtil.scaleAndMoveByXy(this.eleLayer, this.myTank.ui.x, this.myTank.ui.y, delta / 1000);
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
		this.mapSize = this.model.size;
		for (const key in this.model.cellMap) {
			const vo = this.model.cellMap[parseInt(key)];
			// if(vo.sid>0){
			// let cell: fuis.elements_1.UI_MapCell = fuis.elements_1.UI_MapCell.createInstance();
			let cell: fuis.battles_1.UI_MapCell = fuis.battles_1.UI_MapCell.createInstance();
			cell.setXY(vo.x, vo.y);
			cell.m_kind.selectedIndex = vo.sid;
			if (vo.sid == StcCellSid.cover) {
				this.coverCellLayer.addChild(cell);
			} else {
				this.cellLayer.addChild(cell);
			}
			this.cellMap[vo.uid] = cell;
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
	public addTank(vo: models.battles.TankVo) {
		let tank: TankCtrl = new TankCtrl();
		tank.vo = vo;
		tank.battle = this;
		tank.init();
		this.tankLayer.addChild(tank.ui);
		this.tankMap[vo.uid] = tank;
	}
	public addBulletById(battleUid: number) {
		this.addBullet(this.model.bulletMap[battleUid]);
	}
	public addBullet(vo: models.battles.BulletVo) {
		let bullet: BulletCtrl = new BulletCtrl();
		bullet.vo = vo;
		bullet.battle = this;
		bullet.init();
		this.bulletLayer.addChild(bullet.ui);
		this.bulletMap[vo.uid] = bullet;
	}
	public removeBulletByUid(uid: number) {
		let bullet: BulletCtrl = this.bulletMap[uid];
		if (bullet != undefined) {
			delete this.bulletMap[uid];
			if(this.ticker.pausing && DebugConfig.unremoveWhenPausing){
				bullet.ui.alpha = 0.3;
			}else{
				bullet.dispose();
			}
		}
	}
	public removeTankByUid(uid: number) {
		let tank: TankCtrl = this.tankMap[uid];
		if (tank != undefined) {
			delete this.tankMap[uid];
			if(this.ticker.pausing && DebugConfig.unremoveWhenPausing){
				tank.ui.alpha = 0.3;
			}else{
				tank.dispose();
			}
		}
	}
}