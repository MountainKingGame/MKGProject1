namespace models.battles {
    export class TankAI implements IDispose {
        owner: TankVo;
        init() {
        }
        gapBulletNeed:number = 60;
        gapBulletCount:number = 0;
        gapMoveNeed: number = 10;
        gapMoveCount: number = 0;
        /** be called only when key frame */
        tick() {
            if (this.owner.moveDir != Direction4.None) {
                if (this.owner.x == this.owner.xOld && this.owner.y == this.owner.yOld) {
                    this.gapMoveCount++;
                    if (this.gapMoveCount >= this.gapMoveNeed) {
                        this.gapMoveCount = 0;
                        this.doMoveDir();
                    }
                } else {
                    this.moveDirHistory = [];
                    this.gapMoveCount = 0;
                }
            }
            //---bullet
            this.gapBulletCount++;
            if(this.gapBulletCount>=this.gapBulletNeed){
                this.gapBulletCount = 0;
                this.doBullet();
            }
        }
        moveDirHistory: Direction4[] = [];
        doMoveDir() {
            let newDir: Direction4;
            do {
                newDir = MathUtil.randomInt(Direction4.Left, Direction4.Up) as Direction4;
            } while (this.owner.moveDir == newDir);
            this.owner.moveDir = newDir;
            /* if (this.lastMoveDir == Direction4.Up) {
                this.owner.moveDir = Direction4.Down;
            } else if (this.lastMoveDir == Direction4.Left) {
                this.owner.moveDir = Direction4.Right;
            } else if (this.lastMoveDir == Direction4.Right) {
                this.owner.moveDir = Direction4.Left;
            } else if (this.lastMoveDir == Direction4.Down) {
                this.owner.moveDir = Direction4.Up;
            } else {
                if (CommonHelper.isHorizontalDirection4(this.owner.moveDir)) {
                    if (this.lastMoveDir == Direction4.None) {
                        this.owner.moveDir = Math.random() > 0.5 ? Direction4.Up : Direction4.Down;
                    }
                    this.lastMoveDir = this.owner.moveDir
                } else {
                    if (this.lastMoveDir == Direction4.None) {
                        this.owner.moveDir = Math.random() > 0.5 ? Direction4.Left : Direction4.Right;
                    }
                    this.lastMoveDir = this.owner.moveDir
                }
            } */
        }
        doBullet(){
            if(this.owner.skillMap[StcSkillSid.DefaultOne].isTriggering == false){
                this.owner.skillMap[StcSkillSid.DefaultOne].isTriggerOnce = true;
            }
        }
        public dispose() {
            this.owner = null;
        }
    }
}