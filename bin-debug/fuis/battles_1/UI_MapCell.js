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
        var UI_MapCell = (function (_super) {
            __extends(UI_MapCell, _super);
            function UI_MapCell() {
                return _super.call(this) || this;
            }
            UI_MapCell.createInstance = function () {
                return (fairygui.UIPackage.createObject("battles_1", "MapCell"));
            };
            UI_MapCell.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_icon = (this.getChildAt(0));
            };
            UI_MapCell.URL = "ui://ybsps8tfu9boc";
            return UI_MapCell;
        }(fairygui.GComponent));
        battles_1.UI_MapCell = UI_MapCell;
        __reflect(UI_MapCell.prototype, "fuis.battles_1.UI_MapCell");
    })(battles_1 = fuis.battles_1 || (fuis.battles_1 = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=UI_MapCell.js.map