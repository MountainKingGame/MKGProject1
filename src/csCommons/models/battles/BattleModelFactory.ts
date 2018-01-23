namespace models.battles {
    export class BattleModelFactory implements IDispose {
        model: BattleModel;
        stcVo: IStcMapFactory;
        //-
        private delayFrame: number;
        private gapFrame: number;
        private currIndex: number = 0;
        init() {
            this.delayFrame = BattleModelUtil.msToKeyFrame(this.stcVo.delayMs);
            this.delayFrame = Math.max(this.delayFrame, 1);
            this.gapFrame = BattleModelUtil.msToKeyFrame(this.stcVo.gapMs);
        }
        frameCount:number = 0;
        tick():boolean {
            if(this.model.groupTankCount[BattleGroup.CPU]>=this.stcVo.max){
                return false;
            }
            this.frameCount++;
            let needFrame: number = this.delayFrame + this.gapFrame * this.currIndex;
            if (this.frameCount == needFrame) {
                let vo = new TankVo();
                vo.sid = this.stcVo.values[this.currIndex][0];
                vo.uid = this.model.tankUId++;
                let position: IStcMapPosition = this.model.stcMapVo.positionMap[this.stcVo.values[this.currIndex][1]];
                vo.x = BattleModelUtil.gridToPos(position.col);
                vo.y = BattleModelUtil.gridToPos(position.row);
                vo.dir = position.dir;
                vo.group = BattleGroup.CPU;
                vo.moveDir = vo.dir;
                let ai: TankAI = new TankAI();
                ai.owner = vo;
                this.model.aiTankMap[vo.uid] = ai;
                this.model.adder.addTankVo(vo);
                //
                this.currIndex++;
                if(this.currIndex>=this.stcVo.values.length){
                    this.dispose();
                    return true;
                }
            }
            else if (this.frameCount > needFrame) {
                throw new Error("");
            }
            return false;
        }
        public dispose() {
            this.model = null;
            this.stcVo = null;
        }
    }
}