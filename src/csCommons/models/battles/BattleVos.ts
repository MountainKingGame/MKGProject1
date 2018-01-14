namespace models.battles {
    export class EleVo {
        public uid: number;
        public sid: number;
    }
    export class MoveVo extends EleVo {
        public x:number;
        public y:number;
        public col: number;
        public row: number;
        public dir:Direction4 = Direction4.Up;
        public hitTestRadii: number;
        public moveDir: Direction4 = Direction4.None;
        /** move speed per frame */
        public moveSpeedPerFrame: number;
    }
    //
    export class TankVo extends MoveVo {
    }
    export class BulletVo extends MoveVo {

    }
    export class SkillVo extends EleVo {

    }
    export class BuffVo extends EleVo {

    }
}
