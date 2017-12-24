class JoystickCtrl extends CtrlBase{
    private module: JoystickModule;
    private txtLog: fairygui.GTextField;

    public view:fuis.joysticks.UI_JoystickMain;
    constructor(view:fuis.joysticks.UI_JoystickMain){
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

    public init():void{
        super.init();

        fairygui.GRoot.inst.addChild(this.view);

        this.txtLog = this.view.getChild("n9").asTextField;

        this.module = new JoystickModule(this.view);
        // this.module.addEventListener(JoystickModule.JoystickMoving,this.onJoystickMoving,this);
        // this.module.addEventListener(JoystickModule.JoystickUp,this.onJoystickUp,this);
        this.module.on(JoystickModule.JoystickMoving,this,this.onJoystickMoving);
        this.module.on(JoystickModule.JoystickUp,this,this.onJoystickUp);
        //
        // this.txtLog.visible = false;
        this.view.m_joystick_dir.visible=false;
    }

    private onJoystickMoving(val:number): void {
        // this.txtLog.text = "" + evt.data;
        val = MathUtil.repeatDegree(val);
        val = Math.round(val/90)+1;
        if(val>=5){
            val = 1;
        }
        this.view.m_joystick_dir.visible=true;
        this.view.m_joystick_dir.rotation = (val-1)*90;
        this.view.m_joystick_dir.setXY(this.view.m_joystick_center.x,this.view.m_joystick_center.y);
        let dir:Direction4 = <Direction4>val;
        // this.txtLog.text = "" + evt.data + " dir:"+dir.toString();
    }

    private onJoystickUp(): void {
        this.txtLog.text = "";
        this.view.m_joystick_dir.visible=false;
    }
}