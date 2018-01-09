var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MathUtil = (function () {
    function MathUtil() {
    }
    /**
     * 循环数值t,min到max之间。t值永远不会大于等于max的值,也永远不会小于0
     * e.g. repeat(370,0,360)=>10; repeat(-90,0,360)=>270;  repeat(752,0,360)=>32;
     */
    MathUtil.repeat = function (val, min, max) {
        var diff = max - min;
        while (val >= max) {
            val -= diff;
        }
        while (val < min) {
            val += diff;
        }
        return val;
    };
    MathUtil.repeatDegree = function (val) {
        return MathUtil.repeat(val, 0, 360);
    };
    /**
     * 限制value的值在min和max之间， 如果value小于min，返回min。 如果value大于max，返回max，否则返回value
     * e.g. clamp(-3,0,10)=>0; clamp(30,0,12)=>12;  clamp(20,0,42)=>20;
     */
    MathUtil.clamp = function (val, min, max) {
        if (val > max) {
            return max;
        }
        if (val < min) {
            return min;
        }
        return val;
    };
    MathUtil.magnitude = function (diffX, diffY) {
        return Math.sqrt(diffX * diffX + diffY * diffY);
    };
    MathUtil.distance = function (ax, ay, bx, by) {
        return MathUtil.magnitude(bx - ax, by - ay);
    };
    return MathUtil;
}());
__reflect(MathUtil.prototype, "MathUtil");
//# sourceMappingURL=MathUtil.js.map