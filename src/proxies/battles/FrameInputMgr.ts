class FrameInputMgr {
    private frameInputs: BattleFrameIOItem[] = [];
    add(item: BattleFrameIOItem) {
        this.frameInputs.push(item);
    }
    optimize(frame: number): BattleFrameIOItem[] {
        let rs: BattleFrameIOItem[] = [];
        let moveChangeItem: BattleFrameIOItem;
        let skillMap: { [key: number]: BattleFrameIOItem[] } = {};//key:skillSid
        for (let i = 0; i < this.frameInputs.length; i++) {
            let item = this.frameInputs[i];
            switch (item.kind) {
                case BattleFrameIOKind.MoveDirChange:
                    moveChangeItem = item;//MoveDir only use lastest 
                    break;
                case BattleFrameIOKind.SkillTrigger:
                    if (!skillMap[item.data0]) {
                        skillMap[item.data0] = [null, null];
                    }
                    skillMap[item.data0] = [item, null];//只要有trigger就把untrigger覆盖掉
                    break;
                case BattleFrameIOKind.SkillUntrigger:
                    if (!skillMap[item.data0]) {
                        skillMap[item.data0] = [null, null];
                    }
                    //--logic as follow
                    // null:null => [0]:untrigger[1]:null 
                    //[0]:trigger[1]:null => [0]:trigger[1]:untrigger 
                    //[0]:untrigger[1]:null //do nothing
                    //[0]:trigger[1]:untrigger //do nothing
                    //--
                    if (!skillMap[item.data0][0]) {
                        skillMap[item.data0] = [item, null];
                    } else if (skillMap[item.data0][0].kind == BattleFrameIOKind.SkillTrigger) {
                        skillMap[item.data0][1] = item;
                    }
                    break;
            }
        }
        if (moveChangeItem != null) {
            moveChangeItem.frame = frame;
            rs.push(moveChangeItem);
        }
        for (const key in skillMap) {
            let skillSid: number = parseInt(key);
            if (!skillMap[skillSid][1]) {
                skillMap[skillSid][0].frame = frame;
                rs.push(skillMap[skillSid][0]);
            } else {
                // [0]:trigger[1]:untrigger
                rs.push(new BattleFrameIOItem(BattleFrameIOKind.SkillTriggerOnce, frame, skillMap[skillSid][1].uid, skillSid));
            }
        }
        this.frameInputs = [];
        return rs;
    }
}