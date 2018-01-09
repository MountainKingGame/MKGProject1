var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CtrlMgr = (function () {
    function CtrlMgr() {
        // public sceneLayer:fairygui.GComponent; 
        this.ctrlCache = {};
    }
    CtrlMgr.prototype.addCtrl = function (id, ctrl) {
        if (this.ctrlCache[id.toFixed()] != undefined) {
            console.log("[fatal]", "ctrlBase(id=" + id + ") is exist!");
            return;
        }
        this.ctrlCache[id.toFixed()] = ctrl;
        if (ctrl.z_view != null) {
            this.rootLayer.addChild(ctrl.z_view);
        }
        ctrl.facade = this.facade;
        switch (id) {
            case CtrlId.Battle:
                this.facade.battle = ctrl;
                break;
        }
        ctrl.init();
        return ctrl;
    };
    CtrlMgr.prototype.getCtrl = function (id) {
        if (this.ctrlCache[id.toFixed()] != undefined) {
            return this.ctrlCache[id];
        }
        else {
            return null;
        }
    };
    return CtrlMgr;
}());
__reflect(CtrlMgr.prototype, "CtrlMgr");
//# sourceMappingURL=CtrlMgr.js.map