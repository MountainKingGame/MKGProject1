var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BattleUtil = (function () {
    function BattleUtil() {
    }
    /** 是否水平方向 */
    BattleUtil.isHorizontalDirection4 = function (dir) {
        return dir == Direction4.Right || dir == Direction4.Left;
    };
    /** 是否垂直方向 */
    BattleUtil.isVerticalDirection4 = function (dir) {
        return dir == Direction4.Down || dir == Direction4.Up;
    };
    return BattleUtil;
}());
__reflect(BattleUtil.prototype, "BattleUtil");
//# sourceMappingURL=BattleUtil.js.map