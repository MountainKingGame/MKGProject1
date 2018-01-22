namespace models.battles {
    /**
     * 为BattleModel添加新物品的方法集合
     */
    export class BattleModel_Adder {
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
            vo.hitRect = new QuadTreeHitRect(vo);
            vo.hitRect.z_w = vo.hitRect.z_h = BattleConfig.si.cellSize;
            vo.hitRect.recountPivotCenter(vo.x, vo.y);
            // }
            let skillVo = new SkillVo();
            skillVo.sid = 1;
            skillVo.castGapFrame = BattleConfig.si.modelFrameRate / 2;
            vo.skillMap[skillVo.sid] = skillVo;
            vo.stateA = BattleVoStateA.Living;
            this.owner.tankMap[vo.uid] = vo;
            this.owner.qtTank.insert(vo.hitRect);
            this.owner.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.AddTank, this.owner.currFrame, vo.uid))
        }
        addBulletVo(vo: BulletVo) {
            vo.moveSpeedPerFrame = BattleConfig.si.bulletMoveSpeedPerFrame;
            vo.hitRect = new QuadTreeHitRect(vo);
            vo.hitRect.z_w = 10;
            vo.hitRect.z_h = 20;
            vo.hitRect.recountPivotCenter(vo.x, vo.y);
            vo.stateA = BattleVoStateA.Living;
            this.owner.bulletMap[vo.uid] = vo;
            this.owner.qtBullet.insert(vo.hitRect);
            this.owner.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.AddBullet, this.owner.currFrame, vo.ownerUid, vo.uid));
        }
        /*cell's pivot is left-top*/
        addCellVo(vo: CellVo) {
            this.owner.cellMap[vo.uid] = vo;
            if (vo.sid > 0) {//0 is normal earth
                vo.hitRect = new QuadTreeHitRect(vo);
                vo.hitRect.recountLeftTop(vo.x, vo.y, BattleConfig.si.cellSize, BattleConfig.si.cellSize);
                this.owner.qtCell.insert(vo.hitRect);
            }
        }
        removeDumpAll() {
            for (const uid in this.owner.dumpCellMap) {
                delete this.owner.dumpCellMap[uid];
            }
            for (const uid in this.owner.dumpBulletMap) {
                // let vo: BulletVo = this.owner.bulletMap[uid];
                delete this.owner.dumpBulletMap[uid];
            }
            for (const uid in this.owner.dumpTankMap) {
                delete this.owner.dumpTankMap[uid];
            }
        }
    }

}