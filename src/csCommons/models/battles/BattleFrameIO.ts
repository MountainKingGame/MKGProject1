/* class BattleFrameIOMgr{
    public inputs:BattleFrameIOItem[] = [];
    public outputs:BattleFrameIOItem[] = [];
} */
class BattleFrameIOItem {
    constructor(kind: BattleFrameInputKind|BattleFrameOutputKind, frame: number, playerUid: number, data0: number = null, data1: number = null, data2: number = null, data3: number = null, data4: number = null, data5: number = null, data6: number = null, data7: number = null) {
        this.kind = kind;
        this.frame = frame;
        this.uid = playerUid;
        this.data0 = data0;
        this.data1 = data1;
        this.data2 = data2;
        this.data3 = data3;
        this.data4 = data4;
        this.data5 = data5;
        this.data6 = data6;
        this.data7 = data7;
    }
    kind: BattleFrameInputKind|BattleFrameOutputKind;
    frame: number;
    uid: number;
    //
    data0: number;
    data1: number;
    data2: number;
    data3: number;
    data4: number;
    data5: number;
    data6: number;
    data7: number;
}
enum BattleFrameInputKind {
    //===frame input
    MoveDirChange = 10001,
    /** skill trigger start  */
    SkillTrigger,
    /** skill once */
    SkillTriggerOnce,
    /** skill trigger end */
    SkillUntrigger,
}
enum BattleFrameOutputKind {
    TankDirChange = 20001,
    TankXyChange,
    AddTank,
    AddBullet,
    BulletHitBullet,
    BulletHitCell,
    BulletHitTank,
    // BulletDump,
}