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
    var Package1;
    (function (Package1) {
        var UI_Scene1 = /** @class */ (function (_super) {
            __extends(UI_Scene1, _super);
            function UI_Scene1() {
                return _super.call(this) || this;
            }
            UI_Scene1.createInstance = function () {
                return (fairygui.UIPackage.createObject("Package1", "Scene1"));
            };
            UI_Scene1.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_n1 = (this.getChildAt(0));
                this.m_n0 = (this.getChildAt(1));
            };
            UI_Scene1.URL = "ui://5valqnxpqvpo0";
            return UI_Scene1;
        }(fairygui.GComponent));
        Package1.UI_Scene1 = UI_Scene1;
    })(Package1 = fuis.Package1 || (fuis.Package1 = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=UI_Scene1.js.map