var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TimeMgr = (function () {
    function TimeMgr() {
        var _this = this;
        this.startTime = Date.now();
        // setInterval(()=>this.onFrame(),1);
        setInterval(function () { return _this.onFrame(); }, GameConst.inst.viewFrameMs);
    }
    TimeMgr.prototype.onFrame = function () {
        this.time = Date.now() - this.startTime;
    };
    return TimeMgr;
}());
__reflect(TimeMgr.prototype, "TimeMgr");
//# sourceMappingURL=TimeMgr.js.map