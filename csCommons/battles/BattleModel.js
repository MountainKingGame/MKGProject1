var BattleModel = /** @class */ (function () {
    function BattleModel() {
        this.partialAdd = new BattleModelPartialAdd(this);
        this.partialOnFrame = new BattleModelPartialOnFrame(this);
        //--
        this.dirty = false;
    }
    //
    BattleModel.prototype.init = function () {
        this.currFrame = 0;
        this.tanks = {};
    };
    BattleModel.prototype.clearFrame = function () {
        this.dirty = false;
    };
    return BattleModel;
}());
//# sourceMappingURL=BattleModel.js.map