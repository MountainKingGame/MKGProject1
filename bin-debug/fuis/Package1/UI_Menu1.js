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
        var UI_Menu1 = (function (_super) {
            __extends(UI_Menu1, _super);
            function UI_Menu1() {
                return _super.call(this) || this;
            }
            UI_Menu1.createInstance = function () {
                return (fairygui.UIPackage.createObject("Package1", "Menu1"));
            };
            UI_Menu1.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_txt_currCount = (this.getChildAt(0));
                this.m_list0 = (this.getChildAt(1));
                this.m_list1 = (this.getChildAt(2));
            };
            UI_Menu1.URL = "ui://ra63vp0u9acyi";
            return UI_Menu1;
        }(fairygui.GComponent));
        Package1.UI_Menu1 = UI_Menu1;
        __reflect(UI_Menu1.prototype, "fuis.Package1.UI_Menu1");
    })(Package1 = fuis.Package1 || (fuis.Package1 = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=UI_Menu1.js.map