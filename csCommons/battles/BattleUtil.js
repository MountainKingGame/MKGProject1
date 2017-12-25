var BattleUtil = /** @class */ (function () {
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
//# sourceMappingURL=BattleUtil.js.map