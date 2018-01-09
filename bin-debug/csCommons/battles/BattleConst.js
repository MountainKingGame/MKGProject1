var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BattleConst = (function () {
    function BattleConst() {
        this.modelFrameRate = 10;
        this.modelFrameMs = Math.round(1000 / this.modelFrameRate);
    }
    BattleConst.inst = new BattleConst();
    return BattleConst;
}());
__reflect(BattleConst.prototype, "BattleConst");
//# sourceMappingURL=BattleConst.js.map