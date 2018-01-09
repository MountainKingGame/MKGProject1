/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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