class ARPGFacade {
    timer: TimerCtrl;
    config: arpg.Config;

    static si: ARPGFacade;
    stage: egret.Stage;
    root: fairygui.GComponent
    gameView: fairygui.GComponent
    inputView: fairygui.GComponent
    constructor() {
        new arpg.Imports();
        ARPGFacade.si = this;
        new FakeServer();
    }
    init() {
        console.log("[info]", this.stage.frameRate, "<-`this.stage.frameRate`");
        //
        this.config = new arpg.Config();
        this.config.FramePerSecond = 60;//this.stage.frameRate;
        this.config.init();
        //
        fairygui.UIPackage.addPackage("ARPG_Elements_0");
        fuis.ARPG_Elements_0.ARPG_Elements_0Binder.bindAll();
        //---
        this.root = new fairygui.GComponent();
        fairygui.GRoot.inst.addChild(this.root);
        //---game
        MsgMgr.si.add(CtrlConst.Msg_OnGameTick, this, this.tick);
        //===ui
        var gameView = new GComponent()
        this.gameView = gameView
        this.root.addChild(gameView)
        //--
        var inputView = fuis.ARPG_Elements_0.UI_InputUI.createInstance()
        this.root.addChild(inputView)
        this.inputView = inputView
        inputView.setSize(1000, 1000);
        //-
        this.initEntitas();
        //===other
        this.timer = new TimerCtrl();
        this.timer.msPerFrame = this.config.MsPerFrame;
        this.timer.gapKeyFrame = 5;
        this.timer.init();
        //--test
        this.myRoleLerp.avatar.ui.visible = false;
        this.myRoleReal.avatar.ui.visible = false;
        // this.myRolePretreat.avatar.ui.visible=false;
    }
    /**entitas */
    initEntitas() {
        //--init systems first, for call setPool()
        var systems: entitas.Systems = new entitas.Systems()
            .add(arpg.Pools.pool.createSystem(RoleAvatarSystem))
            .add(arpg.Pools.pool.createSystem(PlayerInputSystem))
            .add(arpg.Pools.pool.createSystem(UnitOrderSystem))
            .add(arpg.Pools.pool.createSystem(MovementSystem))
        this.systems = systems;
        //---init entities
        var role = arpg.Pools.pool.createEntity("roleLerp");
        this.myRoleLerp = role
        var ui = fuis.ARPG_Elements_0.UI_RoleUI.createInstance();
        ui.m_avatar.m_color.setSelectedIndex(0)
        role.addAvatar(ui)
        //-
        var role = arpg.Pools.pool.createEntity("rolePretreat");
        this.myRolePretreat = role
        var ui = fuis.ARPG_Elements_0.UI_RoleUI.createInstance();
        ui.m_avatar.m_color.setSelectedIndex(3)
        role.addAvatar(ui)
        role.addPosition(0, 0)
        role.addForward(0)
        role.addPropLv1(this.config.BaseMoveSpeedPerFrame, 100, 100, 50)
        role.addComponent(CoreComponentIds.Move, new arpg.MouseComponent())
        role.move.kind = MoveKindTag.None;
        //-roleNet
        var role = arpg.Pools.pool.createEntity("roleReal");
        this.myRoleReal = role
        role.setMe(true)
        var ui = fuis.ARPG_Elements_0.UI_RoleUI.createInstance();
        ui.m_avatar.m_color.setSelectedIndex(2)
        role.addAvatar(ui)
        role.addPosition(0, 0)
        role.addForward(0)
        role.addPropLv1(this.config.BaseMoveSpeedPerFrame, 100, 100, 50)
        role.addComponent(CoreComponentIds.Move, new arpg.MouseComponent())
        role.move.kind = MoveKindTag.None;
        role.addCurrOrder(OrderKind.Idle, false, null)
        //-enemy
        var role = arpg.Pools.pool.createEntity("enemy_0");
        var ui = fuis.ARPG_Elements_0.UI_RoleUI.createInstance();
        ui.m_avatar.m_color.setSelectedIndex(1)
        role.setEnemy(true)
        role.addAvatar(ui)
        role.addPosition(200, 200)
        role.addForward(0)
        role.addPropLv1(this.config.BaseMoveSpeedPerFrame, 100, 100, 50)
        role.addComponent(CoreComponentIds.Move, new arpg.MouseComponent())
        role.move.kind = MoveKindTag.None;
        role.addCurrOrder(OrderKind.Idle, false, null)
        //-friend
        var role = arpg.Pools.pool.createEntity("team_1");
        var ui = fuis.ARPG_Elements_0.UI_RoleUI.createInstance();
        ui.m_avatar.m_color.setSelectedIndex(2)
        role.setMyTeam(true)
        role.addAvatar(ui)
        role.addPosition(400, 400)
        role.addForward(0)
        role.addPropLv1(this.config.BaseMoveSpeedPerFrame, 100, 100, 50)
        role.addComponent(CoreComponentIds.Move, new arpg.MouseComponent())
        role.move.kind = MoveKindTag.None;
        role.addCurrOrder(OrderKind.Idle, false, null)
        //---
        systems.initialize()
    }
    tick() {
        // return;
        this.timer.tick()
        if (this.timer.isFrame) {
            this.systems.execute();
        }
    }

    myRoleLerp: Entity;
    myRolePretreat: Entity;
    myRoleReal: Entity;

    systems: entitas.Systems;

    cmdArr: ICMD[] = [];

}