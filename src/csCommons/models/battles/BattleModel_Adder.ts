namespace models.battles {
    /**
     * 为BattleModel添加新物品的方法集合
     */
    export class BattleModel_Adder {
        public owner: BattleModel;
        constructor(owner: BattleModel) {
            this.owner = owner;
        }
        addTankByIStcMapVoPlayer(player: IStcMapVoPlayer,needAI:boolean):TankVo {
            let vo: TankVo = new TankVo();
            vo.sid = 1;
            vo.uid = this.owner.tankUId++;
            // vo.col = player.init.col;
            // vo.row = player.init.row;
            vo.x = BattleModelUtil.gridToPos(player.init.col);
            vo.y = BattleModelUtil.gridToPos(player.init.row);
            this.addTankVo(vo);
            //---ai
            if(needAI){
                vo.moveDir = Direction4.Up;
                let ai:TankAI = new TankAI();
                ai.owner = vo;
                this.owner.aiTankMap[vo.uid] = ai;
            }
            return vo;
        }
        addTankVo(vo: TankVo) {
            // if (this.owner.tanks[vo.uid] != undefined) {
            // console.log("[fatal]", "tankVo.id is exist!", vo);
            // } else {
            vo.moveSpeedPerFrame = BattleModelConfig.si.tankMoveSpeedPerFrame;
            vo.hitRect = new QuadTreeHitRect(vo);
            vo.sizeHalf = new Vector2(BattleModelConfig.si.cellSize,BattleModelConfig.si.cellSize);
            vo.hitRect.recountPivotCenter(vo.x, vo.y,vo.sizeHalf.x,vo.sizeHalf.y);
            vo.forecastMoveHitRect = new QuadTreeHitRect(vo);
            // }
            let skillVo = new SkillVo();
            skillVo.sid = 1;
            skillVo.castGapFrame = BattleModelConfig.si.modelFrameRate / 2;
            vo.skillMap[skillVo.sid] = skillVo;
            vo.stateA = BattleVoStateA.Living;
            this.owner.tankMap[vo.uid] = vo;
            this.owner.qtTank.insert(vo.hitRect);
            this.owner.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.AddTank, this.owner.currFrame,vo.uid,vo.uid));
        }
        addBulletVo(vo: BulletVo) {
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
            if (vo.sid > 0) {//0 is normal earth
                vo.hitRect = new QuadTreeHitRect(vo);
                vo.hitRect.recountLeftTop(vo.x, vo.y, BattleModelConfig.si.cellSize, BattleModelConfig.si.cellSize);
                this.owner.qtCell.insert(vo.hitRect);
            }
        }
        removeBullet(vo: BulletVo) {
            QuadTree.removeItem(vo.hitRect);
            this.owner.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.RemoveBullet, this.owner.currFrame, vo.ownerUid, vo.uid));
            //don't remove, wait after ctrl used
            this.owner.dumpBulletMap[vo.uid] = vo;
            delete this.owner.bulletMap[vo.uid];
        }
        removeTank(vo:TankVo){
            QuadTree.removeItem(vo.hitRect);
            vo.stateA = BattleVoStateA.Dump;
            this.owner.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.RemoveTank, this.owner.currFrame, vo.uid, vo.uid));
            this.owner.dumpTankMap[vo.uid] = vo;
            delete this.owner.tankMap[vo.uid];
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