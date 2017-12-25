var BattleModelPartialOnFrame = /** @class */ (function () {
    function BattleModelPartialOnFrame(owner) {
        this.owner = owner;
    }
    /**
     * onFrame
     */
    BattleModelPartialOnFrame.prototype.onFrame = function () {
        this.owner.currFrame++;
        this.onFrame_inCmd();
        this.onFrame_hitTest(); //因为被hit后的物品是不能在做后面动作了
        this.onFrame_generate();
        this.onFrame_fire();
        this.onFrame_move(); //move放最后,因为需要view在这一帧移动到xy,然后下一帧再处理hit等事项
    };
    BattleModelPartialOnFrame.prototype.onFrame_inCmd = function () {
    };
    BattleModelPartialOnFrame.prototype.onFrame_generate = function () {
    };
    BattleModelPartialOnFrame.prototype.onFrame_fire = function () {
    };
    BattleModelPartialOnFrame.prototype.onFrame_hitTest = function () {
    };
    /**
     * onFrame_move
     */
    BattleModelPartialOnFrame.prototype.onFrame_move = function () {
    };
    return BattleModelPartialOnFrame;
}());
//# sourceMappingURL=BattleModelPartialOnFrame.js.map