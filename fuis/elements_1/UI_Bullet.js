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
    var elements_1;
    (function (elements_1) {
        var UI_Bullet = /** @class */ (function (_super) {
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
    })(elements_1 = fuis.elements_1 || (fuis.elements_1 = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=UI_Bullet.js.map