namespace models.battles {
    /**
     * 为BattleModel添加新物品的方法集合
     */
    export class BattleModel_Adder {
        public owner: BattleModel;
        constructor(owner: BattleModel) {
            this.owner = owner;
        }
        addTankByIStcMapVoPlayer(position: IStcMapPosition):TankVo {
            let vo: TankVo = new TankVo();
            vo.sid = 1;
            vo.uid = this.owner.tankUId++;
            vo.x = BattleModelUtil.gridToPos(position.col);
            vo.y = BattleModelUtil.gridToPos(position.row);
            vo.dir = position.dir;
            this.addTankVo(vo);
            return vo;
        }
        addTankVo(vo: TankVo) {
            vo.xOld = vo.x;
            vo.yOld = vo.y;
            vo.stateA = BattleVoStateA.Living;
            vo.stateFrame = 0;
            //-
            vo.moveSpeedPerFrame = BattleModelConfig.si.tankMoveSpeedPerFrame;
            vo.sizeHalf = new Vector2(BattleModelConfig.si.cellSize,BattleModelConfig.si.cellSize);
            vo.hitRect = new QuadTreeHitRect(vo);
            vo.hitRect.recountPivotCenter(vo.x, vo.y,vo.sizeHalf.x,vo.sizeHalf.y);
            vo.forecastMoveHitRect = new QuadTreeHitRect(vo);
            //-
            let skillVo = new SkillVo();
            skillVo.sid = StcSkillSid.DefaultOne;
            skillVo.castGapFrame = BattleModelConfig.si.modelFrameRate / 2;
            vo.skillMap[skillVo.sid] = skillVo;
            //-
            this.owner.tankMap[vo.uid] = vo;
            if(this.owner.groupTankCount[vo.group]==undefined){
                this.owner.groupTankCount[vo.group]=0;
            }
            this.owner.groupTankCount[vo.group]++;
            //-
            this.owner.qtTank.insert(vo.hitRect);
            this.owner.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.AddTank, this.owner.currFrame,vo.uid));
        }
        rebirthTank(vo:TankVo){
            // vo.stateA = BattleVoStateA.Rebirth;
            vo.stateFrame = 0;
            vo.moveDir = Direction4.None;
            vo.x = BattleModelUtil.gridToPos(this.owner.stcMapVo.positions[vo.initIndex].col);
            vo.y = BattleModelUtil.gridToPos(this.owner.stcMapVo.positions[vo.initIndex].row);
            vo.dir = this.owner.stcMapVo.positions[vo.initIndex].dir;
            vo.xOld = vo.x;
            vo.yOld = vo.y;
            vo.hitRect.recountPivotCenter(vo.x, vo.y,vo.sizeHalf.x,vo.sizeHalf.y);
            //
            this.owner.buffer.addBuff(vo,StcBuffSid.Invincible,BattleModelConfig.si.rebirthInvincibleFrame);
            //
            this.owner.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.RebirthTank, this.owner.currFrame,vo.uid));
        }
        addBulletVo(vo: BulletVo) {
            vo.xOld = vo.x;
            vo.yOld = vo.y;
            vo.moveSpeedPerFrame = BattleModelConfig.si.bulletMoveSpeedPerFrame;
            vo.sizeHalf = new Vector2(10,20);
            vo.hitRect = new QuadTreeHitRect(vo);
            vo.hitRect.recountPivotCenter(vo.x, vo.y,vo.sizeHalf.x,vo.sizeHalf.y);
            vo.stateA = BattleVoStateA.Living;
            this.owner.bulletMap[vo.uid] = vo;
            this.owner.qtBullet.insert(vo.hitRect);
            this.owner.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.AddBullet, this.owner.currFrame, vo.ownerUid, vo.uid));
        }
        /*cell's pivot is left-top*/
        addCellVo(vo: CellVo) {
            this.owner.cellMap[vo.uid] = vo;
            if (vo.sid != StcCellSid.floor && vo.sid!=StcCellSid.cover) {
                vo.hitRect = new QuadTreeHitRect(vo);
                vo.hitRect.recountLeftTop(vo.x, vo.y, BattleModelConfig.si.cellSize, BattleModelConfig.si.cellSize);
                this.owner.qtCell.insert(vo.hitRect);
            }
        }
        removeBullet(vo: BulletVo) {
            vo.stateA = BattleVoStateA.Dump;
            QuadTree.removeItem(vo.hitRect);
            this.owner.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.RemoveBullet, this.owner.currFrame, vo.ownerUid, vo.uid));
            //
            //don't remove, wait after ctrl used
            this.owner.dumpBulletMap[vo.uid] = vo;
            delete this.owner.bulletMap[vo.uid];
        }
        removeTank(vo:TankVo){
            vo.stateA = BattleVoStateA.Dump;
            QuadTree.removeItem(vo.hitRect);
            this.owner.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.RemoveTank, this.owner.currFrame, vo.uid, vo.uid));
            //
            this.owner.dumpTankMap[vo.uid] = vo;
            delete this.owner.tankMap[vo.uid];
            this.owner.groupTankCount[vo.group]--;
            //
            if(this.owner.aiTankMap[vo.uid]){
                this.owner.aiTankMap[vo.uid].dispose();
                delete this.owner.aiTankMap[vo.uid];
            }
        }
        removeDumpAll() {
            for (const uid in this.owner.dumpCellMap) {
                this.owner.dumpCellMap[uid].dispose();
                delete this.owner.dumpCellMap[uid];
            }
            for (const uid in this.owner.dumpBulletMap) {
                let vo: BulletVo = this.owner.dumpBulletMap[uid];
                vo.dispose();
                delete this.owner.dumpBulletMap[uid];
            }
            for (const uid in this.owner.dumpTankMap) {
                this.owner.dumpTankMap[uid].dispose();
                delete this.owner.dumpTankMap[uid];
            }
        }
    }

}