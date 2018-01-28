class FrameInputMgr {
    private frameInputs: FightFrameIOItem[] = [];
    add(item: FightFrameIOItem) {
        this.frameInputs.push(item);
    }
    optimize(frame: number): FightFrameIOItem[] {
        let rs: FightFrameIOItem[] = [];
        let moveChangeItem: FightFrameIOItem;
        let skillMap: { [key: number]: FightFrameIOItem[] } = {};//key:skillSid
        for (let i = 0; i < this.frameInputs.length; i++) {
            let item = this.frameInputs[i];
            switch (item.kind) {
                case FightFrameInputKind.MoveDirChange:
                    moveChangeItem = item;//MoveDir only use lastest 
                    break;
                case FightFrameInputKind.SkillTrigger:
                    if (!skillMap[item.data0]) {
                        skillMap[item.data0] = [null, null];
                    }
                    skillMap[item.data0] = [item, null];//只要有trigger就把untrigger覆盖掉
                    break;
                case FightFrameInputKind.SkillUntrigger:
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
                    } else if (skillMap[item.data0][0].kind == FightFrameInputKind.SkillTrigger) {
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
                rs.push(new FightFrameIOItem(FightFrameInputKind.SkillTriggerOnce, frame, skillMap[skillSid][1].uid, skillSid));
            }
        }
        this.frameInputs = [];
        return rs;
    }
}