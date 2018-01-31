enum StcCellSid{ 
    floor = 0, 
    wood = 1,
    stone = 2,
    iron = 3,
    block = 4,
    river = 5,
    cover = 6,
}
enum StcMapVersion{
    v1 = 1,
}
enum StcCellSize{
    S1x1 = 11,
    S2x2 = 22,
}
enum StcMapKind{
    Kind1 = 1,
}
enum StcMapFactoryKind{
    Normal = 1,
    Loop = 2,
}
class StcMapPositionSidKind{
    static Player = "p";
    static Home = "h";
    static Enemy = "e";
    static Boss = "b";
}
class StcMap extends StcCacheBase<IStcMapVo>{
    public static readonly si: StcMap = new StcMap();
    static mapPath(sid:number):string{
        return `resource/assets/stc/maps/map_${sid}.json`;
    }
    init() {
        var i = 1;
        while (i > 0) {
            let resName: string = `map${i}_json`;
            if (RES.hasRes(resName)) {
                let vo: IStcMapVo = RES.getRes(resName);
                if (!vo.sid) vo.sid = i;
                this.voDict[i] = vo;
                StcMap.validateMapVo(vo);
                i++;
            } else {
                break;
            }
        }
    }
    static validateMapVo(vo: IStcMapVo){
        //-auto fill
        vo.positionMap = {};
        for (let i = 0; i < vo.positions.length; i++) {
            let item = vo.positions[i];
            if(!item.dir){
                item.dir = Direction4.Up;
            }
            if(!item.size){
                item.size = StcCellSize.S2x2;
            }
            vo.positionMap[item.sid] = item;
        }
    }
}
/**
 * e.g. C:\fox\projects\MKGProject1\tb_client\resource\assets\stc\maps\map1.json
 */
interface IStcMapVo {
    sid?: number;
    version?: StcMapVersion;
    kind?: StcMapKind;
    cells: number[][];
    positions?: IStcMapPosition[];
    factories?: IStcMapFactory[];
    //
    positionMap?:{[key:string]:IStcMapPosition};
}
interface IStcMapPosition {
    sid?: string;
    col?: number;
    row?: number;
    size?: StcCellSize;
    dir?: Direction4;
}
interface IStcMapFactory {
    kind?: StcMapFactoryKind;
    group?:models.fights.FightGroup;
    max?:number;
    delayMs?: number;
    gapMs?: number;
    values?: [number, string][];
}