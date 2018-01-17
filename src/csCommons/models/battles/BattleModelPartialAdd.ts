namespace models.battles {
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
            // vo.col = player.init.col;
            // vo.row = player.init.row;
            vo.x = BattleUtil.gridToPos(player.init.col);
            vo.y = BattleUtil.gridToPos(player.init.row);
            this.addTankVo(vo);
        }
        addTankVo(vo: TankVo) {
            // if (this.owner.tanks[vo.uid] != undefined) {
            // console.log("[fatal]", "tankVo.id is exist!", vo);
            // } else {
            vo.moveSpeedPerFrame = BattleConfig.si.tankMoveSpeedPerFrame;
            vo.hitTestRadii = BattleConfig.si.cellSize;
            this.owner.tanks[vo.uid] = vo;
            this.owner.frameOutputs.push(new BattleFrameIOItem(BattleFrameIOKind.AddTank,this.owner.currFrame,vo.uid))
            // }
            let skillVo = new SkillVo();
            skillVo.sid = 1;
            skillVo.castGapFrame = BattleConfig.si.modelFrameRate;
            vo.skillMap[skillVo.sid] = skillVo;
        }
        addBulletVo(vo: BulletVo) {
            vo.moveSpeedPerFrame = BattleConfig.si.bulletMoveSpeedPerFrame;
            vo.hitTestRadii = 10;
            this.owner.bullets[vo.uid] = vo;
            this.owner.frameOutputs.push(new BattleFrameIOItem(BattleFrameIOKind.AddBullet,this.owner.currFrame,vo.ownerUid,vo.uid))
        }
    }

}