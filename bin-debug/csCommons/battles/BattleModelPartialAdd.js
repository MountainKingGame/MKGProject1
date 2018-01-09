var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 为BattleModel添加新物品的方法集合
 */
var BattleModelPartialAdd = (function () {
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
__reflect(BattleModelPartialAdd.prototype, "BattleModelPartialAdd");
//# sourceMappingURL=BattleModelPartialAdd.js.map