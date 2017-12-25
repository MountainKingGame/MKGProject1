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
    var battles_1;
    (function (battles_1) {
        var UI_Battle = /** @class */ (function (_super) {
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
    })(battles_1 = fuis.battles_1 || (fuis.battles_1 = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=UI_Battle.js.map