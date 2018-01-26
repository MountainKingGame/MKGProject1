namespace models.battles {
    export class BattleModel_Buffer {
        model: BattleModel;
        constructor(model: BattleModel) {
            this.model = model;
        }
        private buffEffectSidHandleMap: { [key: number]: Function } = {};
        public buffUid: number = 0;
        init() {
            this.buffEffectSidHandleMap[StcEffectSid.Invincible] = this.countInvincible;
        }
        tick() {
            for (const uid in this.model.tankMap) {
                const vo = this.model.tankMap[uid];
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
            this.model.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.AddBuff, this.model.currFrame, tank.uid, buff.uid));
        }
        removeBuffVo(tank: TankVo, buff: BuffVo): void {
            delete tank.buffMap[buff.uid];
            this.onChangeBuff(tank, buff);
            buff.stc = null;
            this.model.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.RemoveBuff, this.model.currFrame, tank.uid, buff.uid));
        }
        onChangeBuff(tank: TankVo, buff: BuffVo): void {
            for (const effectSid in buff.stc.effectMap) {
                this.buffEffectSidHandleMap[effectSid].call(this, tank);
            }
        }
        countInvincible(tank: TankVo) {
            let is: boolean = false;
            for (const uid in tank.buffMap) {
                if (tank.buffMap[uid].stc.sid == StcEffectSid.Invincible) {
                    is = true;
                    break;
                }
            }
            if(SUtil.getValueInMap(tank.effectMap,StcEffectSid.Invincible,false)!=is){
                tank.effectMap[StcEffectSid.Invincible] = is;
                if (is) {
                    this.model.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.AddEffect, this.model.currFrame, tank.uid, StcEffectSid.Invincible));
                } else {
                    this.model.frameOutputs.push(new BattleFrameIOItem(BattleFrameOutputKind.RemoveEffect, this.model.currFrame, tank.uid, StcEffectSid.Invincible));
                }
            }
        }
    }
}