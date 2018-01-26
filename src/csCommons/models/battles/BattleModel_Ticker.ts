namespace models.battles {
    export class BattleModel_Ticker {
        public model: BattleModel;
        constructor(model: BattleModel) {
            this.model = model;
        }
        /**
         * onFrame
         */
        public tick() {
            let t0 = SUtil.now();
            this.tick_frameInput();
            this.tick_factories();
            this.tick_ai();
            this.model.buffer.tick();
            let t1 = SUtil.now();
            this.tick_bulletHit();//先计算hit,因为被hit后的物品是不能在做后面动作了
            let t2 = SUtil.now();
            this.tick_generate();
            //move放最后,因为需要view在这一帧移动到xy,然后下一帧再处理hit等事项
            this.tick_tank_move();
            this.tick_skill();
            this.tick_bullet_move();
            let te = SUtil.now();
            // console.log(te - t0, t2 - t1, t1 - t0);
        }
        public tick_frameInput() {
            for (let i = 0; i < this.model.frameInputs.length; i++) {
                let item = this.model.frameInputs[i];
                switch (item.kind) {
                    case BattleFrameInputKind.MoveDirChange:
                        this.model.tankMap[item.uid].moveDir = <Direction4>item.data0;
                        break;
                    case BattleFrameInputKind.SkillTrigger:
                        this.model.tankMap[item.uid].skillMap[<number>item.data0].isTriggering = true;
                        this.model.tankMap[item.uid].skillMap[<number>item.data0].isTriggerOnce = false;
                        break;
                    case BattleFrameInputKind.SkillUntrigger:
                        this.model.tankMap[item.uid].skillMap[<number>item.data0].isTriggering = false;
                        this.model.tankMap[item.uid].skillMap[<number>item.data0].isTriggerOnce = false;
                        break;
                    case BattleFrameInputKind.SkillTriggerOnce:
                        this.model.tankMap[item.uid].skillMap[<number>item.data0].isTriggerOnce = true;
                        this.model.tankMap[item.uid].skillMap[<number>item.data0].isTriggering = false;
                        break;
                }
            }
        }
        tick_factories() {
            if (this.model.isKeyFrame) {
                for (let i = 0; i < this.model.factories.length; i++) {
                    let item = this.model.factories[i];
                    if (item.tick()) {
                        this.model.factories.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        public tick_ai() {
            for (const uid in this.model.aiTankMap) {
                const ai: TankAI = this.model.aiTankMap[uid];
                ai.tick();
            }
        }
        public tick_generate() {
        }
        public tick_skill() {
            for (const uid in this.model.tankMap) {
                const tank = this.model.tankMap[uid];
                for (const skillSid in tank.skillMap) {
                    let skillVo = tank.skillMap[skillSid];
                    if ((skillVo.isTriggering || skillVo.isTriggerOnce) && (this.model.currFrame - skillVo.castFrame) > skillVo.castGapFrame) {
                        skillVo.castFrame = this.model.currFrame;
                        var bullet: BulletVo = new BulletVo();
                        bullet.ownerUid = tank.uid;
                        bullet.group = tank.group;
                        bullet.apTank = bullet.apTankMax = tank.apTank;
                        bullet.apCell = tank.apCell;
                        bullet.sid = skillVo.sid;//TODO:
                        bullet.uid = tank.uid * 1000 + tank.bulletUid;
                        tank.bulletUid++;
                        if (tank.bulletUid > 1000) {
                            tank.bulletUid = 1;
                        }
                        bullet.x = tank.x;
                        bullet.y = tank.y;
                        bullet.moveDir = tank.dir;
                        this.model.adder.addBulletVo(bullet);
                    }
                    skillVo.isTriggerOnce = false;
                }
            }
        }
        public tick_bulletHit() {
            this.model.qtCell.refresh();
            this.model.qtBullet.refresh();
            this.model.qtTank.refresh();
            for (const uid in this.model.bulletMap) {
                let vo: BulletVo = this.model.bulletMap[uid];
                if (vo.stateA == BattleVoStateA.Living) {//可能被其它bullet击中了
                    if (QuadTree.isInner(vo.hitRect, this.model.qtBullet.rect) == false) {
                        this.model.adder.removeBullet(vo);
                    } else {
                        this.checkBulletHit(vo);
                    }
                }
            }
        }
        checkBulletHit(bullet: BulletVo) {
            let bulletDump: boolean = false;
            // console.log("[info]", vo.uid, "`vo.uid` checkBulletHitTest");
            let hitArr: IQuadTreeItem[] = this.model.qtBullet.retrieve(bullet.hitRect);
            for (let i = 0; i < hitArr.length; i++) {
                let item = hitArr[i];
                let hitBullet: BulletVo = (<QuadTreeHitRect>item).owner as BulletVo;
                if (bullet.group != hitBullet.group) {
                    if (BattleModelUtil.checkHit(bullet.hitRect, item)) {
                        this.model.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.BulletHitBullet, this.model.currFrame,bullet.ownerUid,bullet.uid, hitBullet.uid));
                        let oldApTank = bullet.apTank;
                        bullet.apTank -= hitBullet.apTank;
                        hitBullet.apTank -= oldApTank;
                        if (hitBullet.apTank <= 0) {
                            hitBullet.apTank = 0;
                            this.model.adder.removeBullet(hitBullet);
                        }
                        if (bullet.apTank <= 0) {
                            bullet.apTank = 0;
                            bulletDump = true;
                            break;
                        }
                    }
                }
            }
            //---next
            if (bulletDump) {
                this.model.adder.removeBullet(bullet);
            } else {
                this.checkBulletHitCell(bullet);
            }
        }
        checkBulletHitCell(bullet:BulletVo) {
            let bulletDump: boolean = false;
            let hitArr = this.model.qtCell.retrieve(bullet.hitRect);
            for (let i = 0; i < hitArr.length; i++) {
                let item = hitArr[i];
                let cellVo = ((<QuadTreeHitRect>item).owner as CellVo);
                if (cellVo.sid != StcCellSid.floor && cellVo.sid != StcCellSid.river) {
                    if (BattleModelUtil.checkHit(bullet.hitRect, item)) {
                        // console.log("[debug]","hit:",vo.hitRect,item,(<QuadTreeHitRect>item).owner.uid);
                        if (cellVo.sid != StcCellSid.block) {
                            let apCellLv:CellLv = <CellLv>(Math.floor(bullet.apCell/BattleModelConfig.si.cellHpMax));
                            if(apCellLv>=cellVo.cellLv){
                                cellVo.hp -= bullet.apCell%BattleModelConfig.si.cellHpMax;
                                if (cellVo.hp <= 0) {
                                    cellVo.hp = 0;
                                    cellVo.sid = StcCellSid.floor;
                                    QuadTree.removeItem(item);
                                    cellVo.disposeHitRect();
                                }
                            }
                        }
                        this.model.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.BulletHitCell, this.model.currFrame, bullet.ownerUid, bullet.uid, cellVo.uid));
                        bulletDump = true;//不需要break, 因为可以hit多个cell,但只要击中一个就要dump
                    }
                }
            }
            //---next
            if (bulletDump) {
                this.model.adder.removeBullet(bullet);
            } else {
                this.checkBulletHitTank(bullet);
            }
        }
        checkBulletHitTank(bullet: BulletVo) {
            let bulletDump: boolean = false;
            let hitArr = this.model.qtTank.retrieve(bullet.hitRect);
            for (let i = 0; i < hitArr.length; i++) {
                let item = hitArr[i];
                let hitTank: TankVo = (<QuadTreeHitRect>item).owner as TankVo;
                let canHit: boolean = false;
                if (hitTank.stateA == BattleVoStateA.Living) {
                    if (bullet.ownerUid != hitTank.uid) {
                        if (bullet.group == hitTank.group) {
                            //TODO: 
                            /* if(attackTank.group==BattleGroup.Player){
                                canHit = true;
                            } */
                        } else {
                            canHit = true;
                        }
                    }
                }
                if (canHit) {
                    if (BattleModelUtil.checkHit(bullet.hitRect, item)) {
                        this.model.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.BulletHitTank, this.model.currFrame, bullet.ownerUid, bullet.uid, hitTank.uid));
                        if (hitTank.effectMap[StcEffectSid.Invincible]) {
                            //do nothing, only remove bullet
                        } else {
                            if (hitTank.group == BattleGroup.CPU) {
                                hitTank.hp -= bullet.apTankMax;
                                if (hitTank.hp <= 0) {
                                    hitTank.hp = 0;
                                    this.model.adder.removeTank(hitTank);
                                }
                            } else if (hitTank.group == BattleGroup.Player) {
                                if (bullet.group == BattleGroup.CPU) {
                                    hitTank.hp -= bullet.apTankMax;
                                    if (hitTank.hp <= 0) {
                                        hitTank.hp = 0;
                                        this.model.adder.rebirthTank(hitTank);
                                    }
                                } else if (bullet.group == BattleGroup.Player) {
                                    // this.owner.adder.addBuff(attackTank,)//TODO: add freeze/palsy
                                } else {
                                    throw new Error("");
                                }
                            } else {
                                throw new Error("");
                            }
                        }
                        //-
                        bulletDump = true;
                        break;//TODO:only hit one tank
                    }
                }
            }
            if (bulletDump) {
                this.model.adder.removeBullet(bullet);
            }
        }
        checkTankHitTest(vo: TankVo): IQuadTreeItem {
            let hitArr: IQuadTreeItem[] = this.model.qtCell.retrieve(vo.forecastMoveHitRect);
            for (let i = 0; i < hitArr.length; i++) {
                let item = hitArr[i];
                if ((<QuadTreeHitRect>item).owner.sid > 0) {
                    if (BattleModelUtil.checkHit(vo.forecastMoveHitRect, item) && BattleModelUtil.checkHit(vo.hitRect, item) == false) {
                        return item;
                    }
                }
            }
            hitArr = this.model.qtTank.retrieve(vo.forecastMoveHitRect);
            for (let i = 0; i < hitArr.length; i++) {
                let item = hitArr[i];
                if (vo.uid != (<QuadTreeHitRect>item).owner.uid) {
                    if (BattleModelUtil.checkHit(vo.forecastMoveHitRect, item) && BattleModelUtil.checkHit(vo.hitRect, item) == false) {
                        return item;
                    }
                }
            }
            return null;
        }
        /**
         * onFrame_move
         */
        public tick_tank_move() {
            for (const uid in this.model.tankMap) {
                const vo = this.model.tankMap[uid];
                if (vo.moveDir != Direction4.None) {
                    vo.dir = vo.moveDir;
                    switch (vo.moveDir) {
                        case Direction4.Left:
                            this.model.tankAlignGridY(vo);
                            vo.xOld = vo.x;
                            vo.yOld = vo.y;
                            vo.x += vo.moveSpeedPerFrame;
                            this.model.validateTankX(vo);
                            break;
                        case Direction4.Right:
                            this.model.tankAlignGridY(vo);
                            vo.xOld = vo.x;
                            vo.yOld = vo.y;
                            vo.x -= vo.moveSpeedPerFrame;
                            this.model.validateTankX(vo);
                            break;
                        case Direction4.Up:
                            this.model.tankAlignGridX(vo);
                            vo.xOld = vo.x;
                            vo.yOld = vo.y;
                            vo.y -= vo.moveSpeedPerFrame;
                            this.model.validateTankY(vo);
                            break;
                        case Direction4.Down:
                            this.model.tankAlignGridX(vo);
                            vo.xOld = vo.x;
                            vo.yOld = vo.y;
                            vo.y += vo.moveSpeedPerFrame;
                            this.model.validateTankY(vo);
                            break;
                    }
                    if (vo.x != vo.xOld || vo.y != vo.yOld) {
                        //--check hit other, resolve can move
                        // let newRect:QuadTreeHitRect = new QuadTreeHitRect();
                        vo.forecastMoveHitRect.recountPivotCenter(vo.x, vo.y, vo.sizeHalf.x, vo.sizeHalf.y);
                        let hitItem: IQuadTreeItem = this.checkTankHitTest(vo);
                        //--
                        if (hitItem != null) {
                            //restore
                            vo.x = vo.xOld;
                            vo.y = vo.yOld;
                        } else {
                            vo.hitRect.recountPivotCenter(vo.x, vo.y, vo.sizeHalf.x, vo.sizeHalf.y);
                        }
                    }
                }
            }
        }
        public tick_bullet_move() {
            for (const uid in this.model.bulletMap) {
                if (this.model.bulletMap[uid].stateA == BattleVoStateA.Living) {
                    const vo = this.model.bulletMap[uid];
                    if (vo.moveDir != Direction4.None) {
                        vo.dir = vo.moveDir;
                        switch (vo.moveDir) {
                            case Direction4.Left:
                                vo.x += vo.moveSpeedPerFrame;
                                break;
                            case Direction4.Right:
                                vo.x -= vo.moveSpeedPerFrame;
                                break;
                            case Direction4.Up:
                                vo.y -= vo.moveSpeedPerFrame;
                                break;
                            case Direction4.Down:
                                vo.y += vo.moveSpeedPerFrame;
                                break;
                        }
                        vo.hitRect.recountPivotCenter(vo.x, vo.y, vo.sizeHalf.x, vo.sizeHalf.y);
                    }
                }
            }
        }
    }
}