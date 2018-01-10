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
    var Package1;
    (function (Package1) {
        var UI_Scene1 = (function (_super) {
            __extends(UI_Scene1, _super);
            function UI_Scene1() {
                return _super.call(this) || this;
            }
            UI_Scene1.createInstance = function () {
                return (fairygui.UIPackage.createObject("Package1", "Scene1"));
            };
            UI_Scene1.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_n0 = (this.getChildAt(0));
            };
            UI_Scene1.URL = "ui://5valqnxpqvpo0";
            return UI_Scene1;
        }(fairygui.GComponent));
        Package1.UI_Scene1 = UI_Scene1;
        __reflect(UI_Scene1.prototype, "fuis.Package1.UI_Scene1");
    })(Package1 = fuis.Package1 || (fuis.Package1 = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=UI_Scene1.js.map