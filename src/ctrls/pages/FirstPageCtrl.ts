class FirstPageCtrl extends CtrlBase<fuis.elements_0.UI_FirstPage>{
    init(){
        this.ui.m_btnFight.addClickListener(this.btnFight_click,this);
        this.ui.m_btnTool.addClickListener(this.btnTool_click,this);
    }
    private btnFight_click(){
        CtrlMgr.si.openCtrl(CtrlId.Fight);
        this.closeThis();
    }
    private btnTool_click(){
        CtrlMgr.si.openCtrl(CtrlId.Tool_MapEditor);
        this.closeThis();
    }
}