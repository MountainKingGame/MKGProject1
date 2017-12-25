var NetMgr = /** @class */ (function () {
    function NetMgr() {
        this.fake = new ServiceMgr();
    }
    NetMgr.prototype.init = function () {
        this.fake.netMgr = this;
        this.fake.init();
    };
    NetMgr.prototype.req = function (cmd, req, callback, resClass) {
        if (callback === void 0) { callback = null; }
        if (resClass === void 0) { resClass = null; }
        console.log("[debug]", "send", cmd);
        this.fake.req(cmd, req);
    };
    NetMgr.prototype.res = function (cmd, res) {
        if (res === void 0) { res = null; }
        console.log("[debug]", "receive", cmd);
    };
    return NetMgr;
}());
//# sourceMappingURL=NetMgr.js.map