class BattleCtrlUtil{
    static initCrack(ui:fuis.battles_1.UI_Crack){
        ui.m_lv.selectedIndex = 0;
    }
    /** 调用这个函数的 currVal 必须>0 */
    static refreshCrack(ui:fuis.battles_1.UI_Crack,currVal:number,maxVal:number){
        let quarter:number = maxVal/4;
        ui.m_lv.selectedIndex = 4-Math.ceil(currVal/quarter);
    }
}