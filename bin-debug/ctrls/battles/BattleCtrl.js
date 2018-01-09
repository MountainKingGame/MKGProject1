var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BattleCtrl = (function (_super) {
    __extends(BattleCtrl, _super);
    function BattleCtrl(view) {
        var _this = _super.call(this, view) || this;
        _this.partialOnFrame = new BattleCtrlPartialOnFrame(_this);
        _this.view = view;
        return _this;
    }
    Object.defineProperty(BattleCtrl.prototype, "model", {
        /**
         * battle model
         */
        get: function () {
            return this.proxy.model;
        },
        enumerable: true,
        configurable: true
    });
    BattleCtrl.prototype.dispose = function () {
        if (this.view != null) {
            this.view.dispose();
            this.view = null;
        }
        _super.prototype.dispose.call(this);
    };
    BattleCtrl.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        //
        this.proxy = new BattleProxy();
        this.proxy.facade = this.facade;
        this.proxy.init();
        //
        this.initUI();
        setInterval(function () { return _this.partialOnFrame.onFrame_model(); }, BattleConst.inst.modelFrameMs);
        setInterval(function () { return _this.partialOnFrame.onFrame_view(); }, GameConst.inst.viewFrameMs);
        //
        this.partialOnFrame.AddTank();
    };
    BattleCtrl.prototype.initUI = function () {
        this.facade.ctrlMgr.addCtrl(CtrlId.Joysick, this.joystick = new JoystickCtrl(this.view.m_joysick));
    };
    return BattleCtrl;
}(CtrlBase));
__reflect(BattleCtrl.prototype, "BattleCtrl");
//# sourceMappingURL=BattleCtrl.js.map