var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CtrlBase = (function () {
    function CtrlBase(view) {
        this.z_view = view;
    }
    CtrlBase.prototype.init = function () {
    };
    CtrlBase.prototype.open = function () {
    };
    CtrlBase.prototype.close = function () {
    };
    CtrlBase.prototype.dispose = function () {
        if (this.z_view != null) {
            this.z_view.dispose();
            this.z_view = null;
        }
    };
    return CtrlBase;
}());
__reflect(CtrlBase.prototype, "CtrlBase", ["IDispose"]);
//# sourceMappingURL=CtrlBase.js.map