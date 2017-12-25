var ModelFacade = /** @class */ (function () {
    function ModelFacade() {
        console.log("[debug]", "ModelFacade constructor");
        this.timeMgr = new TimeMgr();
        this.netMgr = new NetMgr();
        this.netMgr.init();
    }
    return ModelFacade;
}());
//# sourceMappingURL=ModelFacade.js.map