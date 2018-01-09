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
var TankCtrl = (function (_super) {
    __extends(TankCtrl, _super);
    function TankCtrl() {
        var _this = this;
        var view = fuis.elements_1.UI_Tank.createInstance();
        _this = _super.call(this, view) || this;
        _this.view = view;
        _this.view.setXY(300, 500);
        _this.view.rotation = 180;
        return _this;
        //
        // this.view.m_icon.filters = [new egret.BlurFilter(12,12)];
        /* var cm: fairygui.utils.ColorMatrix = new fairygui.ColorMatrix();
         // let arr:number[] = [-0.14,1.00,0.94,0.39];
         let arr:number[] = [-0.35,0.95,1.00,-0.26];//红色
         cm.adjustBrightness(arr[0]);
         cm.adjustContrast(arr[1]);
         cm.adjustSaturation(arr[2]);
         cm.adjustHue(arr[3]);
         var cf: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(cm.matrix);
         this.view.m_icon.filters = [cf];*/
    }
    TankCtrl.prototype.dispose = function () {
        if (this.view != null) {
            this.view.dispose();
            this.view = null;
        }
        _super.prototype.dispose.call(this);
    };
    TankCtrl.prototype.init = function () {
        _super.prototype.init.call(this);
        // this.view.m_icon.color = "0x00FF00";
        // this.view.m_icon.color = 0x00FFFF;
    };
    return TankCtrl;
}(CtrlBase));
__reflect(TankCtrl.prototype, "TankCtrl");
//# sourceMappingURL=TankCtrl.js.map