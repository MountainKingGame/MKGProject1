namespace battleModels {
    /**
     * 为BattleModel添加新物品的方法集合
     */
    export class BattleModelPartialAdd {
        public owner: BattleModel;
        constructor(owner: BattleModel) {
            this.owner = owner;
        }
        addTankByIStcMapVoPlayer(player: IStcMapVoPlayer) {
            let vo: TankVo = new TankVo();
            vo.sid = 1;
            vo.uid = this.owner.tankUId++;
            vo.xy = new Vector2(player.x,player.y);
            this.addTank(vo);
        }
        addTank(vo: TankVo) {
            if (this.owner.tanks[vo.uid] != undefined) {
                console.log("[fatal]", "tankVo.id is exist!", vo);
            } else {
                this.owner.tanks[vo.uid] = vo;
            }
        }
    }
}