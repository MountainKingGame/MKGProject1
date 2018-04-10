class ARPGFacade {
    static si: ARPGFacade;
    stage: egret.Stage;
    root: fairygui.GComponent
    inputView: fairygui.GComponent
    constructor() {
        ARPGFacade.si = this;
        new FakeServer();
    }
    init() {
        //
        fairygui.UIPackage.addPackage("ARPG_Elements_0");
        fuis.ARPG_Elements_0.ARPG_Elements_0Binder.bindAll();
        //---
        this.root = new fairygui.GComponent();
        fairygui.GRoot.inst.addChild(this.root);
        //---game
        MsgMgr.si.add(CtrlConst.Msg_OnGameTick, this, this.tick);
        //===ui
        var inputView = fuis.ARPG_Elements_0.UI_InputUI.createInstance()
        this.root.addChild(inputView)
        this.inputView = inputView
        inputView.setSize(1000, 1000);
        inputView.addClickListener(this.onInputClick, this);
        //-
        //===entitas
        //---
        var role = arpg.Pools.pool.createEntity(null);
        this.myRoleReal = role
        role.setRealMove(true)
        var ui = fuis.ARPG_Elements_0.UI_RoleUI.createInstance();
        this.root.addChild(ui)
        ui.m_avatar.m_color.setSelectedIndex(0)
        ui.m_txtName.text = "real"
        role.addAvatar(ui)
        //---
        var role = arpg.Pools.pool.createEntity(null);
        this.myRoleNet = role
        role.setNetMove(true)
        var ui = fuis.ARPG_Elements_0.UI_RoleUI.createInstance();
        this.root.addChild(ui)
        ui.m_avatar.m_color.setSelectedIndex(2)
        ui.m_txtName.text = "net"
        role.addAvatar(ui)
        role.addPosition(0, 0)
        role.addComponent(CoreComponentIds.Move, new arpg.MouseComponent())
        role.move.kind = MoveKindEnum.None;
        role.move.speed = 500 / this.stage.frameRate;
        //---
        var role = arpg.Pools.pool.createEntity(null);
        this.myRolePretreat = role
        role.setPretreatMove(true)
        var ui = fuis.ARPG_Elements_0.UI_RoleUI.createInstance();
        this.root.addChild(ui)
        ui.m_avatar.m_color.setSelectedIndex(3)
        ui.m_txtName.text = "pretreat"
        role.addAvatar(ui)
        role.addPosition(0, 0)
        role.addComponent(CoreComponentIds.Move, new arpg.MouseComponent())
        role.move.kind = MoveKindEnum.None;
        role.move.speed = this.myRoleNet.move.speed;
        //---
        var systems: entitas.Systems = new entitas.Systems()
            .add(arpg.Pools.pool.createSystem(MovementSystem))
            .add(arpg.Pools.pool.createSystem(RoleAvatarSystem))
        this.systems = systems;
        systems.initialize()
        //--test
        // this.myRoleReal.avatar.ui.visible=false;
        // this.myRoleNet.avatar.ui.visible=false;
        // this.myRolePretreat.avatar.ui.visible=false;
    }
    tick() {
        this.currFrame++;
        this.nextFrame = this.currFrame + 1;
        this.systems.execute();
    }

    currFrame = 0
    nextFrame = 1

    myRoleReal: Entity;
    myRoleNet: Entity;
    myRolePretreat: Entity;
    systems: entitas.Systems;
    cmdArr: ICMD[] = [];

    onInputClick(e: egret.TouchEvent): void {
        MsgMgr.si.send(MsgConsts.Pretreat_ + NetConsts.RoleMoveTo, {
            currFrame: this.nextFrame,
            fromX: this.myRolePretreat.position.x, fromY: this.myRolePretreat.position.y,
            toX: e.stageX, toY: e.stageY
        })
        FakeServer.si.onSend(NetConsts.RoleMoveTo, { toX: e.stageX, toY: e.stageY })
        // this.inputView.globalToLocal(e.stageX, e.stageY, this.tempXY);
        // e.stageX, e.stageY
        // console.log("[info]",e.stageX,e.stageY);
        // arpg.Pools.pool.mouse.isTrigger = true;
        // arpg.Pools.pool.mouse.x = e.stageX;
        // arpg.Pools.pool.mouse.y = e.stageY;
        /* var move:arpg.MoveComponent = this.myRole.move;
        move.kind = MoveKindEnum.SpeedAndDistance;
        move.toX = e.stageX;
        move.toY = e.stageY;
        move.startFrame = this.currFrame;
        move.lifeFrame = 0;
        move.totalFrame = Math.ceil(MathUtil.distance(this.myRole.position.x,this.myRole.position.y,move.toX,move.toY)/move.speed); 
        var speedXY:[number,number] = MathUtil.speedXY(this.myRole.position.x,this.myRole.position.y,move.toX,move.toY,move.speed)
        move.speedX = speedXY[0]
        move.speedY = speedXY[1]
        console.log("[debug] move",move.speedX,move.speedY); */
    }
}