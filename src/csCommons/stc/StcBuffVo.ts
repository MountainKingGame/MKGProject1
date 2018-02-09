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
class StcBuffVo{
    sid:StcBuffSid;
    effectMap:{[key:number]:boolean} = {};//key: StcEffectSid
}

class StcBuff extends StcCacheBase<StcBuffVo>{
    public static si: StcBuff = new StcBuff();
    init(){
        let vo:StcBuffVo;
        //--
        vo = new StcBuffVo();
        vo.sid = StcBuffSid.Invincible;
        vo.effectMap[StcEffectSid.Invincible] = true;
        this.voDict[vo.sid] = vo;
        //
        vo = new StcBuffVo();
        vo.sid = StcBuffSid.Transparent;
        vo.effectMap[StcEffectSid.Transparent] = true;
        this.voDict[vo.sid] = vo;
    }
}