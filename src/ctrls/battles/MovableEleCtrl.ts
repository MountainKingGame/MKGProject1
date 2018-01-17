class MovableEleCtrl extends CtrlBase<fairygui.GComponent>{
    vo:models.battles.MovableEleVo;
    battle:BattleCtrl;
    tick():void{
        if(this.battle.partialTick.isKeyFrame){
            this.ui.rotation = CommonHelper.dir4ToDegree(this.vo.dir); 
            this.ui.x = this.vo.x;
            this.ui.y = this.vo.y;
        }
    }
}
