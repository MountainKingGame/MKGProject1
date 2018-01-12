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
        var dir:Direction4 = this.owner.currInputMoveDir;
        if (dir == Direction4.None) {
        } else {
            var tank: TankCtrl = this.owner.tanks[0];
            tank.ui.rotation = Direction4Util.dirToDegree(dir);
            switch (dir) {
                case Direction4.Left:
                    tank.ui.x++;
                    break;
                case Direction4.Right:
                    tank.ui.x--;
                    break;
                case Direction4.Up:
                    tank.ui.y--;
                    break;
                case Direction4.Down:
                    tank.ui.y++;
                    break;
            }
        }
        //更新自身动画
    }

}