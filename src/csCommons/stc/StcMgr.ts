class StcCacheBase<T>{
    voDict: { [key: number]: T } = {};
    getVo(sid: number): T {
        return this.voDict[sid];
    }
}
class StcMgr{
    public static si: StcMgr = new StcMgr();
    init(){
        StcMap.si.init();
        StcBuff.si.init();
    }
}