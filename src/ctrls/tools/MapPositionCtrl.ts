namespace tools{
    export class MapPositionCtrl extends CtrlBase<fairygui.GComponent>{
        public ui1:UI_Star4;
        private uiLabel:UI_Label1;
        positionSid:string;
        public col:number;
        public row:number;
        public dir:Direction4;
        public size:StcCellSize;
        public dispose(){
            this.uiLabel.dispose();
            this.uiLabel = null;
            this.ui1.dispose();
            this.ui1 = null;
            super.dispose();
        }
        init(){
            this.ui1 = UI_Star4.createInstance();
            this.ui.addChild(this.ui1);
            this.ui1.m_crack.m_lv.selectedIndex = 0;
            this.ui1.setPivot(0.5,0.5,true);
            //
            this.uiLabel = UI_Label1.createInstance();
            this.uiLabel.touchable = false;
            this.ui.addChild(this.uiLabel);
            this.uiLabel.text = this.positionSid;
        }

    }
}