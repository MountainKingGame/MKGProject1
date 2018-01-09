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
var JoystickCtrl = (function (_super) {
    __extends(JoystickCtrl, _super);
    function JoystickCtrl(view) {
        var _this = _super.call(this, view) || this;
        _this.view = view;
        return _this;
    }
    JoystickCtrl.prototype.dispose = function () {
        if (this.view != null) {
            this.view.dispose();
            this.view = null;
        }
        _super.prototype.dispose.call(this);
    };
    JoystickCtrl.prototype.init = function () {
        _super.prototype.init.call(this);
        fairygui.GRoot.inst.addChild(this.view);
        this.txtLog = this.view.m_txt_log;
        this.module = new JoystickModule(this.view);
        // this.module.addEventListener(JoystickModule.JoystickMoving,this.onJoystickMoving,this);
        // this.module.addEventListener(JoystickModule.JoystickUp,this.onJoystickUp,this);
        // this.module.on(JoystickModule.JoystickMoving,this,this.onJoystickMoving);
        // this.module.on(JoystickModule.JoystickUp,this,this.onJoystickUp);
        SDKAdapterFG.GObject_addEventListener(this.module, JoystickModule.JoystickMoving, this.onJoystickMoving, this);
        SDKAdapterFG.GObject_addEventListener(this.module, JoystickModule.JoystickUp, this.onJoystickUp, this);
        // this.txtLog.visible = false;
        this.view.m_joystick_dir.visible = false;
    };
    JoystickCtrl.prototype.onJoystickMoving = function (val) {
        // this.txtLog.text = "" + evt.data;
        val = MathUtil.repeatDegree(val);
        val = Math.round(val / 90) + 1;
        if (val >= 5) {
            val = 1;
        }
        this.view.m_joystick_dir.visible = true;
        this.view.m_joystick_dir.rotation = (val - 1) * 90;
        this.view.m_joystick_dir.setXY(this.view.m_joystick_center.x, this.view.m_joystick_center.y);
        var dir = val;
        // this.txtLog.text = "" + evt.data + " dir:"+dir.toString();
    };
    JoystickCtrl.prototype.onJoystickUp = function () {
        this.txtLog.text = "";
        this.view.m_joystick_dir.visible = false;
    };
    return JoystickCtrl;
}(CtrlBase));
__reflect(JoystickCtrl.prototype, "JoystickCtrl");
//# sourceMappingURL=JoystickCtrl.js.map