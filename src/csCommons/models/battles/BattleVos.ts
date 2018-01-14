namespace models.battles {
    export class EleVo {
        public uid: number;
        public sid: number;
    }
    export class MoveVo extends EleVo {
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
    export class TankVo extends MoveVo {
        public bulletUid = 1;
        public fireKind:number = 0;
    }
    export class BulletVo extends MoveVo {
        /** sender's id   e.g. TankVo.uid */
        masterUid:number;
    }
    export class SkillVo extends EleVo {

    }
    export class BuffVo extends EleVo {

    }
}
