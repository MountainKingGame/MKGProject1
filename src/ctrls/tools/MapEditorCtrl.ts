namespace tools {
    export class MapEditorCtrl extends CtrlBase<fuis.tools_0.UI_MapEditor>{
        private cellLayer: fairygui.GComponent = new fairygui.GComponent();
        private positionLayer: fairygui.GComponent = new fairygui.GComponent();
        private dragHelper: FuiDragHelper;
        private menuCellRim: fuis.tools_0.UI_CellRimGreen;
        private mapAreaCellRim: fuis.tools_0.UI_CellRimGreen;
        private cells: UI_MapCell[][] = [];
        private currCellSid: StcCellSid = StcCellSid.wood;
        private currPositionSelected: boolean = false;
        private mapPostionDic: { [key: string]: MapPositionCtrl } = {};
        private currMapTouchOverCell: UI_MapCell;
        private curMapPositionSize: StcCellSize;
        public dispose() {
            this.disposePositionDic();
            this.dragHelper = null;
            super.dispose();
        }
        private disposePositionDic() {
            for (const key in this.mapPostionDic) {
                const positionCtrl: MapPositionCtrl = this.mapPostionDic[key];
                positionCtrl.dispose();
            }
            this.mapPostionDic = {};
        }
        init() {
            super.init();
            this.menuCellRim = fuis.tools_0.UI_CellRimGreen.createInstance();
            this.menuCellRim.touchable = false;
            this.mapAreaCellRim = fuis.tools_0.UI_CellRimGreen.createInstance();
            this.mapAreaCellRim.touchable = false;
            this.ui.m_txtCol.text = "20";
            this.ui.m_txtRow.text = "20";
            this.ui.m_btnOpen.addClickListener(this.onBtnOpen, this);
            this.ui.m_btnSave.addClickListener(this.onBtnSave, this);
            this.ui.m_btnSetSize.addClickListener(this.onBtnSetSize, this);
            this.ui.m_btnPostionSelected.addClickListener(this.onBtnPositionSelected, this);
            this.ui.m_btnPostionSize.addClickListener(this.onBtnPositionSize, this);
            this.ui.m_txtPositionSid.text = "p0";
            this.ui.m_btnPostionPlayer.addClickListener(() => { this.onBtnPositionSidKind(StcMapPositionSidKind.Player) }, this);
            this.ui.m_btnPostionHome.addClickListener(() => { this.onBtnPositionSidKind(StcMapPositionSidKind.Home) }, this);
            this.ui.m_btnPostionEnemy.addClickListener(() => { this.onBtnPositionSidKind(StcMapPositionSidKind.Enemy) }, this);
            this.ui.m_btnPostionBoss.addClickListener(() => { this.onBtnPositionSidKind(StcMapPositionSidKind.Boss) }, this);

            this.ui.m_txtMapId.text = "1";
            this.initList();
            this.curMapPositionSize = StcCellSize.S2x2;
            this.ui.m_btnPostionSize.title = "2x2";
            this.initMapArea();
            //---
            MsgMgr.si.add(MouseWheelCtrl.Msg_OnChange, this, this.onMouseWheelChange);
            //
            this.autoDisposeList.push(this.menuCellRim, this.mapAreaCellRim);
            //

        }
        initList() {
            this.ui.m_list_cell.setVirtual();
            this.ui.m_list_cell.itemRenderer = this.list_cell_itemRenderer.bind(this);
            this.ui.m_list_cell.data = [StcCellSid.wood, StcCellSid.stone, StcCellSid.iron, StcCellSid.block, StcCellSid.river, StcCellSid.cover];
            this.ui.m_list_cell.numItems = this.ui.m_list_cell.data.length;
            this.ui.m_list_cell.refreshVirtualList();
        }
        initMapArea() {
            this.ui.m_mapArea.addChild(this.cellLayer);
            this.ui.m_mapArea.addChild(this.positionLayer);

            this.ui.m_mapArea.addChild(this.mapAreaCellRim);
            this.mapAreaCellRim.visible = false;
            //
            this.ui.m_mapArea.width = this.ui.m_mapArea.height = 1;
            this.ui.m_mapArea.y = 10;
            this.ui.m_mapArea.filters = [new egret.GlowFilter(0xDCBA98, 0.8, 15, 15, 2)];
            this.ui.m_mapArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMapArea_TouchBegin, this);
            this.ui.m_mapArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMapArea_TouchMove, this);
            this.ui.m_mapArea.addEventListener(egret.TouchEvent.TOUCH_END, this.onMapArea_TouchEnd, this);
            this.dragHelper = new FuiDragHelper(this.ui.m_mapArea);
            this.autoDisposeList.push(this.dragHelper);
            this.dragHelper.autoTouchMove = false;
        }
        private list_cell_itemRenderer(i: number, item: fuis.tools_0.UI_MapCellListItem) {
            let sid: StcCellSid = this.ui.m_list_cell.data[i] as StcCellSid;
            item.m_cell1.data = sid;
            (item.m_cell1 as fuis.elements_0.UI_MapCell).m_kind.selectedIndex = sid;
            item.m_cell1.addClickListener(this.onListCellItemClick1.bind(this), this);
            // item.m_cell4.data = sid;
            // (item.m_cell4.m_n0 as fuis.elements_0.UI_MapCell).m_kind.selectedIndex = sid;
            // (item.m_cell4.m_n1 as fuis.elements_0.UI_MapCell).m_kind.selectedIndex = sid;
            // (item.m_cell4.m_n2 as fuis.elements_0.UI_MapCell).m_kind.selectedIndex = sid;
            // (item.m_cell4.m_n3 as fuis.elements_0.UI_MapCell).m_kind.selectedIndex = sid;
            // item.m_cell4.addClickListener(this.onItemCell4.bind(this), this);
            if (i == 0) {
                this.onListCellItemClick1Target(item.m_cell1);
            }
        }
        // private currCellNum: number = 1;
        private onListCellItemClick1(e: egret.TouchEvent) {
            let target: UI_MapCell = e.currentTarget;
            this.onListCellItemClick1Target(target);
        }
        private onListCellItemClick1Target(target: fairygui.GComponent) {
            target.parent.addChild(this.menuCellRim);
            FuiUtil.copyProp4(this.menuCellRim, target);
            //
            this.currCellSid = target.data;
            this.currPositionSelected = false;
            // this.currCellNum = 1;
        }
        // private onItemCell4(e: egret.TouchEvent) {
        //     this.currCellSid = e.currentTarget.data;
        //     this.currCellNum = 4;
        // }
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
            var url = StcMap.mapPath(sid) + `?r=${Math.random()}`;
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
            this.disposePositionDic();
            let mapVo: IStcMapVo = JSON.parse(jsonStr);
            this.ui.m_txtCol.text = mapVo.cells.length.toString();
            this.ui.m_txtRow.text = mapVo.cells[0].length.toString();
            this.onBtnSetSize();
            for (let i = 0; i < this.cells.length; i++) {
                for (let j = 0; j < this.cells[0].length; j++) {
                    let cell: UI_MapCell = this.cells[i][j];
                    cell.m_kind.selectedIndex = mapVo.cells[i][j];
                }
            }
            for (let i = 0; i < mapVo.positions.length; i++) {
                let positionVo: IStcMapPosition = mapVo.positions[i];
                this.addPostionCtrl(positionVo.sid, positionVo.col, positionVo.row);
                this.validatePositionCtrlSize(positionVo.sid,positionVo.size);
            }
        }
        onBtnSave() {
            let sid: number = parseInt(this.ui.m_txtMapId.text);
            let mapVo: IStcMapVo = { kind: StcMapKind.Kind1, cells: [] };
            mapVo.version = StcMapVersion.v1;
            mapVo.sid = sid;
            mapVo.positions = [];
            for (let i = 0; i < this.cells.length; i++) {
                mapVo.cells[i] = []
                for (let j = 0; j < this.cells[0].length; j++) {
                    let cell: UI_MapCell = this.cells[i][j];
                    mapVo.cells[i][j] = cell.m_kind.selectedIndex;
                }
            }
            for (const key in this.mapPostionDic) {
                const positionCtrl: MapPositionCtrl = this.mapPostionDic[key];
                let vo: IStcMapPosition = {};
                vo.sid = key;
                vo.col = positionCtrl.col;
                vo.row = positionCtrl.row;
                vo.size = positionCtrl.size;
                mapVo.positions.push(vo);
            }
            let jsonStr = JSON.stringify(mapVo);
            console.log("[debug]", jsonStr, "`jsonStr`");
            //---
            var params = `?file=${StcMap.mapPath(sid)}&content=${jsonStr}`;
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open("savefile" + params, egret.HttpMethod.GET);
            request.send();
        }
        onBtnSetSize() {
            let col = parseInt(this.ui.m_txtCol.text);
            col = MathUtil.clamp(isNaN(col) ? 1 : col, 1, 200);
            let row = parseInt(this.ui.m_txtRow.text);
            row = MathUtil.clamp(isNaN(row) ? 1 : row, 1, 200);
            //-
            this.ui.m_mapArea.width = models.fights.FightModelUtil.gridToPos(col);
            this.ui.m_mapArea.height = models.fights.FightModelUtil.gridToPos(row);
            for (let i = 0; i < Math.min(this.cells.length, col); i++) {
                for (let j = this.cells[i].length; j < row; j++) {
                    this.addCell(i, j);
                }
                for (let j = row; j < this.cells[i].length; j++) {
                    this.cells[i][j].dispose();
                    this.cells[i].splice(j, 1);
                    j--;
                }
            }
            for (let i = this.cells.length; i < col; i++) {
                this.cells[i] = [];
                for (let j = 0; j < row; j++) {
                    this.addCell(i, j);
                }
            }
            for (let i = col; i < this.cells.length; i++) {
                for (let j = 0; j < this.cells[i].length; j++) {
                    this.cells[i][j].dispose();
                }
                this.cells.splice(i, 1);
                i--;
            }
            //--删除在外面的postion
            for (const key in this.mapPostionDic) {
                const positionCtrl: MapPositionCtrl = this.mapPostionDic[key];
                if (positionCtrl.col >= this.cells.length || positionCtrl.row >= this.cells[0].length) {
                    positionCtrl.dispose();
                    delete this.mapPostionDic[key];
                }
            }
            //
            let scale = Math.min(1,
                (this.ui.width - this.ui.m_mapArea.x - 10) / this.ui.m_mapArea.width,
                (this.ui.height - this.ui.m_mapArea.y - 10) / this.ui.m_mapArea.height);
            this.ui.m_mapArea.scaleX = this.ui.m_mapArea.scaleY = scale;
        }
        private onBtnPositionSelected() {
            this.ui.m_txtPositionSid.parent.addChild(this.menuCellRim);
            FuiUtil.copyProp4(this.menuCellRim, this.ui.m_txtPositionSid);
            this.currPositionSelected = true;
        }
        private onBtnPositionSize() {
            if (this.curMapPositionSize == StcCellSize.S2x2) {
                this.curMapPositionSize = StcCellSize.S1x1;
                this.ui.m_btnPostionSize.title = "1x1";
            } else {
                this.curMapPositionSize = StcCellSize.S2x2;
                this.ui.m_btnPostionSize.title = "2x2";
            }
            this.validatePositionCtrlSizeAuto();
        }
        private onBtnPositionSidKind(sidKind: string) {
            this.ui.m_txtPositionSid.text = this.findMapPositionNextSid(sidKind);
        }
        private findMapPositionNextSid(sidKind: string) {
            let i = 0;
            while (true) {
                if (this.mapPostionDic[sidKind + i.toString()] == undefined) {
                    break;
                }
                i++;
            }
            return sidKind + i.toString();
        }
        private addCell(col: number, row: number) {
            let cell: UI_MapCell = UI_MapCell.createInstance();
            cell.m_crack.m_lv.selectedIndex = 0;
            this.cells[col][row] = cell;
            cell.setXY(models.fights.FightModelUtil.gridToPos(col), models.fights.FightModelUtil.gridToPos(row));
            this.cellLayer.addChild(cell);
            cell.m_kind.selectedIndex = StcCellSid.floor;
        }
        private getMapSid(): number {
            return parseInt(this.ui.m_txtMapId.text);
        }

        private onMapArea_TouchBegin(e: egret.TouchEvent) {
            this.onMapArea_TouchMove(e);
        }
        private onMapArea_TouchMove(e: egret.TouchEvent) {
            let tempXY = new egret.Point();
            this.ui.m_mapArea.globalToLocal(e.stageX, e.stageY, tempXY);
            var col = models.fights.FightModelUtil.posToGrid(tempXY.x);
            var row = models.fights.FightModelUtil.posToGrid(tempXY.y);
            if (this.cells[col] && this.cells[col][row]) {
                this.setCurrOverCell(this.cells[col][row], KeyBoardCtrl.si.shiftKey);
            }
            // console.log(e.stageX, e.stageY);
            if (KeyBoardCtrl.si.ctrlKey) {
                if (this.currPositionSelected) {
                    let positionSid: string = this.ui.m_txtPositionSid.text;
                    let positionCtrl: MapPositionCtrl = this.mapPostionDic[positionSid];
                    if (positionCtrl == undefined) {
                        this.addPostionCtrl(positionSid, col, row)
                    } else {
                        positionCtrl.col = col;
                        positionCtrl.row = row;
                        FightCtrlUtil.setUIXYByGrid(positionCtrl.ui, positionCtrl.col, positionCtrl.row);
                    }
                    this.validatePositionCtrlSizeAuto();
                } else {
                    this.setCellSidSafe(col, row, this.currCellSid);
                    if (KeyBoardCtrl.si.shiftKey) {
                        this.setCellSidSafe(col + 1, row, this.currCellSid, -1, 1);
                        this.setCellSidSafe(col, row + 1, this.currCellSid, 1, -1);
                        this.setCellSidSafe(col + 1, row + 1, this.currCellSid, -1, -1);
                    }
                }
            } else if (KeyBoardCtrl.si.altKey) {
                if (this.currPositionSelected) {
                    let positionSid: string = this.ui.m_txtPositionSid.text;
                    if (this.mapPostionDic[positionSid]) {
                        this.mapPostionDic[positionSid].dispose();
                        delete this.mapPostionDic[positionSid];
                    }
                } else {
                    this.clearCell(col, row, KeyBoardCtrl.si.shiftKey);
                }
            }
            //
            this.dragHelper.onTouchMove(e);
        }
        private addPostionCtrl(sid: string, col: number, row: number) {
            let positionCtrl: MapPositionCtrl = new MapPositionCtrl(UI_Star4.createInstance());
            positionCtrl.positionSid = sid;
            positionCtrl.col = col;
            positionCtrl.row = row;
            positionCtrl.init();
            this.positionLayer.addChild(positionCtrl.ui);
            this.mapPostionDic[sid] = positionCtrl;
            FightCtrlUtil.setUIXYByGrid(positionCtrl.ui, positionCtrl.col, positionCtrl.row);
        }
        private validatePositionCtrlSizeAuto() {
            let positionSid: string = this.ui.m_txtPositionSid.text;
            this.validatePositionCtrlSize(positionSid,this.curMapPositionSize);
        }
        private validatePositionCtrlSize(positionSid:string,size:StcCellSize) {
            let positionCtrl: MapPositionCtrl = this.mapPostionDic[positionSid];
            if (positionCtrl) {
                positionCtrl.size = size;
                if (size == StcCellSize.S1x1) {
                    positionCtrl.ui.setSize(models.fights.FightModelConfig.si.cellSize,models.fights.FightModelConfig.si.cellSize);
                } else {
                    positionCtrl.ui.setSize(models.fights.FightModelConfig.si.cellSize*2,models.fights.FightModelConfig.si.cellSize*2);
                }
            }
        }
        private clearCell(col: number, row: number, isSize4: boolean) {
            this.setCellSidSafe(col, row, StcCellSid.floor);
            if (isSize4) {
                this.setCellSidSafe(col + 1, row, StcCellSid.floor);
                this.setCellSidSafe(col, row + 1, StcCellSid.floor);
                this.setCellSidSafe(col + 1, row + 1, StcCellSid.floor);
            }
        }
        private setCellSidSafe(col: number, row: number, sid: StcCellSid, sx: number = 1, sy: number = 1) {
            if (this.cells[col] && this.cells[col][row]) {
                this.cells[col][row].setPivot(0.5, 0.5);
                this.cells[col][row].m_kind.selectedIndex = sid;
                // this.cells[col][row].scaleX = sx;
                // this.cells[col][row].scaleY = sy;
                // this.cells[col][row].rotation = 180;
            }
        }
        private onMapArea_TouchEnd(e: egret.TouchEvent) {
            this.setCurrOverCell(null);
        }
        private setCurrOverCell(cell: UI_MapCell, isSize4: boolean = false) {
            if (this.currMapTouchOverCell != null) {
                // this.currOverCell.m_crack.m_lv.selectedIndex = 0;
                // this.currOverCell.filters = null;
                this.currMapTouchOverCell = null;
                this.mapAreaCellRim.visible = false;
            }
            if (cell) {
                this.currMapTouchOverCell = cell;
                this.mapAreaCellRim.setXY(this.currMapTouchOverCell.x, this.currMapTouchOverCell.y);
                this.mapAreaCellRim.visible = true;
                this.mapAreaCellRim.setScale(isSize4 ? 2 : 1, isSize4 ? 2 : 1);
                // this.currOverCell.m_crack.m_lv.selectedIndex = 2;
                // this.currOverCell.filters = [new egret.GlowFilter(0xFFFF00, 0.8, 12, 12, 2)];
            }
        }
        private onMouseWheelChange(delta: number) {
            this.ui.m_mapArea.scaleX = this.ui.m_mapArea.scaleY = this.ui.m_mapArea.scaleX + delta / 1000;
        }
    }
}