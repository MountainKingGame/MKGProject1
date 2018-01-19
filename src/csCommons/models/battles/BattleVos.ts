namespace models.battles {
    export class EleVo {
        public uid: number;
        public sid: number;
    }
    // export class QuadTreeHitRect implements IQuadTreeItem{
    
    // }
    export class MovableEleVo extends EleVo {
        public x:number;
        public y:number;
        // public col: number;
        // public row: number;
        public dir:Direction4 = Direction4.Up;
        public hitTestRadii: number;
        public moveDir: Direction4 = Direction4.None;
        public moveSpeedPerFrame: number;
    }
    //
    export class TankVo extends MovableEleVo {
        public bulletUid = 1;
        public skillMap:{[key:number]:SkillVo} = {};//key:skillSid
    }
    export class BulletVo extends MovableEleVo {
        /** sender's id   e.g. TankVo.uid */
        ownerUid:number;
    }
    export class SkillVo extends EleVo {
        public isTrigger:boolean = false;
        public castFrame:number = -999999;
        public castGapFrame:number;//间隔帧数

    }
    export class BuffVo extends EleVo {

    }
}
