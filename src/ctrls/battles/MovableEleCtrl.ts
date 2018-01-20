class MovableEleCtrl extends CtrlBase<fairygui.GComponent>{
    vo:models.battles.MovableEleVo;
    battle:BattleCtrl;
    init():void{
        super.init();
        this.ui.x = this.vo.x;
        this.ui.y = this.vo.y;
    }
    /**本次frame间隔时间内需要移动的距离 */
    private frameMoveX:number = 0;
    private frameMoveY:number = 0;
    tick():void{
        if(this.battle.partialTick.isFrame){
            this.ui.rotation = CommonHelper.dir4ToDegree(this.vo.dir); 
            this.frameMoveX = this.vo.x-this.ui.x;
            this.frameMoveY = this.vo.y-this.ui.y;
        }
        let leavePercent:number = this.battle.partialTick.nextFrameNeedTime/models.battles.BattleConfig.si.modelMsPerFrame;
        this.ui.x = this.vo.x-this.frameMoveX*leavePercent;
        this.ui.y = this.vo.y-this.frameMoveY*leavePercent;
    }
}
