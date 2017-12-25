var CtrlBase = /** @class */ (function () {
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
//# sourceMappingURL=CtrlBase.js.map