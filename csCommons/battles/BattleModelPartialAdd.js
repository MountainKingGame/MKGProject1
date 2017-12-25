/**
 * 为BattleModel添加新物品的方法集合
 */
var BattleModelPartialAdd = /** @class */ (function () {
    function BattleModelPartialAdd(owner) {
        this.owner = owner;
    }
    BattleModelPartialAdd.prototype.addTank = function (vo) {
        if (this.owner.tanks[vo.id] != undefined) {
            console.log("[fatal]", "tankVo.id is exist!", vo);
        }
        else {
            this.owner.tanks[vo.id] = vo;
        }
    };
    return BattleModelPartialAdd;
}());
//# sourceMappingURL=BattleModelPartialAdd.js.map