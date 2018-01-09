var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vector2 = (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Vector2.prototype, "magnitude", {
        /**
         * Returns the length of this vector (Read Only).
         * The length of the vector is square root of (x*x+y*y).
         * If you only need to compare magnitudes of some vectors, you can compare squared magnitudes of them using sqrMagnitude (computing squared magnitudes is faster).
         */
        get: function () {
            return MathUtil.magnitude(this.x, this.y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "sqrMagnitude", {
        /**
         * Returns the squared length of this vector (Read Only).
         * Calculating the squared magnitude instead of the magnitude is much faster.
         * Often if you are comparing magnitudes of two vectors you can just compare their squared magnitudes.
         */
        get: function () {
            return this.x * this.x + this.y * this.y;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the distance between a and b.
        Vector2.Distance(a,b) is the same as (a-b).magnitude.
     */
    Vector2.distance = function (a, b) {
        return MathUtil.magnitude(b.x - a.x, b.y - a.y);
    };
    return Vector2;
}());
__reflect(Vector2.prototype, "Vector2");
//# sourceMappingURL=Vector2.js.map