class MsgMgr {
    public static readonly si = new MsgMgr();
    private map: { [key: string]: MsgItem[] } = {};
    // private map:{ string: number } = {};
    public add(name: string, handler: Function, thisObj: any = null) {
        var item:MsgItem = new MsgItem();
        item.thisObj = thisObj;
        item.handler = handler;
        if(!this.map[name]){
            this.map[name] = [];
        }
        this.map[name].push(item);
    }
    public remove(name:string,handler:Function){
        if(this.map[name]){
            for (let i = this.map[name].length-1; i >= 0; i--) {
                var item:MsgItem = this.map[name][i];
                if(item.handler == handler){
                    this.map[name].splice(i,1);
                }
            }
        }
    }
    public send(name:string,data:any=null,sender:object=null){
        if(this.map[name]){
            for (let i = 0; i < this.map[name].length; i++) {
                let item:MsgItem = this.map[name][i];
                item.handler.call(item.thisObj,data,sender);
            }
        }
    }
}
class MsgItem{
    public thisObj:any;
    public handler:Function;
}