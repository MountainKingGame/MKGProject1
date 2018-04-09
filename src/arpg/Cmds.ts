interface ICMD{
    
}
class ClickCMD implements ICMD{
    toX:number;
    toY:number;
    constructor(toX:number,toY:number){
        this.toX = toX;
        this.toY = toY;
    }
}