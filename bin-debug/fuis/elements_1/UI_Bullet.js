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
    var elements_1;
    (function (elements_1) {
        var UI_Bullet = (function (_super) {
            __extends(UI_Bullet, _super);
            function UI_Bullet() {
                return _super.call(this) || this;
            }
            UI_Bullet.createInstance = function () {
                return (fairygui.UIPackage.createObject("elements_1", "Bullet"));
            };
            UI_Bullet.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_n0 = (this.getChildAt(0));
            };
            UI_Bullet.URL = "ui://u4vu42kzh02b2";
            return UI_Bullet;
        }(fairygui.GComponent));
        elements_1.UI_Bullet = UI_Bullet;
        __reflect(UI_Bullet.prototype, "fuis.elements_1.UI_Bullet");
    })(elements_1 = fuis.elements_1 || (fuis.elements_1 = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=UI_Bullet.js.map