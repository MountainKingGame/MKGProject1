var BattleProxy = /** @class */ (function () {
    function BattleProxy() {
    }
    BattleProxy.prototype.init = function () {
        this.model = new BattleModel();
        this.model.facade = this.facade;
        this.model.init();
        // let tank:TankVo = new TankVo();
        // tank.id = 1001;
        // this.model.partialAdd.addTank(tank);
        //
        this.facade.netMgr.req(123, null);
    };
    BattleProxy.prototype.onFrame = function () {
        this.model.partialOnFrame.onFrame();
    };
    BattleProxy.prototype.clearFrame = function () {
        this.model.clearFrame();
    };
    return BattleProxy;
}());
//# sourceMappingURL=BattleProxy.js.map