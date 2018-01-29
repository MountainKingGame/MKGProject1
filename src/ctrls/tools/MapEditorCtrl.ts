namespace tools {
    export class MapEditorCtrl extends CtrlBase<fuis.tools_0.UI_MapEditor>{
        init() {
            super.init();
            this.ui.m_mapArea.width = this.ui.m_mapArea.height = 1;
            this.ui.m_mapArea.y = 10;
            this.ui.m_mapArea.filters = [new egret.GlowFilter(0xDCBA98, 0.8, 15, 15, 2)];
            this.ui.m_txtCol.text = "20";
            this.ui.m_txtRow.text = "20";
            this.ui.m_btnOpen.addClickListener(this.onBtnOpen, this);
            this.ui.m_btnSave.addClickListener(this.onBtnSave, this);
            this.ui.m_btnSetSize.addClickListener(this.onBtnSetSize, this);
            this.ui.m_txtMapId.text = "1";
            this.initList();
            this.initMapArea();
            //---
            MsgMgr.si.add(MouseWheelCtrl.Msg_OnChange, this, this.onMouseWheelChange);
        }
        initList() {
            this.ui.m_list_cell.setVirtual();
            this.ui.m_list_cell.itemRenderer = this.list_cell_itemRenderer.bind(this);
            this.ui.m_list_cell.data = [StcCellSid.wood, StcCellSid.stone, StcCellSid.iron, StcCellSid.block, StcCellSid.river, StcCellSid.cover];
            this.ui.m_list_cell.numItems = this.ui.m_list_cell.data.length;
            this.ui.m_list_cell.refreshVirtualList();
        }
        initMapArea() {
            this.ui.m_mapArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMapArea_TouchBegin, this);
            this.ui.m_mapArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMapArea_TouchMove, this);
            this.ui.m_mapArea.addEventListener(egret.TouchEvent.TOUCH_END, this.onMapArea_TouchEnd, this);
        }
        private list_cell_itemRenderer(i: number, item: fuis.tools_0.UI_MapCellListItem) {
            let sid: StcCellSid = this.ui.m_list_cell.data[i] as StcCellSid;
            item.m_cell1.data = sid;
            (item.m_cell1 as fuis.elements_0.UI_MapCell).m_kind.selectedIndex = sid;
            item.m_cell4.data = sid;
            (item.m_cell4.m_n0 as fuis.elements_0.UI_MapCell).m_kind.selectedIndex = sid;
            (item.m_cell4.m_n1 as fuis.elements_0.UI_MapCell).m_kind.selectedIndex = sid;
            (item.m_cell4.m_n2 as fuis.elements_0.UI_MapCell).m_kind.selectedIndex = sid;
            (item.m_cell4.m_n3 as fuis.elements_0.UI_MapCell).m_kind.selectedIndex = sid;
            item.m_cell1.addClickListener(this.onItemCell1.bind(this), this);
            item.m_cell4.addClickListener(this.onItemCell4.bind(this), this);
        }
        private currCellSid: StcCellSid = StcCellSid.wood;
        private currCellNum: number = 1;
        private onItemCell1(e: egret.TouchEvent) {
            this.currCellSid = e.currentTarget.data;
            this.currCellNum = 1;
        }
        private onItemCell4(e: egret.TouchEvent) {
            this.currCellSid = e.currentTarget.data;
            this.currCellNum = 4;
        }
        onBtnOpen() {
            let sid: number = this.getMapSid();
            var progressHandler = function (evt: egret.ProgressEvent): void {
                console.log("progress:", evt.bytesLoaded, evt.bytesTotal);
            }
            var request: egret.HttpRequest = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.once(egret.Event.COMPLETE, this.openMapRespHandler.bind(this), null);
            request.once(egret.IOErrorEvent.IO_ERROR, this.openMapRespHandler.bind(this), null);
            request.once(egret.ProgressEvent.PROGRESS, progressHandler.bind(this), null);
            var url = StcMap.mapPath(sid)+ `?r=${Math.random()}`;
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
            let mapVo: IStcMapVo = JSON.parse(jsonStr);
            this.ui.m_txtCol.text = mapVo.cells.length.toString();
            this.ui.m_txtRow.text = mapVo.cells[0].length.toString();
            this.onBtnSetSize();
            for (let i = 0; i < this.cells.length; i++) {
                for (let j = 0; j < this.cells[0].length; j++) {
                    let cell:UI_MapCell = this.cells[i][j];
                    cell.m_kind.selectedIndex = mapVo.cells[i][j];
                }
            }
        }
        onBtnSave() {
            let sid:number = parseInt(this.ui.m_txtMapId.text);
            let mapVo:IStcMapVo = {kind:StcMapKind.Kind1,cells:[]};
            mapVo.version = StcMapVersion.v1;
            mapVo.sid = sid;
            mapVo.positions=[];
            for (let i = 0; i < this.cells.length; i++) {
                mapVo.cells[i] = []
                for (let j = 0; j < this.cells[0].length; j++) {
                    let cell:UI_MapCell = this.cells[i][j];
                    mapVo.cells[i][j] = cell.m_kind.selectedIndex;
                }
            }
            let jsonStr = JSON.stringify(mapVo);
            console.log("[debug]",jsonStr,"`jsonStr`");
            //---
            var params = `?file=${StcMap.mapPath(sid)}&content=${jsonStr}`;
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open("savefile"+params,egret.HttpMethod.GET);
            request.send();
        }
        onBtnSetSize() {
            let col = parseInt(this.ui.m_txtCol.text);
            col = MathUtil.clamp(isNaN(col)?1:col,1,200);
            let row = parseInt(this.ui.m_txtRow.text);
            row = MathUtil.clamp(isNaN(row)?1:row,1,200);
            //-
            this.ui.m_mapArea.width = models.fights.FightModelUtil.gridToPos(col);
            this.ui.m_mapArea.height = models.fights.FightModelUtil.gridToPos(row);
            for (let i = 0; i < this.cells.length; i++) {
                for (let j = 0; j < this.cells[i].length; j++) {
                    this.cells[i][j].dispose();
                }
                delete this.cells[i];
            }
            this.cells = [];
            for (let i = this.cells.length; i < col; i++) {
                this.cells[i] = [];
                for (let j = 0; j < row; j++) {
                    let cell: UI_MapCell = UI_MapCell.createInstance();
                    this.cells[i][j] = cell;
                    cell.setXY(models.fights.FightModelUtil.gridToPos(i), models.fights.FightModelUtil.gridToPos(j));
                    this.ui.m_mapArea.addChild(cell);
                    cell.m_kind.selectedIndex = StcCellSid.floor;
                }
            }
            //
            let scale = Math.min(1,
                (this.ui.width - this.ui.m_mapArea.x - 10) / this.ui.m_mapArea.width,
                (this.ui.height - this.ui.m_mapArea.y - 10) / this.ui.m_mapArea.height);
            this.ui.m_mapArea.scaleX = this.ui.m_mapArea.scaleY = scale;
        }
        private getMapSid(): number {
            return parseInt(this.ui.m_txtMapId.text);
        }

        private cells: UI_MapCell[][] = [];
        private currOverCell: UI_MapCell;

        lastTouchX: number = 0;
        lastTouchY: number = 0;
        private onMapArea_TouchBegin(e: egret.TouchEvent) {
            this.lastTouchX = e.stageX;
            this.lastTouchY = e.stageY;
            this.onMapArea_TouchMove(e);
        }
        private onMapArea_TouchMove(e: egret.TouchEvent) {
            if (e.touchDown) {
                // console.log(e.stageX, e.stageY);
                let tempXY = new egret.Point();
                this.ui.m_mapArea.globalToLocal(e.stageX, e.stageY, tempXY);
                var col = models.fights.FightModelUtil.posToGrid(tempXY.x);
                var row = models.fights.FightModelUtil.posToGrid(tempXY.y);
                if (this.cells[col] && this.cells[col][row]) {
                    if (this.currOverCell != null) {
                        this.currOverCell.m_crack.m_lv.selectedIndex = 0;
                        this.currOverCell.filters = null;
                        this.currOverCell = null;
                    }
                    this.currOverCell = this.cells[col][row];
                    this.currOverCell.m_crack.m_lv.selectedIndex = 2;
                    this.currOverCell.filters = [new egret.GlowFilter(0xFFFF00, 0.8, 12, 12, 2)];
                }
                if (KeyBoardCtrl.si.altKey) {
                    this.setCellSidSafe(col, row, StcCellSid.floor);
                    if (KeyBoardCtrl.si.shiftKey) {
                        this.setCellSidSafe(col + 1, row, StcCellSid.floor);
                        this.setCellSidSafe(col, row + 1, StcCellSid.floor);
                        this.setCellSidSafe(col + 1, row + 1, StcCellSid.floor);
                    }
                } else if (KeyBoardCtrl.si.ctrlKey) {
                    this.setCellSidSafe(col, row, this.currCellSid);
                    if (KeyBoardCtrl.si.shiftKey) {
                        this.setCellSidSafe(col + 1, row, this.currCellSid, -1, 1);
                        this.setCellSidSafe(col, row + 1, this.currCellSid, 1, -1);
                        this.setCellSidSafe(col + 1, row + 1, this.currCellSid, -1, -1);
                    }
                } else {
                    //drag
                    // let currTouchX = e.stageX;
                    // let currTouchY = e.stageY;
                    this.ui.m_mapArea.x += e.stageX - this.lastTouchX;
                    this.ui.m_mapArea.y += e.stageY - this.lastTouchY;
                    this.lastTouchX = e.stageX;
                    this.lastTouchY = e.stageY;
                }
            } else {
                this.onMapArea_TouchEnd(e);
            }
        }
        private setCellSidSafe(col: number, row: number, sid: StcCellSid, sx: number = 1, sy: number = 1) {
            if (this.cells[col] && this.cells[col][row]) {
                this.cells[col][row].setPivot(0.5, 0.5);
                this.cells[col][row].m_kind.selectedIndex = sid;
                this.cells[col][row].scaleX = sx;
                this.cells[col][row].scaleY = sy;
                this.cells[col][row].rotation = 180;
            }
        }
        private onMapArea_TouchEnd(e: egret.TouchEvent) {

        }
        private onMouseWheelChange(delta: number) {
            this.ui.m_mapArea.scaleX = this.ui.m_mapArea.scaleY = this.ui.m_mapArea.scaleX + delta / 1000;
        }
    }
}