class MathUtil {
    /**计算坐标的的角度值 */
    static rotationRadian(x: number, y: number): number {
        if (x == 0) {
            if (y > 0) {
                return Math.PI / 2;
            }
            else if (y < 0) {
                return -Math.PI / 2;
            }
            else {
                return 0;
            }
        }
        else {
            return Math.atan2(y, x);
        }
    }
    /**计算坐标的弧度值 */
    static rotationDegree(x: number, y: number): number {
        return MathUtil.radian2Degree(MathUtil.rotationRadian(x, y));
    }
    /**弧度值转角度值 */
    static radian2Degree(radian: number): number {
        return radian * 180 / Math.PI;
    }
    /**角度值转弧度值 */
    static degree2Radian(degree: number): number {
        return degree * Math.PI / 180;
    }
    /**
     * 循环数值t,min到max之间。t值永远不会大于等于max的值,也永远不会小于0
     * e.g. repeat(370,0,360)=>10; repeat(-90,0,360)=>270;  repeat(752,0,360)=>32;
     */
    public static repeat(val: number, min: number, max: number): number {
        let diff: number = max - min;
        while (val >= max) {
            val -= diff;
        }
        while (val < min) {
            val += diff;
        }
        return val;
    }
    public static repeatDegree(val: number): number {
        return MathUtil.repeat(val, 0, 360);
    }
    /**
     * 限制value的值在min和max之间， 如果value小于min，返回min。 如果value大于max，返回max，否则返回value
     * e.g. clamp(-3,0,10)=>0; clamp(30,0,12)=>12;  clamp(20,0,42)=>20;
     */
    public static clamp(val: number, min: number, max: number): number {
        if (val >= max) {
            return max;
        }
        if (val <= min) {
            return min;
        }
        return val;
    }
    public static magnitude(diffX: number, diffY: number): number {
        return Math.sqrt(diffX * diffX + diffY * diffY);
    }
    public static distance(ax: number, ay: number, bx: number, by: number): number {
        return MathUtil.magnitude(bx - ax, by - ay);
    }

    /**
     * 四舍五入
     * @param digit 保留小数位数
     */
    static round(val: number, digit: number = 0) {
        if (digit == 0) {
            return Math.round(val); //TODO:
        } else {
            digit = Math.pow(10, digit);
            return Math.round(val * digit) / digit;
        }
    }
    static randomInt(min: number, max: number) {
        return Math.round(Math.random() * (max - min) + min);
    }
    static random(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
    /**
     * 在a b之间做插值,从a到b
     * @param a 
     * @param b 
     * @param t 
     */
    static lerp(a: number, b: number, t: number) {

        return (b - a) * t + a
    }
    /**
     * 两个degree插值
     * @param a 
     * @param b 
     * @param t 
     */
    static lerpAngle(a: number, b: number, t: number) {
        a = MathUtil.repeatDegree(a)
        b = MathUtil.repeatDegree(b)
        if (a == b) {
            return a
        } else if (a < b) {
            if ((b - a) > 180) {
                b = b - 360
            }
        } else {
            //a>b
            if ((a - b) > 180) {
                b = b + 360
            }
        }
        return MathUtil.lerp(a, b, t)
    }
}