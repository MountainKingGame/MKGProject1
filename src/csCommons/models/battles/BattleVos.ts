namespace models.battles {
    export class EleVo implements IDispose {
        public uid: number;
        public sid: number;
        public dispose(): void {
        }
    }
    export class QuadTreeHitRect implements IQuadTreeItem, IDispose {
        ownerQuadTree: QuadTree;
        preItem: IQuadTreeItem;
        nextItem: IQuadTreeItem;
        //
        owner: EntityVo;
        //
        isDirty: boolean;
        x: number;
        y: number;
        right: number;
        bottom: number;
        constructor(owner: EntityVo) {
            this.owner = owner;
        }
        recountLeftTop(xCenter: number, yCenter: number, w: number, h: number) {
            this.x = xCenter;
            this.y = yCenter;
            this.right = this.x + w;
            this.bottom = this.y + h;
        }
        recountPivotCenter(xCenter: number, yCenter: number, wHalf: number, hHalf: number) {
            this.x = xCenter - wHalf;
            this.y = yCenter - hHalf;
            this.right = xCenter + wHalf;
            this.bottom = yCenter + hHalf;
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.right = Math.round(this.right);
            this.bottom = Math.round(this.bottom);
            this.isDirty = true;
        }
        dispose() {
            this.ownerQuadTree = this.preItem = this.nextItem = null;
            this.owner = null;
        }
    }
    export class EntityVo extends EleVo {
        public x: number;
        public y: number;
        public sizeHalf: Vector2;
        // public col: number;
        // public row: number;
        public hitRect: QuadTreeHitRect;
        public dispose(): void {
            this.disposeHitRect();
            super.dispose();
        }
        public disposeHitRect(): void {
            if (this.hitRect) {
                this.hitRect.dispose();
                this.hitRect = null;
            }
        }
    }
    export class MovableEleVo extends EntityVo {
        /** forward direction */
        public dir: Direction4 = Direction4.Up;
        public moveDir: Direction4 = Direction4.None;
        public moveSpeedPerFrame: number;
    }
    export class CellVo extends EntityVo {

    }
    //
    export class TankVo extends MovableEleVo {
        public initIndex:number = 0;
        public xOld: number;
        public yOld: number;
        stateA: BattleVoStateA = BattleVoStateA.None;
        /**这个状态持续的时间 */
        stateFrame:number=0;
        public bulletUid = 1;
        public skillMap: { [key: number]: SkillVo } = {};//key:skillSid
        public forecastMoveHitRect: QuadTreeHitRect;
        public dispose() {
            if (this.forecastMoveHitRect) {
                this.forecastMoveHitRect.dispose();
                this.forecastMoveHitRect = null;
            }
            super.dispose();
        }
        /** 阵营 */
        public group:BattleGroup = BattleGroup.None;
        public hp:number;
        public ap_tank:number;
        public ap_cell:number;
        /**攻击cell等级 1:wood 2:stone 3:iron*/
        public attack_cell_lv:number;
        /** 分数 */
        public coin:number;
    }
    export class BulletVo extends MovableEleVo {
        stateA: BattleVoStateA = BattleVoStateA.None;
        /** sender's id   e.g. TankVo.uid */
        ownerUid: number;
    }
    export class SkillVo extends EleVo {
        public isTriggering: boolean = false;
        public isTriggerOnce: boolean = false;
        public castFrame: number = -999999;
        public castGapFrame: number;//间隔帧数

    }
    export class BuffVo extends EleVo {

    }
}
