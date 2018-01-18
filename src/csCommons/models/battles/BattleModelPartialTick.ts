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
            this.owner.currFrame++;
            this.tick_frameInput();
            this.tick_bulletHitTest();//先计算hit,因为被hit后的物品是不能在做后面动作了
            this.tick_generate();
            //move放最后,因为需要view在这一帧移动到xy,然后下一帧再处理hit等事项
            this.tick_tank_move();
            this.tick_skill();
            this.tick_bullet_move();
        }
        public tick_frameInput() {
            for (let i = 0; i < this.owner.frameInputs.length; i++) {
                let item = this.owner.frameInputs[i];
                switch (item.kind) {
                    case BattleFrameIOKind.MoveDirChange:
                        this.owner.tanks[item.uid].moveDir = <Direction4>item.data0;
                        break;
                    case BattleFrameIOKind.SkillTrigger:
                        this.owner.tanks[item.uid].skillMap[<number>item.data0].isTrigger = true;
                        break;
                        case BattleFrameIOKind.SkillUntrigger:
                        this.owner.tanks[item.uid].skillMap[<number>item.data0].isTrigger = false;
                        break;
                }
            }
        }
        public tick_generate() {
        }
        public tick_skill() {
            for (const uid in this.owner.tanks) {
                const tank = this.owner.tanks[uid];
                for(const skillSid in tank.skillMap){
                    let skillVo = tank.skillMap[skillSid];
                    if (skillVo.isTrigger && (this.owner.currFrame-skillVo.castFrame)>skillVo.castGapFrame) {
                        skillVo.castFrame = this.owner.currFrame;
                        var bullet: BulletVo = new BulletVo();
                        bullet.ownerUid = tank.uid;
                        bullet.sid = skillVo.sid;//TODO:
                        bullet.uid = tank.uid * 1000 + tank.bulletUid;
                        tank.bulletUid++;
                        if(tank.bulletUid>1000){
                            tank.bulletUid=1;
                        }
                        bullet.x = tank.x;
                        bullet.y = tank.y;
                        bullet.moveDir = tank.dir;
                        this.owner.partialAdd.addBulletVo(bullet);
                    }
                }
            }
        }
        public tick_bulletHitTest() {
        }
        /**
         * onFrame_move
         */
        public tick_tank_move() {
            for (const uid in this.owner.tanks) {
                const vo = this.owner.tanks[uid];
                if (vo.moveDir != Direction4.None) {
                    vo.dir = vo.moveDir;
                    switch (vo.moveDir) {
                        case Direction4.Left:
                            vo.x += vo.moveSpeedPerFrame;
                            this.owner.validateTankX(vo);
                            this.owner.tankAlignGridY(vo);
                            break;
                        case Direction4.Right:
                            vo.x -= vo.moveSpeedPerFrame;
                            this.owner.validateTankX(vo);
                            this.owner.tankAlignGridY(vo);
                            break;
                        case Direction4.Up:
                            this.owner.tankAlignGridX(vo);
                            vo.y -= vo.moveSpeedPerFrame;
                            this.owner.validateTankY(vo);
                            break;
                        case Direction4.Down:
                            this.owner.tankAlignGridX(vo);
                            vo.y += vo.moveSpeedPerFrame;
                            this.owner.validateTankY(vo);
                            break;
                    }
                }
            }
        }
        public tick_bullet_move() {
            for (const uid in this.owner.bullets) {
                const vo = this.owner.bullets[uid];
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
                }
            }
        }
    }
}