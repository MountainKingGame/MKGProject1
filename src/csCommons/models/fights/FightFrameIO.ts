class FightFrameIOItem {
    /**
     * 
     * @param kind 
     * @param frame 
     * @param uid tankId is same as player id in this map
     * @param data0 
     * @param data1 
     * @param data2 
     * @param data3 
     * @param data4 
     * @param data5 
     * @param data6 
     * @param data7 
     */
    constructor(kind: FightFrameInputKind|FightFrameOutputKind, frame: number, uid: number, data0: number = null, data1: number = null, data2: number = null, data3: number = null, data4: number = null, data5: number = null, data6: number = null, data7: number = null) {
        this.kind = kind;
        this.frame = frame;
        this.uid = uid;
        this.data0 = data0;
        this.data1 = data1;
        this.data2 = data2;
        this.data3 = data3;
        this.data4 = data4;
        this.data5 = data5;
        this.data6 = data6;
        this.data7 = data7;
    }
    kind: FightFrameInputKind|FightFrameOutputKind;
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
enum FightFrameInputKind {
    //===frame input
    MoveDirChange = 10001,
    /** skill trigger start  */
    SkillTrigger,
    /** skill once */
    SkillTriggerOnce,
    /** skill trigger end */
    SkillUntrigger,
}
enum FightFrameOutputKind {
    TankDirChange = 20001,
    TankXyChange,
    AddTank,
    AddBullet,
    RebirthTank,
    BulletHitBullet,
    BulletHitCell,//20007
    BulletHitTank,
    /*到达边缘*/
    BulletHitBorder,
    RemoveBullet,//20010
    RemoveTank,
    // BulletDump,
    AddBuff,
    RemoveBuff,
    AddEffect,
    RemoveEffect,
}