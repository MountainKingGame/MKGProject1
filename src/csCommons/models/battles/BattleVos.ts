namespace models.battles {
    export class EleVo implements IDispose {
        public uid: number;
        public sid: number;
        public dispose():void{
        }
    }
    export class QuadTreeHitRect implements IQuadTreeItem,IDispose{
        ownerQuadTree: QuadTree;
        preItem: IQuadTreeItem;
        nextItem: IQuadTreeItem;
        //
        owner:EntityVo;
        //
        isDirty: boolean;
        x: number;
        y: number;
        right: number;
        bottom: number;
        constructor(owner:EntityVo){
            this.owner = owner;
        }
        recountLeftTop(xCenter:number,yCenter:number,w:number,h:number){
            this.x = xCenter;
            this.y = yCenter;
            this.right = this.x+w;
            this.bottom = this.y+h;
        }
        /** is half width when prvot == center, is full width when pivot = left top */
        z_w:number;
        /** is half height when prvot == center, is full height when pivot = left top */
        z_h:number;
        recountPivotCenter(xCenter:number,yCenter:number){
            this.x = xCenter-this.z_w;
            this.y = yCenter-this.z_h;
            this.right = xCenter+this.z_w;
            this.bottom = yCenter+this.z_h;
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.right = Math.round(this.right);
            this.bottom = Math.round(this.bottom);
            this.isDirty = true;
        }
        dispose(){
            this.ownerQuadTree = this.preItem = this.nextItem = null;
            this.owner = null;
        }
    }
    export class EntityVo extends EleVo {
        public x:number;
        public y:number;
        // public col: number;
        // public row: number;
        public hitRect:QuadTreeHitRect;
        public dispose():void{
            this.disposeHitRect();
            super.dispose();
        }
        public disposeHitRect():void{
            if(!this.hitRect){
                this.hitRect.dispose();
                this.hitRect = null;
            }
        }
    }
    export class MovableEleVo extends EntityVo {
        /** forward direction */
        public dir:Direction4 = Direction4.Up;
        public moveDir: Direction4 = Direction4.None;
        public moveSpeedPerFrame: number;
    }
    export class CellVo extends EntityVo{

    }
    //
    export class TankVo extends MovableEleVo {
        stateA:BattleVoStateA = BattleVoStateA.None;
        public bulletUid = 1;
        public skillMap:{[key:number]:SkillVo} = {};//key:skillSid
    }
    export class BulletVo extends MovableEleVo {
        stateA:BattleVoStateA = BattleVoStateA.None;
        /** sender's id   e.g. TankVo.uid */
        ownerUid:number;
    }
    export class SkillVo extends EleVo {
        public isTriggering:boolean = false;
        public isTriggerOnce:boolean = false;
        public castFrame:number = -999999;
        public castGapFrame:number;//间隔帧数

    }
    export class BuffVo extends EleVo {

    }
}
