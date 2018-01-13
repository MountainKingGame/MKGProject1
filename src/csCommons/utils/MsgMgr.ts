class MsgMgr {
    public static readonly si = new MsgMgr();
    private pool:CallbackPool<string> = new CallbackPool();
    // private map:{ string: number } = {};
    public add(key: string, thisObj: any,callback: Function) {
        this.pool.addItem(key,thisObj,callback);
    }
    public removeByThisObj(thisObj: any){
        this.pool.removeItemsByThisObj(thisObj);
    }
    public remove(key:string,callback:Function){
        this.pool.removeItemsByKeyCallback(key,callback);
    }
    public send(key:string,data:any=null,sender:object=null){
        this.pool.callItemsByKey(key,data,sender);
    }
}
class MsgItem{
    public thisObj:any;
    public handler:Function;
}