var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BattleModel = (function () {
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
__reflect(BattleModel.prototype, "BattleModel");
//# sourceMappingURL=BattleModel.js.map