/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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
var fuis;
(function (fuis) {
    var joysticks_1;
    (function (joysticks_1) {
        var UI_JoystickMain = /** @class */ (function (_super) {
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
                this.m_n9 = (this.getChildAt(4));
            };
            UI_JoystickMain.URL = "ui://rbw1tvvviitt1";
            return UI_JoystickMain;
        }(fairygui.GComponent));
        joysticks_1.UI_JoystickMain = UI_JoystickMain;
    })(joysticks_1 = fuis.joysticks_1 || (fuis.joysticks_1 = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=UI_JoystickMain.js.map