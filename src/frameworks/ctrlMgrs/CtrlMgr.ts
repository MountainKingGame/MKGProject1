class CtrlMgr {
    public facade: CtrlFacade;
    public rootLayer: fairygui.GRoot;
    // public sceneLayer:fairygui.GComponent; 
    private ctrlCache: { [key: number]: CtrlBase } = {};
    public addCtrl(id: CtrlId, ctrl: CtrlBase): CtrlBase {
        if (this.ctrlCache[id.toFixed()] != undefined) {
            console.log("[fatal]", `ctrlBase(id=${id}) is exist!`);
            return;
        }
        this.ctrlCache[id.toFixed()] = ctrl;
        if (ctrl.z_view != null) {
            this.rootLayer.addChild(ctrl.z_view);
        }
        ctrl.facade = this.facade;
        switch (id) {
            case CtrlId.Battle:
                this.facade.battle = ctrl as BattleCtrl;
                break;
        }
        ctrl.init();
        return ctrl;
    }
    public getCtrl(id: CtrlId) {
        if (this.ctrlCache[id.toFixed()] != undefined) {
            return this.ctrlCache[id];
        } else {
            return null;
        }
    }
}