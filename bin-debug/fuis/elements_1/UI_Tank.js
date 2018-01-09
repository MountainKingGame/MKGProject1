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
    var elements_1;
    (function (elements_1) {
        var UI_Tank = (function (_super) {
            __extends(UI_Tank, _super);
            function UI_Tank() {
                return _super.call(this) || this;
            }
            UI_Tank.createInstance = function () {
                return (fairygui.UIPackage.createObject("elements_1", "Tank"));
            };
            UI_Tank.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_kind = this.getControllerAt(0);
                this.m_color = this.getControllerAt(1);
                this.m_n0 = (this.getChildAt(0));
                this.m_n1 = (this.getChildAt(1));
            };
            UI_Tank.URL = "ui://u4vu42kzh02b0";
            return UI_Tank;
        }(fairygui.GComponent));
        elements_1.UI_Tank = UI_Tank;
        __reflect(UI_Tank.prototype, "fuis.elements_1.UI_Tank");
    })(elements_1 = fuis.elements_1 || (fuis.elements_1 = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=UI_Tank.js.map