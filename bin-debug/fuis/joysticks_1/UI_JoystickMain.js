/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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
var fuis;
(function (fuis) {
    var joysticks_1;
    (function (joysticks_1) {
        var UI_JoystickMain = (function (_super) {
            __extends(UI_JoystickMain, _super);
            function UI_JoystickMain() {
                return _super.call(this) || this;
            }
            UI_JoystickMain.createInstance = function () {
                return (fairygui.UIPackage.createObject("joysticks_1", "JoystickMain"));
            };
            UI_JoystickMain.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_joystick_dir = (this.getChildAt(0));
                this.m_joystick_center = (this.getChildAt(1));
                this.m_joystick = (this.getChildAt(2));
                this.m_joystick_touch = (this.getChildAt(3));
                this.m_txt_log = (this.getChildAt(4));
            };
            UI_JoystickMain.URL = "ui://rbw1tvvviitt1";
            return UI_JoystickMain;
        }(fairygui.GComponent));
        joysticks_1.UI_JoystickMain = UI_JoystickMain;
        __reflect(UI_JoystickMain.prototype, "fuis.joysticks_1.UI_JoystickMain");
    })(joysticks_1 = fuis.joysticks_1 || (fuis.joysticks_1 = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=UI_JoystickMain.js.map