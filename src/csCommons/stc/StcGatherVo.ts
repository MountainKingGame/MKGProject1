enum StcGatherSid{
    V1=1,
    V2,
}
enum StcGatherKind{
    V1=1,
}
class StcGatherVo{
    sid:StcGatherSid;
    kind:StcGatherKind;
}

class StcGather extends StcCacheBase<StcGatherVo>{
    public static si: StcGather = new StcGather();
    init(){
        let vo:StcGatherVo;
        //--
        vo = new StcGatherVo();
        vo.sid = StcGatherSid.V1;
        vo.kind = StcGatherKind.V1;
        this.voDict[vo.sid] = vo;
        //
        vo = new StcGatherVo();
        vo.sid = StcGatherSid.V2;
        vo.kind = StcGatherKind.V1;
        this.voDict[vo.sid] = vo;
    }
}