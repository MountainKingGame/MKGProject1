namespace models.battles {
    export class BattleModelPartialTick {
        public owner: BattleModel;
        constructor(owner: BattleModel) {
            this.owner = owner;
        }
        /**
         * onFrame
         */
        public tick() {
            let t0 = SUtil.getTime();
            this.tick_frameInput();
            this.tick_ai();
            let t1 = SUtil.getTime();
            this.tick_bulletHitTest();//先计算hit,因为被hit后的物品是不能在做后面动作了
            let t2 = SUtil.getTime();
            this.tick_generate();
            //move放最后,因为需要view在这一帧移动到xy,然后下一帧再处理hit等事项
            this.tick_tank_move();
            this.tick_skill();
            this.tick_bullet_move();
            let te = SUtil.getTime();
            console.log(te - t0, t2 - t1, t1 - t0);
        }
        public tick_frameInput() {
            for (let i = 0; i < this.owner.frameInputs.length; i++) {
                let item = this.owner.frameInputs[i];
                switch (item.kind) {
                    case BattleFrameInputKind.MoveDirChange:
                        this.owner.tankMap[item.uid].moveDir = <Direction4>item.data0;
                        break;
                    case BattleFrameInputKind.SkillTrigger:
                        this.owner.tankMap[item.uid].skillMap[<number>item.data0].isTriggering = true;
                        this.owner.tankMap[item.uid].skillMap[<number>item.data0].isTriggerOnce = false;
                        break;
                    case BattleFrameInputKind.SkillUntrigger:
                        this.owner.tankMap[item.uid].skillMap[<number>item.data0].isTriggering = false;
                        this.owner.tankMap[item.uid].skillMap[<number>item.data0].isTriggerOnce = false;
                        break;
                    case BattleFrameInputKind.SkillTriggerOnce:
                        this.owner.tankMap[item.uid].skillMap[<number>item.data0].isTriggerOnce = true;
                        this.owner.tankMap[item.uid].skillMap[<number>item.data0].isTriggering = false;
                        break;
                }
            }
        }
        public tick_ai() {
            for (const uid in this.owner.aiTankMap) {
                const ai:TankAI = this.owner.aiTankMap[uid];
                ai.tick();
            }
        }
        public tick_generate() {
        }
        public tick_skill() {
            for (const uid in this.owner.tankMap) {
                const tank = this.owner.tankMap[uid];
                for (const skillSid in tank.skillMap) {
                    let skillVo = tank.skillMap[skillSid];
                    if ((skillVo.isTriggering || skillVo.isTriggerOnce) && (this.owner.currFrame - skillVo.castFrame) > skillVo.castGapFrame) {
                        skillVo.castFrame = this.owner.currFrame;
                        var bullet: BulletVo = new BulletVo();
                        bullet.ownerUid = tank.uid;
                        bullet.sid = skillVo.sid;//TODO:
                        bullet.uid = tank.uid * 1000 + tank.bulletUid;
                        tank.bulletUid++;
                        if (tank.bulletUid > 1000) {
                            tank.bulletUid = 1;
                        }
                        bullet.x = tank.x;
                        bullet.y = tank.y;
                        bullet.moveDir = tank.dir;
                        this.owner.adder.addBulletVo(bullet);
                    }
                    skillVo.isTriggerOnce = false;
                }
            }
        }
        public tick_bulletHitTest() {
            this.owner.qtCell.refresh();
            this.owner.qtBullet.refresh();
            this.owner.qtTank.refresh();
            for (const uid in this.owner.bulletMap) {
                let vo: BulletVo = this.owner.bulletMap[uid];
                if (QuadTree.isInner(vo.hitRect, this.owner.qtBullet.rect) == false) {
                    this.owner.adder.removeBullet(vo);
                } else {
                    if (vo.stateA == BattleVoStateA.Living) {
                        this.checkBulletHitTest(vo);
                        if (this.owner.bulletMap[uid].stateA == BattleVoStateA.Dump) {
                            this.owner.adder.removeBullet(vo);
                        }
                    }
                }
            }
        }
        checkBulletHitTest(vo: BulletVo) {
            console.log("[info]", vo.uid, "`vo.uid` checkBulletHitTest");
            let hitArr: IQuadTreeItem[] = this.owner.qtBullet.retrieve(vo.hitRect);
            for (let i = 0; i < hitArr.length; i++) {
                let item = hitArr[i];
                //if (vo.uid != ((<QuadTreeHitRect>item).owner as BulletVo).uid) {
                if (vo.ownerUid != ((<QuadTreeHitRect>item).owner as BulletVo).ownerUid) {
                    if (BattleModelUtil.checkHit(vo.hitRect, item)) {
                        this.owner.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.BulletHitBullet, this.owner.currFrame, vo.ownerUid, vo.uid, (<QuadTreeHitRect>item).owner.uid));
                        vo.stateA = BattleVoStateA.Dump;
                        break;//TODO:only hit one bullet
                    }
                }
            }
            if (vo.stateA == BattleVoStateA.Dump) {
                return;
            }
            hitArr = this.owner.qtCell.retrieve(vo.hitRect);
            for (let i = 0; i < hitArr.length; i++) {
                let item = hitArr[i];
                if ((<QuadTreeHitRect>item).owner.sid > 0) {
                    if (BattleModelUtil.checkHit(vo.hitRect, item)) {
                        // console.log("[debug]","hit:",vo.hitRect,item,(<QuadTreeHitRect>item).owner.uid);
                        ((<QuadTreeHitRect>item).owner as CellVo).sid = 0;
                        QuadTree.removeItem(item);
                        this.owner.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.BulletHitCell, this.owner.currFrame, vo.ownerUid, vo.uid, (<QuadTreeHitRect>item).owner.uid));
                        ((<QuadTreeHitRect>item).owner as CellVo).disposeHitRect();
                        vo.stateA = BattleVoStateA.Dump;
                    }
                }
            }
            if (vo.stateA == BattleVoStateA.Dump) {
                return;
            }
            hitArr = this.owner.qtTank.retrieve(vo.hitRect);
            for (let i = 0; i < hitArr.length; i++) {
                let item = hitArr[i];
                if (vo.ownerUid != (<QuadTreeHitRect>item).owner.uid) {
                    if (BattleModelUtil.checkHit(vo.hitRect, item)) {
                        this.owner.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.BulletHitTank, this.owner.currFrame, vo.ownerUid, vo.uid, (<QuadTreeHitRect>item).owner.uid));
                        vo.stateA = BattleVoStateA.Dump;
                        break;//TODO:only hit one tank
                    }
                }
            }
        }
        checkTankHitTest(vo: TankVo): IQuadTreeItem {
            let hitArr: IQuadTreeItem[] = this.owner.qtCell.retrieve(vo.forecastMoveHitRect);
            for (let i = 0; i < hitArr.length; i++) {
                let item = hitArr[i];
                if ((<QuadTreeHitRect>item).owner.sid > 0) {
                    if (BattleModelUtil.checkHit(vo.forecastMoveHitRect, item) && BattleModelUtil.checkHit(vo.hitRect, item) == false) {
                        return item;
                    }
                }
            }
            hitArr = this.owner.qtTank.retrieve(vo.forecastMoveHitRect);
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
            for (const uid in this.owner.tankMap) {
                const vo = this.owner.tankMap[uid];
                if (vo.moveDir != Direction4.None) {
                    vo.dir = vo.moveDir;
                    switch (vo.moveDir) {
                        case Direction4.Left:
                            this.owner.tankAlignGridY(vo);
                            vo.xOld = vo.x;
                            vo.yOld = vo.y;
                            vo.x += vo.moveSpeedPerFrame;
                            this.owner.validateTankX(vo);
                            break;
                        case Direction4.Right:
                            this.owner.tankAlignGridY(vo);
                            vo.xOld = vo.x;
                            vo.yOld = vo.y;
                            vo.x -= vo.moveSpeedPerFrame;
                            this.owner.validateTankX(vo);
                            break;
                        case Direction4.Up:
                            this.owner.tankAlignGridX(vo);
                            vo.xOld = vo.x;
                            vo.yOld = vo.y;
                            vo.y -= vo.moveSpeedPerFrame;
                            this.owner.validateTankY(vo);
                            break;
                        case Direction4.Down:
                            this.owner.tankAlignGridX(vo);
                            vo.xOld = vo.x;
                            vo.yOld = vo.y;
                            vo.y += vo.moveSpeedPerFrame;
                            this.owner.validateTankY(vo);
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
            for (const uid in this.owner.bulletMap) {
                if (this.owner.bulletMap[uid].stateA == BattleVoStateA.Living) {
                    const vo = this.owner.bulletMap[uid];
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