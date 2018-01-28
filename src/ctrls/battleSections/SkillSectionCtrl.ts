class SkillSectionCtrl extends CtrlBase<fuis.joysticks_1.UI_SkillSection>{
    proxy:FightProxy;
    public init(){
        this.proxy = CtrlFacade.si.ctrlMgr.getCtrl<FightCtrl>(CtrlId.Fight).proxy;
        //
        this.ui.m_btn0.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBtn0_down,this);
        this.ui.m_btn0.addEventListener(egret.TouchEvent.TOUCH_END,this.onBtn0_up,this);
        this.ui.m_btn0.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onBtn0_up,this);
        //
        this.ui.m_btn1.addClickListener(this.onBtn1,this);
        this.ui.m_btn2.addClickListener(this.onBtn2,this);
        this.ui.m_btn3.addClickListener(this.onBtn3,this);
    }
    public dispose(){
        this.proxy = null;
        super.dispose();
    }
    onBtn0_down(...args): any {
        // console.log("[info]","onBtn0_down",args);
        this.proxy.onSkillTrigger(1);
    }
    onBtn0_up(...args): any {
        // console.log("[info]","onBtn0_up",args);
        this.proxy.onSkillUntrigger(1);
    }
    onBtn1(...args): any {
        console.log("[info]2",args);
    }
    onBtn2(...args): any {
        console.log("[info]3",args);
    }
    onBtn3(...args): any {
        console.log("[info]3",args);
    }
}