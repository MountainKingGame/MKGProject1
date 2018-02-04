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
    V1 = 1,
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

    static cellJsonPath(sid:number):string{
        return `resource/assets/stc/maps/${StcMap.cellJsonName(sid)}`;
    }
    static cellJsonName(sid:number):string{
        return `cell_${sid}.json`;
    }
    static positionJsonPath(sid:number):string{
        return `resource/assets/stc/maps/${StcMap.positionJsonName(sid)}`;
    }
    static positionJsonName(sid:number):string{
        return `position_${sid}.json`;
    }
    static profileJsonPath(sid:number):string{
        return `resource/assets/stc/maps/${StcMap.profileJsonName(sid)}`;
    }
    static profileJsonName(sid:number):string{
        return `profile_${sid}.json`;
    }

    init() {
        var sid = 1;
        while (sid > 0) {
            if (RES.hasRes(StcMap.cellJsonName(sid).replace(/\./g,"_"))) {
                let cellJson: IStcMapCellJson = RES.getRes(StcMap.cellJsonName(sid).replace(/\./g,"_"));
                let positionJson: IStcMapPositionJson = RES.getRes(StcMap.positionJsonName(sid).replace(/\./g,"_"));
                let profileJson: IStcMapProfileJson = RES.getRes(StcMap.profileJsonName(sid).replace(/\./g,"_"));
                if (!cellJson.sid) cellJson.sid = sid;
                this.voDict[sid] = StcMap.parseMapVo(sid,cellJson,positionJson,profileJson);
                sid++;
            } else {
                break;
            }
        }
    }
    static parseMapVo(sid:number,cellJson:IStcMapCellJson,positionJson:IStcMapPositionJson,profileJson?:IStcMapProfileJson):IStcMapVo{
        let vo:IStcMapVo = {};
        vo.sid = sid;
        vo.cells = cellJson.cells;
        StcMap.setPositionMap(vo,positionJson);
        if(profileJson){
            vo.kind = profileJson.kind;
            vo.factories = profileJson.factories;
        }
        return vo;
    }
    static setPositionMap(vo: IStcMapVo,profileVo:IStcMapPositionJson){
        //---auto fill
        if(!profileVo.positions){
            profileVo.positions = [];
        }
        //---quick 
        vo.positionMap = {};
        for (let i = 0; i < profileVo.positions.length; i++) {
            let item = profileVo.positions[i];
            if(!item.dir){
                item.dir = Direction4.Up;
            }
            if(!item.size){
                item.size = {col:2,row:2};
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
    kind?: StcMapKind;
    positionMap?:{[key:string]:IStcMapPositionVo};

    cells?: number[][];
    factories?: IStcMapFactory[];
}
interface IStcMapCellJson {
    version: number;
    sid: number;
    cells: number[][];
}
interface IStcMapPositionJson {
    version: number;
    sid: number;
    positions: IStcMapPositionVo[];
}
interface IStcMapProfileJson {
    version: number;
    sid: number;
    kind?: StcMapKind;
    factories?: IStcMapFactory[];
}
interface IStcMapPositionVo {
    sid?: string;
    col?: number;
    row?: number;
    size?: IGrid;
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