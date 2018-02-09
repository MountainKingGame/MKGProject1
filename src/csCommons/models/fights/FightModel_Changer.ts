namespace models.fights {
    /**
     * 为BattleModel添加新物品的方法集合
     */
    export class FightModel_Changer {
        public model: FightModel;
        constructor(model: FightModel) {
            this.model = model;
        }
        addTank(vo: TankVo) {
            vo.apTank = 50;
            vo.apCell = 220;
            vo.hp = vo.hpMax = 200;
            vo.yOld = vo.y;
            vo.stateA = FightVoStateA.Living;
            vo.stateLivingFrame = 0;
            //-
            vo.moveSpeedPerFrame = FightModelConfig.si.tankMoveSpeedPerFrame;
            vo.sizeHalf = new Vector2(FightModelConfig.si.cellSize, FightModelConfig.si.cellSize);
            vo.hitRect = new FightHitRect(vo);
            vo.hitRect.recountPivotCenter(vo.x, vo.y, vo.sizeHalf.x, vo.sizeHalf.y);
            vo.forecastMoveHitRect = new FightHitRect(vo);
            //-
            let skillVo = new SkillVo();
            skillVo.sid = StcSkillSid.DefaultOne;
            skillVo.castGapFrame = FightModelConfig.si.modelFrameRate / 2;
            vo.skillDic[skillVo.sid] = skillVo;
            //-
            this.model.tankDic[vo.uid] = vo;
            if (this.model.groupTankCount[vo.group] == undefined) {
                this.model.groupTankCount[vo.group] = 0;
            }
            this.model.groupTankCount[vo.group]++;
            //-
            this.model.hitMgrTank.insert(vo.hitRect);
            this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.AddTank, this.model.currFrame, vo.uid));
        }
        rebirthTank(vo: TankVo) {
            vo.hp = vo.hpMax;
            vo.stateLivingFrame = 0;
            vo.moveDir = Direction4.None;
            vo.x = FightModelUtil.gridToPos(this.model.stcMapVo.positionMap[vo.initPositionSid].col);
            vo.y = FightModelUtil.gridToPos(this.model.stcMapVo.positionMap[vo.initPositionSid].row);
            vo.dir = this.model.stcMapVo.positionMap[vo.initPositionSid].dir;
            vo.xOld = vo.x;
            vo.yOld = vo.y;
            vo.hitRect.recountPivotCenter(vo.x, vo.y, vo.sizeHalf.x, vo.sizeHalf.y);
            //
            this.model.buffer.addBuff(vo, StcBuffSid.Invincible, FightModelConfig.si.rebirthInvincibleFrame);
            //
            this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.RebirthTank, this.model.currFrame, vo.uid));
        }
        addBullet(vo: BulletVo) {
            vo.xOld = vo.x;
            vo.yOld = vo.y;
            vo.moveSpeedPerFrame = FightModelConfig.si.bulletMoveSpeedPerFrame;
            vo.sizeHalf = new Vector2(10, 20);
            vo.hitRect = new FightHitRect(vo);
            vo.hitRect.recountPivotCenter(vo.x, vo.y, vo.sizeHalf.x, vo.sizeHalf.y);
            vo.stateA = FightVoStateA.Living;
            this.model.bulletDic[vo.uid] = vo;
            this.model.hitMgrBullet.insert(vo.hitRect);
            this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.AddBullet, this.model.currFrame, vo.ownerUid, vo.uid));
        }
        /*cell's pivot is left-top*/
        addCell(vo: CellVo) {
            vo.hp = vo.hpMax = FightModelConfig.si.cellHpMax;
            this.model.cellDic[vo.uid] = vo;
            if (vo.sid != StcCellSid.floor && vo.sid != StcCellSid.cover) {
                vo.hitRect = new FightHitRect(vo);
                vo.hitRect.recountLeftTop(vo.x, vo.y, FightModelConfig.si.cellSize, FightModelConfig.si.cellSize);
                this.model.hitMgrCell.insert(vo.hitRect);
            }
        }
        /**清理cell编程普通地板 */
        clearCell(cell: CellVo) {
            cell.hp = 0;
            cell.sid = StcCellSid.floor;
            if (cell.hitRect) {
                QuadTree.removeItem(cell.hitRect);
            }
            cell.disposeHitRect();
        }
        removeBullet(vo: BulletVo) {
            vo.stateA = FightVoStateA.Dump;
            QuadTree.removeItem(vo.hitRect);
            this.model.dumpBulletDic[vo.uid] = vo; //don't remove, wait after ctrl used
            delete this.model.bulletDic[vo.uid];
            this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.RemoveBullet, this.model.currFrame, vo.ownerUid, vo.uid));
        }
        removeTank(vo: TankVo) {
            vo.stateA = FightVoStateA.Dump;
            QuadTree.removeItem(vo.hitRect);
            this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.RemoveTank, this.model.currFrame, vo.uid, vo.uid));
            //
            this.model.dumpTankDic[vo.uid] = vo;
            delete this.model.tankDic[vo.uid];
            this.model.groupTankCount[vo.group]--;
            //
            if (this.model.aiTankDic[vo.uid]) {
                this.model.aiTankDic[vo.uid].dispose();
                delete this.model.aiTankDic[vo.uid];
            }
        }
        addGather(kind: StcGatherKind, xFrom: number, yFrom: number) {
            let vo: GatherVo = new GatherVo();
            vo.kind = kind//TODO:
            vo.sizeHalf = new Vector2(FightModelConfig.si.cellSizeHalf);
            //以为中心计算 计算一个随机位置
            vo.x = this.model.validateX(xFrom+vo.sizeHalf.x*MathUtil.randomInt(-5,5),vo.sizeHalf.x);
            vo.y = this.model.validateY(yFrom+vo.sizeHalf.y*MathUtil.randomInt(-5,5),vo.sizeHalf.y);
            //
            vo.xOld = vo.x;
            vo.yOld = vo.y;
            vo.hitRect = new FightHitRect(vo);
            vo.hitRect.recountPivotCenter(vo.x, vo.y, vo.sizeHalf.x, vo.sizeHalf.y);
            //
            this.model.hitMgrGather.insert(vo.hitRect);
            this.model.gatherDic[vo.uid] = vo
            this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.AddGather, this.model.currFrame, vo.uid));
        }
        removeGather(vo: GatherVo) {
            //
            QuadTree.removeItem(vo.hitRect);
            this.model.dumpGatherDic[vo.uid] = vo;
            delete this.model.gatherDic[vo.uid];
            this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.RemoveGather, this.model.currFrame, vo.uid));
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
            for (const uid in this.model.dumpGatherDic) {
                this.model.dumpGatherDic[uid].dispose();
                delete this.model.dumpGatherDic[uid];
            }
        }
    }

}