class JoystickCtrl extends CtrlBase {
    public ui: fuis.joysticks_1.UI_JoystickMain;
    private ctrlInner: JoystickInner;
    constructor(ui: fuis.joysticks_1.UI_JoystickMain) {
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

    public init(): void {
        super.init();
        this.ctrlInner = new JoystickInner(this.ui);
        SDKAdapterFG.GObject_addEventListener(this.ctrlInner, JoystickInner.JoystickMoving, this.onJoystickMoving, this);
        SDKAdapterFG.GObject_addEventListener(this.ctrlInner, JoystickInner.JoystickUp, this.onJoystickUp, this);
        this.ui.m_joystick_dir.visible = false;
        //
        this.ui.m_txt_log.visible = false;
    }

    private onJoystickMoving(evt: egret.Event): void {
        MsgMgr.si.send(Msgs.InputMove,this.ctrlInner.direction);
        if (this.ui.m_txt_log.visible) {
            //dir = evt.data;
            // let dir:Direction4 = <Direction4>val;
            // this.ui.m_txt_log.text = dir.toString() + " dir:" + (<Direction4>dir).toString();
        }
    }

    private onJoystickUp(): void {
        MsgMgr.si.send(Msgs.InputMove,Direction4.None);
        if (this.ui.m_txt_log.visible) {
            this.ui.m_txt_log.text = "";
        }
    }
}