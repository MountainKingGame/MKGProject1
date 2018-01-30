class MovableEleCtrl extends CtrlBase<fairygui.GComponent>{
    vo: models.fights.MovableEleVo;
    fight: FightCtrl;
    changeDir: boolean;
    init(): void {
        super.init();
        this.ui.x = this.vo.xOld;
        this.ui.y = this.vo.yOld;
    }
    /**本次frame间隔时间内还需要移动的距离 */
    private remainingX: number = 0;
    private remainingY: number = 0;
    tick(): void {
        if (this.fight.proxy.isFrame) {
            if (this.changeDir) this.ui.rotation = CommonHelper.dir4ToDegree(this.vo.dir);
            this.remainingX = this.vo.x - this.ui.x;
            this.remainingY = this.vo.y - this.ui.y;
        }
        //--
        if (this.fight.ticker.nextFrameNeedMs <= 0) {
            this.ui.x = this.vo.x;
            this.ui.y = this.vo.y;
        } else {
            let remainingPercent: number = this.fight.ticker.nextFrameNeedMs / models.fights.FightModelConfig.si.modelMsPerFrame;
            this.ui.x = this.vo.x - this.remainingX * remainingPercent;
            this.ui.y = this.vo.y - this.remainingY * remainingPercent;
        }
    }
    moveDirImmediately(): void {
        if (this.changeDir) this.ui.rotation = CommonHelper.dir4ToDegree(this.vo.dir);
        this.ui.x = this.vo.x;
        this.ui.y = this.vo.y;
        this.remainingX = 0;
        this.remainingY = 0;
    }
    public dispose(): void {
        this.vo = null;
        this.fight = null;
        super.dispose();
    }
}
