var TimeMgr = /** @class */ (function () {
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
//# sourceMappingURL=TimeMgr.js.map