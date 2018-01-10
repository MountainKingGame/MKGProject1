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
        var UI_Battle = (function (_super) {
            __extends(UI_Battle, _super);
            function UI_Battle() {
                return _super.call(this) || this;
            }
            UI_Battle.createInstance = function () {
                return (fairygui.UIPackage.createObject("battles_1", "Battle"));
            };
            UI_Battle.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_bg = (this.getChildAt(0));
                this.m_contentLayer = (this.getChildAt(1));
                this.m_joysick = (this.getChildAt(2));
            };
            UI_Battle.URL = "ui://ybsps8tfqitl0";
            return UI_Battle;
        }(fairygui.GComponent));
        battles_1.UI_Battle = UI_Battle;
        __reflect(UI_Battle.prototype, "fuis.battles_1.UI_Battle");
    })(battles_1 = fuis.battles_1 || (fuis.battles_1 = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=UI_Battle.js.map