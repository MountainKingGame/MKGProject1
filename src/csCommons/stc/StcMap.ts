class StcMap extends StcCacheBase<IStcMapVo>{
    public static readonly si: StcMap = new StcMap();
    init() {
        var i = 1;
        while (i > 0) {
            let resName: string = `map${i}_json`;
            if (RES.hasRes(resName)) {
                let vo: IStcMapVo = RES.getRes(resName);
                if (!vo.id) vo.id = i;
                this.voDict[i] = vo;
                //-auto fill
                vo.positionMap = {};
                for (let i = 0; i < vo.positions.length; i++) {
                    let item = vo.positions[i];
                    vo.positionMap[item.sid] = item;
                }
                //-
                i++;
            } else {
                break;
            }
        }
    }
}
/**
 * e.g. C:\fox\projects\MKGProject1\tb_client\resource\assets\stc\maps\map1.json
 */
interface IStcMapVo {
    version?: number;
    id?: number;
    kind?: number;
    cells: number[][];
    positions?: IStcMapPosition[];
    factories?: IStcMapFactory[];
    //
    positionMap?:{[key:number]:IStcMapPosition};
}
interface IStcMapPosition {
    sid?: number;
    col?: number;
    row?: number;
    dir?: number;
}
interface IStcMapFactory {
    kind?: StcMapFactoryKind;
    group?:number;
    max?:number;
    delayMs?: number;
    gapMs?: number;
    values?: [number, number][];
}