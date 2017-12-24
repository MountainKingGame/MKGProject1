class IdVo{
    public id:number;
}
class MoveVo extends IdVo{
    public pos:Vector2 = new Vector2();
    public moveDir:Direction4  = Direction4.None;
    /** 碰撞半径 */
    public hitTestRadii:number;
}
//
class TankVo extends MoveVo {
}
class BulletVo extends MoveVo{

}
class SkillVo extends IdVo{

}
class BuffVo extends IdVo{
    
}

