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
            this.tick_fire();//开火
            //move放最后,因为需要view在这一帧移动到xy,然后下一帧再处理hit等事项
            this.tick_tank_move();
        }
        public tick_frameInput() {
            for (let i = 0; i < this.owner.frameInputs.length; i++) {
                let item = this.owner.frameInputs[i];
                switch (item.kind) {
                    case BattleFrameIOKind.MoveDirChange:
                        this.owner.tanks[item.playerId].moveDir = <Direction4>item.data0;
                        break;
                }
            }
        }
        public tick_generate() {
        }
        public tick_fire() {
        }
        public tick_bulletHitTest() {
        }
        /**
         * onFrame_move
         */
        public tick_tank_move() {
            for (const uid in this.owner.tanks) {
                const tank = this.owner.tanks[uid];
                if (tank.moveDir != Direction4.None) {
                    switch (tank.moveDir) {
                        case Direction4.Left:
                            tank.x += tank.moveSpeedPerFrame;
                            this.owner.validateTankX(tank);
                            this.owner.tankAlignGridY(tank);
                            break;
                        case Direction4.Right:
                            tank.x -= tank.moveSpeedPerFrame;
                            this.owner.validateTankX(tank);
                            this.owner.tankAlignGridY(tank);
                            break;
                        case Direction4.Up:
                            this.owner.tankAlignGridX(tank);
                            tank.y -= tank.moveSpeedPerFrame;
                            this.owner.validateTankY(tank);
                            break;
                        case Direction4.Down:
                            this.owner.tankAlignGridX(tank);
                            tank.y += tank.moveSpeedPerFrame;
                            this.owner.validateTankY(tank);
                            break;
                    }
                    tank.dir = tank.moveDir;
                }
            }
        }
    }
}