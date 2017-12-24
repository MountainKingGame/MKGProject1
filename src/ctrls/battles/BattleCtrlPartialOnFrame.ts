class BattleCtrlPartialOnFrame{
    public owner:BattleCtrl;
    constructor(owner:BattleCtrl){
        this.owner = owner;
    }
    public onFrame_model(){
        // let date:Date = new Date();
        // console.log("[debug]",date.getTime
        this.owner.proxy.onFrame();
	}
    public onFrame_view(){
        if(this.owner.model.dirty){
            //说明执行过proxy.onFrame,需要根据model的数据做处理
            this.owner.proxy.clearFrame();
        }
        //更新自身动画
    }

    public AddTank(){
        let tank:TankCtrl = new TankCtrl();
        this.owner.view.addChild(tank.view);
    }
    
}