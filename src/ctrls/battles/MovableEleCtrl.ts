class MovableEleCtrl extends CtrlBase<fairygui.GComponent>{
    vo:models.battles.MovableEleVo;
    battle:BattleCtrl;
    init():void{
        super.init();
    }
    tick():void{
        if(this.battle.partialTick.isKeyFrame){
            this.ui.rotation = CommonHelper.dir4ToDegree(this.vo.dir); 
            this.ui.x = this.vo.x;
            this.ui.y = this.vo.y;
        }
    }
}
