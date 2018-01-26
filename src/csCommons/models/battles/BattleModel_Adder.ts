namespace models.battles {
    /**
     * 为BattleModel添加新物品的方法集合
     */
    export class BattleModel_Adder {
        public model: BattleModel;
        constructor(model: BattleModel) {
            this.model = model;
        }
        addTankByIStcMapVoPlayer(position: IStcMapPosition):TankVo {
            let vo: TankVo = new TankVo();
            vo.sid = 1;
            vo.uid = this.model.tankUId++;
            vo.x = BattleModelUtil.gridToPos(position.col);
            vo.y = BattleModelUtil.gridToPos(position.row);
            vo.dir = position.dir;
            this.addTankVo(vo);
            return vo;
        }
        addTankVo(vo: TankVo) {
            vo.apTank = 50;
            vo.apCell = 250;
            vo.hp = vo.hpMax = 200;
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
            this.model.tankMap[vo.uid] = vo;
            if(this.model.groupTankCount[vo.group]==undefined){
                this.model.groupTankCount[vo.group]=0;
            }
            this.model.groupTankCount[vo.group]++;
            //-
            this.model.qtTank.insert(vo.hitRect);
            this.model.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.AddTank, this.model.currFrame,vo.uid));
        }
        rebirthTank(vo:TankVo){
            // vo.stateA = BattleVoStateA.Rebirth;
            vo.hp = vo.hpMax;
            vo.stateFrame = 0;
            vo.moveDir = Direction4.None;
            vo.x = BattleModelUtil.gridToPos(this.model.stcMapVo.positions[vo.initIndex].col);
            vo.y = BattleModelUtil.gridToPos(this.model.stcMapVo.positions[vo.initIndex].row);
            vo.dir = this.model.stcMapVo.positions[vo.initIndex].dir;
            vo.xOld = vo.x;
            vo.yOld = vo.y;
            vo.hitRect.recountPivotCenter(vo.x, vo.y,vo.sizeHalf.x,vo.sizeHalf.y);
            //
            this.model.buffer.addBuff(vo,StcBuffSid.Invincible,BattleModelConfig.si.rebirthInvincibleFrame);
            //
            this.model.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.RebirthTank, this.model.currFrame,vo.uid));
        }
        addBulletVo(vo: BulletVo) {
            vo.xOld = vo.x;
            vo.yOld = vo.y;
            vo.moveSpeedPerFrame = BattleModelConfig.si.bulletMoveSpeedPerFrame;
            vo.sizeHalf = new Vector2(10,20);
            vo.hitRect = new QuadTreeHitRect(vo);
            vo.hitRect.recountPivotCenter(vo.x, vo.y,vo.sizeHalf.x,vo.sizeHalf.y);
            vo.stateA = BattleVoStateA.Living;
            this.model.bulletMap[vo.uid] = vo;
            this.model.qtBullet.insert(vo.hitRect);
            this.model.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.AddBullet, this.model.currFrame, vo.ownerUid, vo.uid));
        }
        /*cell's pivot is left-top*/
        addCellVo(vo: CellVo) {
            vo.hp = vo.hpMax = BattleModelConfig.si.cellHpMax;
            this.model.cellMap[vo.uid] = vo;
            if (vo.sid != StcCellSid.floor && vo.sid!=StcCellSid.cover) {
                vo.hitRect = new QuadTreeHitRect(vo);
                vo.hitRect.recountLeftTop(vo.x, vo.y, BattleModelConfig.si.cellSize, BattleModelConfig.si.cellSize);
                this.model.qtCell.insert(vo.hitRect);
            }
        }
        removeBullet(vo: BulletVo) {
            vo.stateA = BattleVoStateA.Dump;
            QuadTree.removeItem(vo.hitRect);
            this.model.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.RemoveBullet, this.model.currFrame, vo.ownerUid, vo.uid));
            //
            //don't remove, wait after ctrl used
            this.model.dumpBulletMap[vo.uid] = vo;
            delete this.model.bulletMap[vo.uid];
        }
        removeTank(vo:TankVo){
            vo.stateA = BattleVoStateA.Dump;
            QuadTree.removeItem(vo.hitRect);
            this.model.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.RemoveTank, this.model.currFrame, vo.uid, vo.uid));
            //
            this.model.dumpTankMap[vo.uid] = vo;
            delete this.model.tankMap[vo.uid];
            this.model.groupTankCount[vo.group]--;
            //
            if(this.model.aiTankMap[vo.uid]){
                this.model.aiTankMap[vo.uid].dispose();
                delete this.model.aiTankMap[vo.uid];
            }
        }
        removeDumpAll() {
            for (const uid in this.model.dumpCellMap) {
                this.model.dumpCellMap[uid].dispose();
                delete this.model.dumpCellMap[uid];
            }
            for (const uid in this.model.dumpBulletMap) {
                let vo: BulletVo = this.model.dumpBulletMap[uid];
                vo.dispose();
                delete this.model.dumpBulletMap[uid];
            }
            for (const uid in this.model.dumpTankMap) {
                this.model.dumpTankMap[uid].dispose();
                delete this.model.dumpTankMap[uid];
            }
        }
    }

}