class CtrlMgr {
    public facade: CtrlFacade;
    public rootLayer: fairygui.GRoot;
    // public sceneLayer:fairygui.GComponent; 
    private ctrlCache: { [key: number]: ICtrlBase } = {};
    public addCtrl(id: CtrlId, ctrl: ICtrlBase): ICtrlBase {
        if (this.ctrlCache[id.toFixed()] != undefined) {
            console.log("[fatal]", `ctrlBase(id=${id}) is exist!`);
            return;
        }
        this.ctrlCache[id.toFixed()] = ctrl;
        if (ctrl.getUIAsGComponent() != null) {
            this.rootLayer.addChild(ctrl.getUIAsGComponent());
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
    public getCtrl<T>(id: CtrlId) {
        if (this.ctrlCache[id.toFixed()] != undefined) {
            return <T><any>this.ctrlCache[id];
        } else {
            return null;
        }
    }
}