var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
* name;
*/
var BattleService = (function () {
    function BattleService() {
    }
    BattleService.prototype.init = function () {
        this.mgr.add(123, this, this.req);
    };
    BattleService.prototype.req = function (cmd, req) {
        this.mgr.res(cmd, null);
    };
    return BattleService;
}());
__reflect(BattleService.prototype, "BattleService");
//# sourceMappingURL=BattleService.js.map