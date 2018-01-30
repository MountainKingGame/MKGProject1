class CtrlMgr {
    public static si:CtrlMgr;
    public rootLayer: fairygui.GRoot;
    /**key:ctrlId  any */
    private regCtrlDic:{[key: number]: any } = {};
    public regCtrl(id: CtrlId, ctrlType: any,uiType:any, fullScreen:boolean=false) {
        this.regCtrlDic[id] = [ctrlType,uiType,fullScreen];
    }
    // public sceneLayer:fairygui.GComponent; 
    private ctrlCache: { [key: number]: ICtrlBase } = {};
    public addCtrl(id: CtrlId, ctrl: ICtrlBase) {
        if (this.ctrlCache[id] != undefined) {
            console.log("[fatal]", `ctrlBase(id=${id}) is exist!`);
            return null;
        }
        this.ctrlCache[id] = ctrl;
        if (ctrl.getUIAsGComponent() != null) {
            this.rootLayer.addChild(ctrl.getUIAsGComponent());
        }
        ctrl.ctrlId = id;
        ctrl.init();
    }
    public openCtrl(id: CtrlId): ICtrlBase {
        let types:[any,any,boolean] = this.regCtrlDic[id];
        let ctrl:ICtrlBase = new types[0](types[1]["createInstance"]());
        if(types[2]){//必须在init前设置好
            ctrl.ui.setSize(CtrlFacade.si.stage.stageWidth, CtrlFacade.si.stage.stageHeight);
        }
        this.addCtrl(id,ctrl);
        ctrl.__open();
        return ctrl;
    }
    public getCtrl<T extends ICtrlBase>(id: CtrlId) {
        if (this.ctrlCache[id] != undefined) {
            return this.ctrlCache[id] as T;
        } else {
            return null;
        }
    }
    public closeCtrl(id: CtrlId):ICtrlBase {
        let ctrl: ICtrlBase = this.ctrlCache[id];
        if (ctrl != undefined) {
            delete this.ctrlCache[id];
            ctrl.__close();
            //TODO: check if need to dispose
            ctrl.dispose();
        }
        return ctrl;
    }
}