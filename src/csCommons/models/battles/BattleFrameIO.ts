/* class BattleFrameIOMgr{
    public inputs:BattleFrameIOItem[] = [];
    public outputs:BattleFrameIOItem[] = [];
} */
class BattleFrameIOItem{
    constructor(kind:BattleFrameIOKind,frame:number,playerUid:number,data0:any=null,data1:any=null,data2:any=null,data3:any=null,data4:any=null,data5:any=null){
        this.kind = kind;
        this.frame = frame;
        this.uid = playerUid;
        this.data0 = data0;
        this.data1 = data1;
        this.data2 = data2;
        this.data3 = data3;
        this.data4 = data4;
        this.data5 = data5;
    }
    kind:BattleFrameIOKind;
    frame:number;
    uid:number;
    //
    data0:any;
    data1:any;
    data2:any;
    data3:any;
    data4:any;
    data5:any;
}
enum BattleFrameIOKind{
    //===frame input
    MoveDirChange = 101,
    SkillTrigger,
    SkillUntrigger,
    //===frame output
    TankDirChange = 201,
    TankXyChange,
    AddTank,
    AddBullet,
}