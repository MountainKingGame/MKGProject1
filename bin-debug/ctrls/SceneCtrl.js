var SceneCtrl = /** @class */ (function () {
    function SceneCtrl() {
    }
    SceneCtrl.prototype.init = function () {
        this.ui = fuis.Package1.UI_Scene1.createInstance();
        //-
        // this.ui.addClickListener(this.onTouchBegin,this);
        this.ui.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    SceneCtrl.prototype.onTouchBegin = function (evt) {
        console.log("[info]", evt);
        this.ui.m_n0.x = Math.random() * this.ui.width;
    };
    return SceneCtrl;
}());
//# sourceMappingURL=SceneCtrl.js.map