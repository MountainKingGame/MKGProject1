class NetConsts{
    static RoleMoveTo = 1001
    static RoleSkill = 1002
}
class MsgConsts{
    static Pretreat_ = "Pretreat_"
    static NetRes_ = "NetRes_"
}

enum ActionEum{
    None = 0,
    Move,
    Roll,
}
class MoveKindTag{
    static None = 0
    static Speed = 1
    static Time = 2
    /**目的地 */
    static Destination = 4
    /**距离 */
    static Distance = 8
}