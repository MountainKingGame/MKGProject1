class StcMap {
    public static readonly si: StcMap = new StcMap();
    voDict: { [key: number]: IStcMapVo } = {};
    init() {
        var i = 1;
        while (i > 0) {
            let resName: string = `map${i}_json`;
            if (RES.hasRes(resName)) {
                let vo: IStcMapVo = RES.getRes(resName);
                if (!vo.id) vo.id = i;
                this.voDict[i] = vo;
                //-auto fill
                vo.size.row = Math.ceil(vo.cells.length/vo.size.col);
                //-
                i++;
            } else {
                break;
            }
        }
    }
    getVo(id: number): IStcMapVo {
        return this.voDict[id];
    }
}
/**
 * e.g. C:\fox\projects\MKGProject1\tb_client\resource\assets\stc\maps\map1.json
 */
interface IStcMapVo {
    version?: number;
    id?: number;
    kind?: number;
    size?: IGrid;
    cells: number[];
    players?: IStcMapVoPlayer[];
}
interface IStcMapVoPlayer {
    kind?: number;
    init?: IGrid;
}