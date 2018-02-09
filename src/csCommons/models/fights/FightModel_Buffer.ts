namespace models.fights {
    export class FightModel_Buffer {
        model: FightModel;
        constructor(model: FightModel) {
            this.model = model;
        }
        private buffEffectSidHandleDic: { [key: number]: Function } = {};
        public buffUid: number = 0;
        init() {
            this.buffEffectSidHandleDic[StcEffectSid.Invincible] = this.countInvincible;
        }
        tick() {
            for (const uid in this.model.tankDic) {
                const vo = this.model.tankDic[uid];
                this.tick_tank(vo);
            }
        }
        private tick_tank(tank: TankVo) {
            for (const uid in tank.buffMap) {
                var vo: BuffVo = tank.buffMap[uid];
                vo.frame++;
                if (vo.frame >= vo.frameMax) {
                    this.removeBuffVo(tank, vo);
                }
            }
        }
        addBuff(tank: TankVo, stcBuffSid: StcBuffSid, frameMax: number): void {
            var buff: BuffVo = new BuffVo();
            buff.uid = this.buffUid++;
            buff.sid = stcBuffSid;
            buff.stc = StcBuff.si.getVo(stcBuffSid);
            buff.frameMax = frameMax;
            tank.buffMap[buff.uid] = buff;
            this.onChangeBuff(tank, buff);
            this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.AddBuff, this.model.currFrame, tank.uid, buff.uid));
        }
        removeBuffVo(tank: TankVo, buff: BuffVo): void {
            delete tank.buffMap[buff.uid];
            this.onChangeBuff(tank, buff);
            buff.stc = null;
            this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.RemoveBuff, this.model.currFrame, tank.uid, buff.uid));
        }
        onChangeBuff(tank: TankVo, buff: BuffVo): void {
            for (const effectSid in buff.stc.effectMap) {
                this.buffEffectSidHandleDic[effectSid].call(this, tank);
            }
        }
        countInvincible(tank: TankVo) {
            let has: boolean = false;
            for (const uid in tank.buffMap) {
                // if (tank.buffMap[uid].stc.sid == StcBuffSid.Invincible) {
                if (tank.buffMap[uid].stc.effectMap[StcEffectSid.Invincible]) {
                    has = true;
                    break;
                }
            }
            if(FUtil.getValueInMap(tank.effectMap,StcEffectSid.Invincible,false)!=has){//判断状态是否有变化
                tank.effectMap[StcEffectSid.Invincible] = has;
                if (has) {
                    this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.AddEffect, this.model.currFrame, tank.uid, StcEffectSid.Invincible));
                } else {
                    this.model.frameOutputs.push(new FightFrameIOItem(FightFrameOutputKind.RemoveEffect, this.model.currFrame, tank.uid, StcEffectSid.Invincible));
                }
            }
        }
    }
}