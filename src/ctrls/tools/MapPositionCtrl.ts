namespace tools {
    export class MapPostionCtrl extends CtrlBase<fuis.elements_0.UI_Star4>{
        txtTitle:fairygui.GLabel;
        positionSize: StcMapCellSize = StcMapCellSize.Size4;
        init() {
            super.init();
            this.txtTitle = fuis.elements_0.UI_Label1.createInstance();
            this.ui.addChild(this.txtTitle);
            this.txtTitle.text = "";
            this.refreshPositionSize();
        }
        refreshPositionSize() {
            switch (this.positionSize) {
                case StcMapCellSize.Size1:
                    this.ui.setSize(models.fights.FightModelConfig.si.cellSize, models.fights.FightModelConfig.si.cellSize);
                    break;
                    case StcMapCellSize.Size4:
                    this.ui.setSize(models.fights.FightModelConfig.si.cellSize*2, models.fights.FightModelConfig.si.cellSize*2);
                    break;
            }
        }
    }
}