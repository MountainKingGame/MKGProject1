namespace models.battles {
    export class EleVo {
        public uid: number;
        public sid: number;
    }
    export class MoveVo extends EleVo {
        public xy: Vector2 = new Vector2();
        public col: number;
        public row: number;
        public moveDir: Direction4 = Direction4.None;
        /** 碰撞半径 */
        public hitTestRadii: number;
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
