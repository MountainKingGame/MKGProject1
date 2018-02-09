namespace models.fights {
    export class EleVo implements IDispose {
        public uid: number;
        public sid: number;
        public dispose(): void {
        }
    }
    export class FightHitRect implements IQuadTreeNode, IDispose,IRect {
        ownerQuadTree: QuadTree;
        prevNode: IQuadTreeNode;
        nextNode: IQuadTreeNode;
        //
        owner: EntityVo;
        //
        isDirty: boolean;
        //
        left: number;
        top: number;
        right: number;
        bottom: number;
        //
        constructor(owner: EntityVo) {
            this.owner = owner;
        }
        recountLeftTop(xCenter: number, yCenter: number, w: number, h: number) {
            this.left = xCenter;
            this.top = yCenter;
            this.right = this.left + w;
            this.bottom = this.top + h;
        }
        recountPivotCenter(xCenter: number, yCenter: number, wHalf: number, hHalf: number) {
            this.left = xCenter - wHalf;
            this.top = yCenter - hHalf;
            this.right = xCenter + wHalf;
            this.bottom = yCenter + hHalf;
            this.left = Math.round(this.left);
            this.top = Math.round(this.top);
            this.right = Math.round(this.right);
            this.bottom = Math.round(this.bottom);
            this.isDirty = true;
        }
        dispose() {
            this.ownerQuadTree = this.prevNode = this.nextNode = null;
            this.owner = null;
        }
    }
    export class EntityVo extends EleVo {
        public x: number;
        public y: number;
        public sizeHalf: Vector2;
        // public col: number;
        // public row: number;
        
        public hpMax:number;
        public hp:number;
        
        public dispose(): void {
            this.disposeHitRect();
            super.dispose();
        }
        
        public hitRect: FightHitRect;
        public disposeHitRect(): void {
            if (this.hitRect) {
                this.hitRect.dispose();
                this.hitRect = null;
            }
        }
    }
    export class MovableEleVo extends EntityVo {
        public xOld: number;
        public yOld: number;
        /** forward direction */
        public dir: Direction4 = Direction4.Up;
        public moveDir: Direction4 = Direction4.None;
        public moveSpeedPerFrame: number;
    }
    export class CellVo extends EntityVo {
        
    }
    //
    export class TankVo extends MovableEleVo {
        public initPositionSid:string;
        stateA: FightVoStateA = FightVoStateA.None;
        /**这个状态持续的时间 */
        stateLivingFrame:number=0;
        public bulletUid = 1;
        public skillDic: { [key: number]: SkillVo } = {};//key:skillSid
        public forecastMoveHitRect: FightHitRect;
        public dispose() {
            if (this.forecastMoveHitRect) {
                this.forecastMoveHitRect.dispose();
                this.forecastMoveHitRect = null;
            }
            super.dispose();
        }
        /** 阵营 */
        public group:FightGroup;
        /**攻击力 对坦克 */
        public apTank:number;
        /**攻击力 对cell 每种cell 100分,*/
        public apCell:number;
        /** 分数 */
        public coin:number;

        public buffMap:{[key:number]:BuffVo} = {};
        effectMap:{[key:number]:boolean} = {};
    }
    /**bullet没有hp 他的hp就是ap_tank */
    export class BulletVo extends MovableEleVo {
        stateA: FightVoStateA = FightVoStateA.None;
        /** sender's id   e.g. TankVo.uid */
        ownerUid: number;
        group: FightGroup;
        public apTank:number;
        public apTankMax:number;
        public apCell:number;
    }
    export class SkillVo extends EleVo {
        public isTriggering: boolean = false;
        public isTriggerOnce: boolean = false;
        public castFrame: number = -999999;
        public castGapFrame: number;//间隔帧数

    }
    export class BuffVo extends EleVo {
        stc:StcBuffVo;
        frameMax:number;
        frame:number = 0;
    }
    /**地图上的收集品  掉落零件/技能 */
    export class GatherVo extends EntityVo {
        kind:StcGatherKind;
        xOld:number;
        yOld:number;
        livingFrame:number = 0;
        /**总frame 0则没有限制 */
        totalFrame:number;
    }
    export class EffectStateVo{
        /**无敌 */
        invincible:boolean;
        /** 透明 */
        transparent:boolean;
    }
}
