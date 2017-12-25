var ServiceMgr = /** @class */ (function () {
    function ServiceMgr() {
        this.callbackCache = new CallbackCache();
    }
    ServiceMgr.prototype.add = function (cmd, owner, callback) {
        this.callbackCache.addItem(cmd, owner, callback);
    };
    ServiceMgr.prototype.req = function (cmd, req) {
        var item = this.callbackCache.getItemByKey1(cmd);
        if (item == null) {
            console.log("[warn]", this, "No add cmd");
        }
        else {
            item.data.call(item.key2, cmd, req);
        }
    };
    ServiceMgr.prototype.res = function (cmd, res) {
        this.netMgr.res(cmd, res);
    };
    ServiceMgr.prototype.init = function () {
        this.battle = new BattleService();
        this.battle.mgr = this;
        this.battle.init();
    };
    return ServiceMgr;
}());
//# sourceMappingURL=ServiceMgr.js.map