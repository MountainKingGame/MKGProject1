class MovableEleCtrl extends CtrlBase<fairygui.GComponent>{
    vo: models.fights.MovableEleVo;
    battle: FightCtrl;
    changeDir: boolean;
    init(): void {
        super.init();
        this.ui.x = this.vo.xOld;
        this.ui.y = this.vo.yOld;
    }
    /**本次frame间隔时间内还需要移动的距离 */
    private frameMoveX: number = 0;
    private frameMoveY: number = 0;
    tick(): void {
        if (this.battle.proxy.isFrame) {
            if (this.changeDir) this.ui.rotation = CommonHelper.dir4ToDegree(this.vo.dir);
            this.frameMoveX = this.vo.x - this.ui.x;
            this.frameMoveY = this.vo.y - this.ui.y;
        }
        let leavePercent: number = this.battle.ticker.nextFrameNeedTime / models.fights.FightModelConfig.si.modelMsPerFrame;
        this.ui.x = this.vo.x - this.frameMoveX * leavePercent;
        this.ui.y = this.vo.y - this.frameMoveY * leavePercent;
    }
    moveDirImmediately(): void {
        if (this.changeDir) this.ui.rotation = CommonHelper.dir4ToDegree(this.vo.dir);
        this.ui.x = this.vo.x;
        this.ui.y = this.vo.y;
        this.frameMoveX = 0;
        this.frameMoveY = 0;
    }
    public dispose(): void {
        this.vo = null;
        this.battle = null;
        super.dispose();
    }
}
