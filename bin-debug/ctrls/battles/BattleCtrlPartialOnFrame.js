var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BattleCtrlPartialOnFrame = (function () {
    function BattleCtrlPartialOnFrame(owner) {
        this.owner = owner;
    }
    BattleCtrlPartialOnFrame.prototype.onFrame_model = function () {
        // let date:Date = new Date();
        // console.log("[debug]",date.getTime
        this.owner.proxy.onFrame();
    };
    BattleCtrlPartialOnFrame.prototype.onFrame_view = function () {
        if (this.owner.model.dirty) {
            //说明执行过proxy.onFrame,需要根据model的数据做处理
            this.owner.proxy.clearFrame();
        }
        //更新自身动画
    };
    BattleCtrlPartialOnFrame.prototype.AddTank = function () {
        var tank = new TankCtrl();
        this.owner.view.addChild(tank.view);
    };
    return BattleCtrlPartialOnFrame;
}());
__reflect(BattleCtrlPartialOnFrame.prototype, "BattleCtrlPartialOnFrame");
//# sourceMappingURL=BattleCtrlPartialOnFrame.js.map