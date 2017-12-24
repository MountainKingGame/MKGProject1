/**
 * 为BattleModel添加新物品的方法集合
 */
class BattleModelPartialAdd {
    public owner:BattleModel;
    constructor(owner:BattleModel){
        this.owner = owner;
    }
    public addTank(vo:TankVo){
        if(this.owner.tanks[vo.id]!=undefined){
            console.log("[fatal]","tankVo.id is exist!",vo);
        }else{
            this.owner.tanks[vo.id] = vo;
        }
    }
}