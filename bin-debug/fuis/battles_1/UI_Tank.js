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
    var battles_1;
    (function (battles_1) {
        var UI_Tank = (function (_super) {
            __extends(UI_Tank, _super);
            function UI_Tank() {
                return _super.call(this) || this;
            }
            UI_Tank.createInstance = function () {
                return (fairygui.UIPackage.createObject("battles_1", "Tank"));
            };
            UI_Tank.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_c1 = this.getControllerAt(0);
                this.m_icon = (this.getChildAt(0));
            };
            UI_Tank.URL = "ui://ybsps8tfu9bo3";
            return UI_Tank;
        }(fairygui.GComponent));
        battles_1.UI_Tank = UI_Tank;
        __reflect(UI_Tank.prototype, "fuis.battles_1.UI_Tank");
    })(battles_1 = fuis.battles_1 || (fuis.battles_1 = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=UI_Tank.js.map