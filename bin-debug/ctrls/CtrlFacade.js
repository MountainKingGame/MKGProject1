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
var CtrlFacade = /** @class */ (function (_super) {
    __extends(CtrlFacade, _super);
    function CtrlFacade() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CtrlFacade.prototype.init = function () {
        _super.prototype.init.call(this);
        console.log("[info]", "CtrlFacade.init()", "2018-01-10 16:26:30");
        this.root = new fairygui.GComponent();
        fairygui.GRoot.inst.addChild(this.root);
        //
        var ctrl = new SceneCtrl();
        ctrl.init();
        this.root.addChild(ctrl.ui);
    };
    return CtrlFacade;
}(ModelFacade));
//# sourceMappingURL=CtrlFacade.js.map