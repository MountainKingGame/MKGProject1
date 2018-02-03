namespace models.fights {
    /**
     * 为BattleModel添加新物品的方法集合
     */
    export class FightModel_Changer {
        public model: FightModel;
        constructor(model: FightModel) {
            this.model = model;
        }
        addTankByIStcMapVoPlayer(position: IStcMapPositionVo):TankVo {
            let vo: TankVo = new TankVo();
            vo.sid = 1;
            vo.uid = this.model.tankUId++;
            vo.x = FightModelUtil.gridToPos(position.col);
            vo.y = FightModelUtil.gridToPos(position.row);
            vo.dir = position.dir;
            this.addTank(vo);
            return vo;
        }
        addTank(vo: TankVo) {
            vo.apTank = 50;
            vo.apCell = 220;
            vo.hp = vo.hpMax = 200;
            vo.yOld = vo.y;
            vo.stateA = FightVoStateA.Living;
            vo.stateFrame = 0;
            //-
            vo.moveSpeedPerFrame = FightModelConfig.si.tankMoveSpeedPerFrame;
            vo.sizeHalf = new Vector2(FightModelConfig.si.cellSize,FightModelConfig.si.cellSize);
            vo.hitRect = new QuadTreeHitRect(vo);
            vo.hitRect.recountPivotCenter(vo.x, vo.y,vo.sizeHalf.x,vo.sizeHalf.y);
            vo.forecastMoveHitRect = new QuadTreeHitRect(vo);
            //-
            let skillVo = new SkillVo();
            skillVo.sid = StcSkillSid.DefaultOne;
            skillVo.castGapFrame = FightModelConfig.si.modelFrameRate / 2;
            vo.skillDic[skillVo.sid] = skillVo;
            //-
            this.model.tankDic[vo.uid] = vo;
            if(this.model.groupTankCount[vo.group]==undefined){
                this.model.groupTankCount[vo.group]=0;
            }
            this.model.groupTankCount[vo.group]++;
            //-
            this.model.qtTank.insert(vo.hitRect);
            this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.AddTank, this.model.currFrame,vo.uid));
        }
        rebirthTank(vo:TankVo){
            vo.hp = vo.hpMax;
            vo.stateFrame = 0;
            vo.moveDir = Direction4.None;
            vo.x = FightModelUtil.gridToPos(this.model.stcMapVo.positionMap[vo.initPositionSid].col);
            vo.y = FightModelUtil.gridToPos(this.model.stcMapVo.positionMap[vo.initPositionSid].row);
            vo.dir = this.model.stcMapVo.positionMap[vo.initPositionSid].dir;
            vo.xOld = vo.x;
            vo.yOld = vo.y;
            vo.hitRect.recountPivotCenter(vo.x, vo.y,vo.sizeHalf.x,vo.sizeHalf.y);
            //
            this.model.buffer.addBuff(vo,StcBuffSid.Invincible,FightModelConfig.si.rebirthInvincibleFrame);
            //
            this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.RebirthTank, this.model.currFrame,vo.uid));
        }
        addBullet(vo: BulletVo) {
            vo.xOld = vo.x;
            vo.yOld = vo.y;
            vo.moveSpeedPerFrame = FightModelConfig.si.bulletMoveSpeedPerFrame;
            vo.sizeHalf = new Vector2(10,20);
            vo.hitRect = new QuadTreeHitRect(vo);
            vo.hitRect.recountPivotCenter(vo.x, vo.y,vo.sizeHalf.x,vo.sizeHalf.y);
            vo.stateA = FightVoStateA.Living;
            this.model.bulletDic[vo.uid] = vo;
            this.model.qtBullet.insert(vo.hitRect);
            this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.AddBullet, this.model.currFrame, vo.ownerUid, vo.uid));
        }
        /*cell's pivot is left-top*/
        addCell(vo: CellVo) {
            vo.hp = vo.hpMax = FightModelConfig.si.cellHpMax;
            this.model.cellDic[vo.uid] = vo;
            if (vo.sid != StcCellSid.floor && vo.sid!=StcCellSid.cover) {
                vo.hitRect = new QuadTreeHitRect(vo);
                vo.hitRect.recountLeftTop(vo.x, vo.y, FightModelConfig.si.cellSize, FightModelConfig.si.cellSize);
                this.model.qtCell.insert(vo.hitRect);
            }
        }
        clearCell(cell:CellVo){
            cell.hp = 0;
            cell.sid = StcCellSid.floor;
            if(cell.hitRect){
                QuadTree.removeItem(cell.hitRect);
            }
            cell.disposeHitRect();
        }
        removeBullet(vo: BulletVo) {
            vo.stateA = FightVoStateA.Dump;
            QuadTree.removeItem(vo.hitRect);
            this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.RemoveBullet, this.model.currFrame, vo.ownerUid, vo.uid));
            //
            //don't remove, wait after ctrl used
            this.model.dumpBulletDic[vo.uid] = vo;
            delete this.model.bulletDic[vo.uid];
        }
        removeTank(vo:TankVo){
            vo.stateA = FightVoStateA.Dump;
            QuadTree.removeItem(vo.hitRect);
            this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.RemoveTank, this.model.currFrame, vo.uid, vo.uid));
            //
            this.model.dumpTankDic[vo.uid] = vo;
            delete this.model.tankDic[vo.uid];
            this.model.groupTankCount[vo.group]--;
            //
            if(this.model.aiTankDic[vo.uid]){
                this.model.aiTankDic[vo.uid].dispose();
                delete this.model.aiTankDic[vo.uid];
            }
        }
        removeDumpAll() {
            for (const uid in this.model.dumpCellDic) {
                this.model.dumpCellDic[uid].dispose();
                delete this.model.dumpCellDic[uid];
            }
            for (const uid in this.model.dumpBulletDic) {
                let vo: BulletVo = this.model.dumpBulletDic[uid];
                vo.dispose();
                delete this.model.dumpBulletDic[uid];
            }
            for (const uid in this.model.dumpTankDic) {
                this.model.dumpTankDic[uid].dispose();
                delete this.model.dumpTankDic[uid];
            }
        }
    }

}