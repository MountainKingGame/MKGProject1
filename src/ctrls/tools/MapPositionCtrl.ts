namespace tools{
    export class MapPositionCtrl extends CtrlBase<UI_Star4>{
        private uiLabel:UI_Label1;
        positionSid:string;
        public col:number;
        public row:number;
        public size:StcCellSize;
        public dispose(){
            this.uiLabel.dispose();
            this.uiLabel = null;
            super.dispose();
        }
        init(){
            this.ui.m_crack.m_lv.selectedIndex = 0;
            this.uiLabel = UI_Label1.createInstance();
            this.uiLabel.touchable = false;
            this.ui.addChild(this.uiLabel);
            this.uiLabel.text = this.positionSid;
        }

    }
}