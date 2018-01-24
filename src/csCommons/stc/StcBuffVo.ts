class StcBuffVo{
    sid:number;
    effectMap:{[key:number]:boolean} = {};
}
enum StcBuffSid{
    Invincible = 1,
    Transparent = 2,
}
enum StcEffectSid{
    Invincible = 1,
    Transparent,
    HitPoint,
    ManaPoint,
    AttackPoint,
    Defend,
    MoveSpeed,
    AttackSpeed,
}

class StcBuff extends StcCacheBase<StcBuffVo>{
    public static si: StcBuff = new StcBuff();
    init(){
        let buff:StcBuffVo;
        //--
        buff = new StcBuffVo();
        buff.sid = StcBuffSid.Invincible;
        buff.effectMap[StcEffectSid.Invincible] = true;
        this.voDict[buff.sid] = buff;
        //
        buff = new StcBuffVo();
        buff.sid = StcBuffSid.Transparent;
        buff.effectMap[StcEffectSid.Transparent] = true;
        this.voDict[buff.sid] = buff;
    }
}