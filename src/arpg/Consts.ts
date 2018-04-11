class NetConsts{
    static RoleMoveTo = 1001
    static RoleSkill = 1002
}
class MsgConsts{
    static Pretreat_ = "Pretreat_"
    static NetRes_ = "NetRes_"
}
/**指令 */
enum OrderKind{
    /**原地站着 */
    Idle = 0,
    /**移动到某个目标(点,或者敌人,或者跟随队友,无法攻击时也会过去) */
    Move,
    /**去攻击到某个目标(无法攻击时会取消) */
    Attack,
    /**巡逻 */
    patrol,
}

enum ActionEum{
    None = 0,
    Move,
    /**翻滚 */
    Roll,
}
/**阵营 */
enum UnitCampKind{
    /**中立 */
    Neutral = 0,
    /**玩家 */
    Player = 1,
    Emeny = 2,
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

enum ActionTargetKind{
    /**目标点 */
    XY,
    /**目标单位 */
    Unit,
}