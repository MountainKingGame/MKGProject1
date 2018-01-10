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
        var UI_circle = (function (_super) {
            __extends(UI_circle, _super);
            function UI_circle() {
                return _super.call(this) || this;
            }
            UI_circle.createInstance = function () {
                return (fairygui.UIPackage.createObject("joysticks_1", "circle"));
            };
            UI_circle.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_button = this.getControllerAt(0);
                this.m_thumb = (this.getChildAt(0));
            };
            UI_circle.URL = "ui://rbw1tvvvq9do18";
            return UI_circle;
        }(fairygui.GButton));
        joysticks_1.UI_circle = UI_circle;
        __reflect(UI_circle.prototype, "fuis.joysticks_1.UI_circle");
    })(joysticks_1 = fuis.joysticks_1 || (fuis.joysticks_1 = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=UI_circle.js.map