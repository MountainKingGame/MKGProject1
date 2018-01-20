class CtrlMgr {
    public rootLayer: fairygui.GRoot;
    // public sceneLayer:fairygui.GComponent; 
    private ctrlCache: { [key: number]: ICtrlBase } = {};
    public addCtrl(id: CtrlId, ctrl: ICtrlBase): ICtrlBase {
        if (this.ctrlCache[id.toFixed()] != undefined) {
            console.log("[fatal]", `ctrlBase(id=${id}) is exist!`);
            return null;
        }
        this.ctrlCache[id.toFixed()] = ctrl;
        if (ctrl.getUIAsGComponent() != null) {
            this.rootLayer.addChild(ctrl.getUIAsGComponent());
        }
        ctrl.ctrlId = id;
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