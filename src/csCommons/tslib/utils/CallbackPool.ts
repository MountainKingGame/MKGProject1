class CallbackPool<T>{
    public items:CallbackPoolItem<T>[] = [];
    public addItem(key:T,thisObj:object,callback:Function){
        let item:CallbackPoolItem<T> = new CallbackPoolItem<T>();
        item.key = key;
        item.thisObj = thisObj;
        item.callback = callback;
        this.items.push(item);
    }
    
    public getItemByKeyThisObj(key:T,thisObj:object):CallbackPoolItem<T>{
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackPoolItem<T> = this.items[i];
            if(item.key==key && item.thisObj==thisObj){
                return item;
            }
        }
        return null;
    }
    public getItemByKey(key:T):CallbackPoolItem<T>{
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackPoolItem<T> = this.items[i];
            if(item.key==key){
                return item;
            }
        }
        return null;
    }
    public getItemByThisObj(thisObj:object):CallbackPoolItem<T>{
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackPoolItem<T> = this.items[i];
            if(item.thisObj==thisObj){
                return item;
            }
        }
        return null;
    }
    public getItemsByKeyThisObj(key:T,thisObj:object):CallbackPoolItem<T>[]{
        var rs:CallbackPoolItem<T>[] = [];
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackPoolItem<T> = this.items[i];
            if(item.key==key && item.thisObj==thisObj){
                rs.push(item);
            }
        }
        return rs;
    }
    public getItemsByKey(key:T):CallbackPoolItem<T>[]{
        var rs:CallbackPoolItem<T>[] = [];
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackPoolItem<T> = this.items[i];
            if(item.key==key){
                rs.push(item);
            }
        }
        return rs;
    }
    public callItemsByKey(key:T,...datas){
        var rs:CallbackPoolItem<T>[] = this.getItemsByKey(key);
        for (let i = 0; i < rs.length; i++) {
            let item:CallbackPoolItem<T> = rs[i];
            item.callback.apply(item.thisObj,datas);
        }
    }
    public getItemsByThisObj(thisObj:object):CallbackPoolItem<T>[]{
        var rs:CallbackPoolItem<T>[] = [];
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackPoolItem<T> = this.items[i];
            if(item.thisObj==thisObj){
                rs.push(item);
            }
        }
        return rs;
    }
    public removeItemsByKeyThisObj(key:T,thisObj:object):void{
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackPoolItem<T> = this.items[i];
            if(item.key==key && item.thisObj == thisObj){
                this.items.splice(i,1);
                i--;
            }
        }
    }
    public removeItemsByKeyCallback(key:T,callback:Function):void{
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackPoolItem<T> = this.items[i];
            if(item.key==key && item.callback == callback){
                this.items.splice(i,1);
                i--;
            }
        }
    }
    public removeItemsByKey(key:T):void{
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackPoolItem<T> = this.items[i];
            if(item.key==key){
                this.items.splice(i,1);
                i--;
            }
        }
    }
    public removeItemsByThisObj(thisObj:object):void{
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackPoolItem<T> = this.items[i];
            if(item.thisObj==thisObj){
                this.items.splice(i,1);
                i--;
            }
        }
    }
}
class CallbackPoolItem<T>{
    public key:T;
    public thisObj:object;
    public callback:Function;
}