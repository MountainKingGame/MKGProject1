namespace tools {
    export class MapEditorCtrl extends CtrlBase<fuis.tools_0.UI_MapEditor>{
        init() {
            super.init();
            this.ui.m_mapArea.width = this.ui.m_mapArea.height = 1;
            this.ui.m_txtCol.text = "20";
            this.ui.m_txtRow.text = "20";
            this.ui.m_btnOpen.addClickListener(this.onBtnOpen, this);
            this.ui.m_btnSave.addClickListener(this.onBtnSave, this);
            this.ui.m_btnSetSize.addClickListener(this.onBtnSetSize, this);
            this.ui.m_txtMapId.text = "1";
            this.initList();
            this.initMapArea();
        }
        initList(){
            this.ui.m_list_cell.setVirtual();
            this.ui.m_list_cell.itemRenderer = this.list_cell_itemRenderer.bind(this);
            this.ui.m_list_cell.data = [StcCellSid.wood,StcCellSid.stone,StcCellSid.iron,StcCellSid.block,StcCellSid.river,StcCellSid.cover];
            this.ui.m_list_cell.numItems = this.ui.m_list_cell.data.length;
            this.ui.m_list_cell.refreshVirtualList();
        }
        initMapArea(){
            this.ui.m_mapArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMapArea_TouchBegin,this);
            this.ui.m_mapArea.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMapArea_TouchMove,this);
            this.ui.m_mapArea.addEventListener(egret.TouchEvent.TOUCH_END,this.onMapArea_TouchEnd,this);
        }
        private list_cell_itemRenderer(i:number,item:fuis.tools_0.UI_MapCellListItem){
            let sid:StcCellSid = this.ui.m_list_cell.data[i] as StcCellSid;
            item.m_cell1.data = sid;
            (item.m_cell1 as fuis.elements_0.UI_MapCell).m_kind.selectedIndex = sid;
            item.m_cell4.data = sid;
            (item.m_cell4.m_n0 as fuis.elements_0.UI_MapCell).m_kind.selectedIndex = sid;
            (item.m_cell4.m_n1 as fuis.elements_0.UI_MapCell).m_kind.selectedIndex = sid;
            (item.m_cell4.m_n2 as fuis.elements_0.UI_MapCell).m_kind.selectedIndex = sid;
            (item.m_cell4.m_n3 as fuis.elements_0.UI_MapCell).m_kind.selectedIndex = sid;
            item.m_cell1.addClickListener(this.onItemCell1.bind(this),this);
            item.m_cell4.addClickListener(this.onItemCell4.bind(this),this);
        }
        private currCellSid:StcCellSid = StcCellSid.wood;
        private currCellNum:number = 1;
        private onItemCell1(e:egret.TouchEvent){
            this.currCellSid = e.currentTarget.data;
            this.currCellNum = 1;
        }
        private onItemCell4(e:egret.TouchEvent){
            this.currCellSid = e.currentTarget.data;
            this.currCellNum = 4;
        }
        onBtnOpen() {
            let mapSid: number = this.getMapId();
            var progressHandler = function (evt: egret.ProgressEvent): void {
                console.log("progress:", evt.bytesLoaded, evt.bytesTotal);
            }
            var request: egret.HttpRequest = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.once(egret.Event.COMPLETE, this.openMapRespHandler.bind(this), null);
            request.once(egret.IOErrorEvent.IO_ERROR, this.openMapRespHandler.bind(this), null);
            request.once(egret.ProgressEvent.PROGRESS, progressHandler.bind(this), null);
            var url = `resource/assets/stc/maps/map${mapSid}.json?r=${Math.random()}`;
            request.open(url, egret.HttpMethod.GET);
            request.send();
        }
        openMapRespHandler(evt: egret.Event): void {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request: egret.HttpRequest = evt.currentTarget;
                    // console.log("respHandler:n", request.response);
                    this.openMapJsonStr(request.response);
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    console.log("respHandler io error");
                    break;
                default:
                    console.log("respHandler unknown error");
                    break;
            }
        }
        openMapJsonStr(jsonStr: string) {
            let vo: IStcMapVo = JSON.parse(jsonStr);
            this.ui.m_txtCol.text = vo.cells.length.toString();
            this.ui.m_txtRow.text = vo.cells[0].length.toString();
            this.onBtnSetSize();
        }
        onBtnSave() {

        }
        onBtnSetSize(){
            let col = parseInt(this.ui.m_txtCol.text);
            let row = parseInt(this.ui.m_txtRow.text);
            this.ui.m_mapArea.width = models.fights.FightModelUtil.gridToPos(col);
            this.ui.m_mapArea.height = models.fights.FightModelUtil.gridToPos(row);
            //-删除
            for (let i = 0; i < this.cells.length; i++) {
                for (let j = 0; j < this.cells[i].length; j++) {
                    this.cells[i][j].dispose();
                }
                delete this.cells[i];
            }
            this.cells = [];
            //-增加
            for (let i = this.cells.length; i < col; i++) {
                this.cells[i] = [];
                for (let j = 0; j < row; j++) {
                    let cell:UI_MapCell = UI_MapCell.createInstance();
                    this.cells[i][j] = cell;
                    cell.setXY(models.fights.FightModelUtil.gridToPos(i),models.fights.FightModelUtil.gridToPos(j));
                    this.ui.m_mapArea.addChild(cell);
                    cell.m_kind.selectedIndex = StcCellSid.wood;
                }
            }
        }
        private getMapId(): number {
            return parseInt(this.ui.m_txtMapId.text);
        }

        private cells:fuis.elements_0.UI_MapCell[][] = [];

        private onMapArea_TouchBegin(e:egret.TouchEvent){
        }
        private onMapArea_TouchMove(e:egret.TouchEvent){
            if(e.touchDown){
                console.log(e.stageX,e.stageY);
                if(KeyBoardCtrl.si.altKey){

                }else{

                }
            }
        }
        private onMapArea_TouchEnd(){

        }
    }
}