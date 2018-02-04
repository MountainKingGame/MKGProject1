namespace tools {
    export class MapEditorCtrl extends CtrlBase<fuis.tools_0.UI_MapEditor>{
        private cellLayer: fairygui.GComponent = new fairygui.GComponent();
        private positionLayer: fairygui.GComponent = new fairygui.GComponent();
        private dragHelper: FuiDragHelper;
        private menuCellRim: fuis.tools_0.UI_MapRimGreen;
        private mapAreaCellRim: fuis.tools_0.UI_MapRimGreen;
        private cells: UI_MapCell[][] = [];
        private currCellSid: StcCellSid = StcCellSid.wood;
        private currPositionSelected: boolean = false;
        private mapPostionDic: { [key: string]: MapPositionCtrl } = {};
        private curMapPositionDir: Direction4;
        private curMapPositionSize: IGrid;

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
            let scaleBarCtrl: ScaleBarCtrl = new ScaleBarCtrl(this.ui.m_scaleBar as fuis.elements_0.UI_ScaleBar);
            scaleBarCtrl.target = this.ui.m_mapArea;
            scaleBarCtrl.init();
            this.autoDisposeList.push(scaleBarCtrl);
            //
            this.menuCellRim = fuis.tools_0.UI_MapRimGreen.createInstance();
            this.menuCellRim.touchable = false;
            this.ui.m_txtMapId.text = "1";
            this.ui.m_txtCol.text = "20";
            this.ui.m_txtRow.text = "20";
            this.ui.m_btnOpen.addClickListener(this.onBtnOpen, this);
            this.ui.m_btnSave.addClickListener(this.onBtnSave, this);
            this.ui.m_btnSetSize.addClickListener(this.onBtnSetSize, this);
            //---
            this.initList();
            //---position
            this.ui.m_txtPositionSid.addEventListener(egret.Event.CHANGE, this.txtPositionSid_onChange, this);
            this.ui.m_btnPostionSelected.addClickListener(this.onBtnPositionSelected, this);
            this.onBtnPositionSidKind(StcMapPositionSidKind.Player)
            this.ui.m_btnPostionPlayer.addClickListener(() => { this.onBtnPositionSidKind(StcMapPositionSidKind.Player) }, this);
            this.ui.m_btnPostionHome.addClickListener(() => { this.onBtnPositionSidKind(StcMapPositionSidKind.Home) }, this);
            this.ui.m_btnPostionEnemy.addClickListener(() => { this.onBtnPositionSidKind(StcMapPositionSidKind.Enemy) }, this);
            this.ui.m_btnPostionBoss.addClickListener(() => { this.onBtnPositionSidKind(StcMapPositionSidKind.Boss) }, this);
            this.ui.m_btnPostionNumSub.addClickListener(() => this.onBtnPostionNumChange(-1), this);
            this.ui.m_btnPostionNumAdd.addClickListener(() => this.onBtnPostionNumChange(+1), this);
            this.ui.m_btnPostionDir.addClickListener(this.onBtnPositionDir, this);
            this.ui.m_btnPostionSize.addClickListener(this.onBtnPositionSize, this);
            //-
            this.curMapPositionDir = Direction4.Up;
            this.validateBtnPositionDir();
            this.curMapPositionSize = { col: 2, row: 2 }
            this.validateBtnPositionSize();
            //---
            this.mapAreaCellRim = fuis.tools_0.UI_MapRimGreen.createInstance();
            this.mapAreaCellRim.touchable = false;
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
            this.cellJsonStr = this.positionJsonStr = null;
            // var progressHandler = function (evt: egret.ProgressEvent): void {
            //     console.log("progress:", evt.bytesLoaded, evt.bytesTotal);
            // }
            {
                var request: egret.HttpRequest = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.once(egret.Event.COMPLETE, this.onLoadCellJson.bind(this), null);
                request.once(egret.IOErrorEvent.IO_ERROR, this.onLoadCellJson.bind(this), null);
                // request.once(egret.ProgressEvent.PROGRESS, progressHandler.bind(this), null);
                request.open(StcMap.cellJsonPath(this.getMapSid()) + `?r=${Math.random()}`, egret.HttpMethod.GET);
                request.send();
            }
            {
                var request: egret.HttpRequest = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.once(egret.Event.COMPLETE, this.onLoadPositionJson.bind(this), null);
                request.once(egret.IOErrorEvent.IO_ERROR, this.onLoadPositionJson.bind(this), null);
                // request.once(egret.ProgressEvent.PROGRESS, progressHandler.bind(this), null);
                request.open(StcMap.positionJsonPath(this.getMapSid()) + `?r=${Math.random()}`, egret.HttpMethod.GET);
                request.send();
            }
        }
        onLoadCellJson(evt: egret.Event): void {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request: egret.HttpRequest = evt.currentTarget;
                    // console.log("respHandler:n", request.response);
                    this.cellJsonStr = request.response;
                    this.validateLoadMapCpl();
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    console.log("respHandler io error");
                    break;
                default:
                    console.log("respHandler unknown error");
                    break;
            }
        }
        onLoadPositionJson(evt: egret.Event): void {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request: egret.HttpRequest = evt.currentTarget;
                    // console.log("respHandler:n", request.response);
                    this.positionJsonStr = request.response;
                    this.validateLoadMapCpl();
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    console.log("respHandler io error");
                    break;
                default:
                    console.log("respHandler unknown error");
                    break;
            }
        }
        private cellJsonStr: string;;
        private positionJsonStr: string;
        validateLoadMapCpl() {
            if (this.cellJsonStr && this.positionJsonStr) {
                this.openMapJsonStr();
            }
        }
        openMapJsonStr() {
            this.disposePositionDic();
            let cellJson: IStcMapCellJson = JSON.parse(this.cellJsonStr);
            let positionJson: IStcMapPositionJson = JSON.parse(this.positionJsonStr);
            let mapVo: IStcMapVo = StcMap.parseMapVo(this.getMapSid(), cellJson, positionJson);
            StcMap.setPositionMap(mapVo, positionJson);
            this.ui.m_txtCol.text = mapVo.cells.length.toString();
            this.ui.m_txtRow.text = mapVo.cells[0].length.toString();
            this.onBtnSetSize();
            for (let i = 0; i < this.cells.length; i++) {
                for (let j = 0; j < this.cells[0].length; j++) {
                    let cell: UI_MapCell = this.cells[i][j];
                    cell.m_kind.selectedIndex = mapVo.cells[i][j];
                }
            }
            for (let i = 0; i < positionJson.positions.length; i++) {
                let positionVo: IStcMapPositionVo = positionJson.positions[i];
                this.addPostionCtrl(positionVo.sid, positionVo.col, positionVo.row, positionVo.dir, positionVo.size);
            }
        }
        onBtnSave() {
            if (this.cells.length == 0) {
                console.log("[info]", "no cells");
                return;
            }
            let sid: number = parseInt(this.ui.m_txtMapId.text);
            //--
            let cellJson: IStcMapCellJson = { version: StcMapVersion.V1, sid: sid, cells: [] };
            for (let i = 0; i < this.cells.length; i++) {
                cellJson.cells[i] = []
                for (let j = 0; j < this.cells[0].length; j++) {
                    let cell: UI_MapCell = this.cells[i][j];
                    cellJson.cells[i][j] = cell.m_kind.selectedIndex;
                }
            }
            //--
            let positionJson: IStcMapPositionJson = { version: StcMapVersion.V1, sid: sid, positions: [] };
            for (const key in this.mapPostionDic) {
                const positionCtrl: MapPositionCtrl = this.mapPostionDic[key];
                let vo: IStcMapPositionVo = {};
                vo.sid = key;
                vo.col = positionCtrl.col;
                vo.row = positionCtrl.row;
                vo.dir = positionCtrl.dir;
                vo.size = positionCtrl.size;
                positionJson.positions.push(vo);
            }
            //---
            this.saveJson(StcMap.cellJsonPath(sid), cellJson);
            this.saveJson(StcMap.positionJsonPath(sid), positionJson);
        }
        saveJson(fileName: string, contentJson: object) {
            let jsonStr = JSON.stringify(contentJson);
            // console.log("[debug]", jsonStr, "`jsonStr`");
            //---
            var params = `?file=${fileName}&content=${jsonStr}`;
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
        private txtPositionSid_onChange() {
            this.onBtnPositionSelected();
        }
        private onBtnPositionSelected() {
            this.ui.m_txtPositionSid.parent.addChild(this.menuCellRim);
            FuiUtil.copyProp4(this.menuCellRim, this.ui.m_txtPositionSid);
            this.currPositionSelected = true;
            //
            let positionSid: string = this.ui.m_txtPositionSid.text;
            let positionCtrl: MapPositionCtrl = this.mapPostionDic[positionSid];
            if (positionCtrl) {
                this.curMapPositionDir = positionCtrl.dir;
                this.validateBtnPositionDir();
                this.curMapPositionSize = positionCtrl.size;
                this.validateBtnPositionSize();
            }
        }
        private onBtnPositionSidKind(sidKind: string) {
            this.ui.m_txtPositionSid.text = this.findMapPositionNextSid(sidKind);
            this.onBtnPositionSelected();
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
        private onBtnPostionNumChange(change: number) {
            let match = this.ui.m_txtPositionSid.text.match(/[0-9]+/);
            if (match && match.length > 0) {
                let num = parseInt(match[0]);
                let index = this.ui.m_txtPositionSid.text.indexOf(match[0]);
                num += change;
                if (num < 0) {
                    num = 0;
                }
                this.ui.m_txtPositionSid.text = this.ui.m_txtPositionSid.text.replace(match[0], num.toString());
            }
        }
        private onBtnPositionDir() {
            this.curMapPositionDir++;
            if (this.curMapPositionDir > Direction4.Up) {
                this.curMapPositionDir = Direction4.Left;
            }
            this.validateBtnPositionDir();
            this.validatePositionDir(this.ui.m_txtPositionSid.text, this.curMapPositionDir);
        }
        private validateBtnPositionDir() {
            this.ui.m_btnPostionDir.text = "dir" + this.curMapPositionDir.toString();
        }
        private onBtnPositionSize() {
            if (this.curMapPositionSize.col == 2 && this.curMapPositionSize.row == 2) {
                this.curMapPositionSize = { col: 1, row: 1 };
            } else {
                this.curMapPositionSize = { col: 2, row: 2 };
            }
            this.validateBtnPositionSize();
            this.validatePositionCtrlSize(this.ui.m_txtPositionSid.text, this.curMapPositionSize);
        }
        private validateBtnPositionSize() {
            this.ui.m_btnPostionSize.title = `size${this.curMapPositionSize}`;
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
            if (!KeyBoardCtrl.si.ctrlKey && !KeyBoardCtrl.si.altKey && !KeyBoardCtrl.si.shiftKey) {
                //判断是否选中 postion等element
                for (const sid in this.mapPostionDic) {
                    if (this.mapPostionDic.hasOwnProperty(sid)) {
                        this.ui.m_mapArea.globalToLocal(e.stageX, e.stageY, this.tempXY);
                        if (this.mapPostionDic[sid].hit(this.tempXY.x, this.tempXY.y)) {
                            this.ui.m_txtPositionSid.text = sid;
                            this.onBtnPositionSelected();
                            break;
                        }
                    }
                }
            }
            this.dragHelper.onTouchBegin(e);
            this.onMapArea_TouchMove(e);
        }
        tempXY = new egret.Point();
        private onMapArea_TouchMove(e: egret.TouchEvent) {
            this.ui.m_mapArea.globalToLocal(e.stageX, e.stageY, this.tempXY);
            var col = models.fights.FightModelUtil.posToGrid(this.tempXY.x);
            var row = models.fights.FightModelUtil.posToGrid(this.tempXY.y);
            if (this.cells[col] && this.cells[col][row]) {
                this.setCurrMapAreaOver(this.cells[col][row], KeyBoardCtrl.si.shiftKey);
            }
            // console.log(e.stageX, e.stageY);
            if (KeyBoardCtrl.si.ctrlKey) {
                if (this.currPositionSelected) {
                    let positionSid: string = this.ui.m_txtPositionSid.text;
                    let positionCtrl: MapPositionCtrl = this.mapPostionDic[positionSid];
                    if (positionCtrl == undefined) {
                        this.addPostionCtrl(positionSid, col, row, this.curMapPositionDir, this.curMapPositionSize);
                    } else {
                        positionCtrl.col = col;
                        positionCtrl.row = row;
                        FightCtrlUtil.setUIXYByGrid(positionCtrl.ui, positionCtrl.col, positionCtrl.row);
                    }
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
            } else {
                this.dragHelper.doMove(e);
            }
        }
        private addPostionCtrl(sid: string, col: number, row: number, dir: Direction4, size: IGrid) {
            let positionCtrl: MapPositionCtrl = new MapPositionCtrl(new fairygui.GComponent());
            positionCtrl.positionSid = sid;
            positionCtrl.col = col;
            positionCtrl.row = row;
            positionCtrl.dir = dir;
            positionCtrl.size = size;
            positionCtrl.init();
            this.positionLayer.addChild(positionCtrl.ui);
            this.mapPostionDic[sid] = positionCtrl;
            FightCtrlUtil.setUIXYByGrid(positionCtrl.ui, positionCtrl.col, positionCtrl.row);
            this.validatePositionDir(sid, dir);
            this.validatePositionCtrlSize(sid, size);
        }
        private getCurrPositionCtrl(): MapPositionCtrl {
            let positionSid: string = this.ui.m_txtPositionSid.text;
            return this.mapPostionDic[positionSid];
        }
        private validatePositionDir(positionSid: string, dir: Direction4) {
            let positionCtrl: MapPositionCtrl = this.mapPostionDic[positionSid];
            if (positionCtrl) {
                positionCtrl.dir = dir;
                positionCtrl.ui1.rotation = CommonHelper.dir4ToDegree(dir);
            }
        }
        private validatePositionCtrlSize(positionSid: string, size: IGrid) {
            let positionCtrl: MapPositionCtrl = this.mapPostionDic[positionSid];
            if (positionCtrl) {
                positionCtrl.size = size;
                positionCtrl.ui1.setSize(models.fights.FightModelConfig.si.cellSize * size.col, models.fights.FightModelConfig.si.cellSize * size.row);
                positionCtrl.ui1.setXY(models.fights.FightModelConfig.si.cellSize * size.col / 2, models.fights.FightModelConfig.si.cellSize * size.row / 2);
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
            this.setCurrMapAreaOver(null);
        }
        private setCurrMapAreaOver(cell: UI_MapCell, isSize4: boolean = false) {
            if (cell) {
                this.mapAreaCellRim.setXY(cell.x, cell.y);
                this.mapAreaCellRim.visible = true;
                this.mapAreaCellRim.setScale(isSize4 ? 2 : 1, isSize4 ? 2 : 1);
            } else {
                this.mapAreaCellRim.visible = false;
            }
        }
        private onMouseWheelChange(delta: number) {
            this.ui.m_mapArea.scaleX = this.ui.m_mapArea.scaleY = this.ui.m_mapArea.scaleX + delta / 1000;
        }
    }
}