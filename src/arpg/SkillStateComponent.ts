enum SkillKind{

}

enum SkillState{
    None = 0,
    /**前摇开始*/
    Front,
    /**触发*/
    Trigger,
    /**发射 */
    Launch,
    /**后摇开始 */
    Rear,
}
enum SkillStatePhase{
    None = 0,
    Start,
    Update,
    End,
}
class SkillStateComponent{
    sid:number;
    state:SkillState;
    statePhase:SkillStatePhase;
}