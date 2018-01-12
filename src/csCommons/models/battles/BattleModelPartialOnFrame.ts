class BattleModelPartialOnFrame{
    public owner:BattleModel;
    constructor(owner:BattleModel){
        this.owner = owner;
    }

    /**
     * onFrame
     */
    public onFrame() {
        this.owner.currFrame++;
        this.onFrame_inCmd();
        this.onFrame_hitTest();//因为被hit后的物品是不能在做后面动作了
        this.onFrame_generate();
        this.onFrame_fire();
        this.onFrame_move();//move放最后,因为需要view在这一帧移动到xy,然后下一帧再处理hit等事项
    }
    public onFrame_inCmd(){

    }
    public onFrame_generate() {
    }
    public onFrame_fire() {

    }
    public onFrame_hitTest() {

    }
    /**
     * onFrame_move
     */
    public onFrame_move() {

    }
}