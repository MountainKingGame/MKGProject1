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
        var UI_ContentLayer = /** @class */ (function (_super) {
            __extends(UI_ContentLayer, _super);
            function UI_ContentLayer() {
                return _super.call(this) || this;
            }
            UI_ContentLayer.createInstance = function () {
                return (fairygui.UIPackage.createObject("battles_1", "ContentLayer"));
            };
            UI_ContentLayer.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_bg = (this.getChildAt(0));
            };
            UI_ContentLayer.URL = "ui://ybsps8tfqitl1";
            return UI_ContentLayer;
        }(fairygui.GComponent));
        battles_1.UI_ContentLayer = UI_ContentLayer;
    })(battles_1 = fuis.battles_1 || (fuis.battles_1 = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=UI_ContentLayer.js.map