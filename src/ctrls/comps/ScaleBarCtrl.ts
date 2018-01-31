class ScaleBarCtrl extends CtrlBase<fuis.elements_0.UI_ScaleBar>{
    target:fairygui.GComponent;
    step:number = 0.1;
    init(){
        this.ui.m_btnVal.addClickListener(()=>{
            this.target.setScale(1,1);
            this.refreshValue();
            this.ui.m_btnVal.selected = false;
        },this);
        this.ui.m_btnSub.addClickListener(()=>{this.scaleChange(-this.step)},this);
        this.ui.m_btnAdd.addClickListener(()=>{this.scaleChange(+this.step)},this);
    }
    scaleChange(delta:number){
        let scale:number = this.target.scaleX+delta;
        this.target.setScale(scale,scale);
        this.refreshValue();
    }
    refreshValue(){
        this.ui.m_btnVal.text = MathUtil.round(this.target.scaleX*100,2)+"%";
    }
}