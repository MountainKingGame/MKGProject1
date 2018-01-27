class BattleCtrlUtil{
    static initCrack(ui:fuis.battles_1.UI_Crack){
        ui.m_lv.selectedIndex = 0;
    }
    /** 设置crack的显示效果 
     * 调用这个函数时 currVal 必须>0 currVal必须<=maxVal*/
    static refreshCrack(ui:fuis.battles_1.UI_Crack,currVal:number,maxVal:number){
        //-- 掉血量1-25时不显示裂痕
        // let quarter:number = maxVal/4;
        // ui.m_lv.selectedIndex = 4-Math.ceil(currVal/quarter);
        //-- 掉血了就显示裂痕
        let third:number = maxVal/3;
        ui.m_lv.selectedIndex = Math.ceil((maxVal-currVal)/third);
    }
}