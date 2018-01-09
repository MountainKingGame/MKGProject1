var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ModelFacade = (function () {
    function ModelFacade() {
        console.log("[debug]", "ModelFacade constructor");
        this.timeMgr = new TimeMgr();
        this.netMgr = new NetMgr();
        this.netMgr.init();
    }
    return ModelFacade;
}());
__reflect(ModelFacade.prototype, "ModelFacade");
//# sourceMappingURL=ModelFacade.js.map