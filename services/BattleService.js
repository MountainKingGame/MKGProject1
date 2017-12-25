/*
* name;
*/
var BattleService = /** @class */ (function () {
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
//# sourceMappingURL=BattleService.js.map