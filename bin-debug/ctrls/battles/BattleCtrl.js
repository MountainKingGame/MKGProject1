var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
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