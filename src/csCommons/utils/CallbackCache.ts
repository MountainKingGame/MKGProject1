class CallbackCache{
    public items:CallbackCacheItem[] = [];
    public addItem(key1:any,key2:any,data:any){
        let item:CallbackCacheItem = new CallbackCacheItem();
        item.key1 = key1;
        item.key2 = key2;
        item.data = data;
        this.items.push(item);
    }
    public getItemByKey12(key1:any,key2:any):CallbackCacheItem{
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackCacheItem = this.items[i];
            if(item.key1==key1 && item.key2==key2){
                return item;
            }
        }
        return null;
    }
    public getItemByKey1(key1:any):CallbackCacheItem{
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackCacheItem = this.items[i];
            if(item.key1==key1){
                return item;
            }
        }
        return null;
    }
    public getItemByKey2(key2:any):CallbackCacheItem{
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackCacheItem = this.items[i];
            if(item.key2==key2){
                return item;
            }
        }
        return null;
    }
    public getItemsByKey12(key1:any,key2:any):CallbackCacheItem[]{
        var rs:CallbackCacheItem[] = [];
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackCacheItem = this.items[i];
            if(item.key1==key1 && item.key2==key2){
                rs.push(item);
            }
        }
        return rs;
    }
    public getItemsByKey1(key1:any):CallbackCacheItem[]{
        var rs:CallbackCacheItem[] = [];
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackCacheItem = this.items[i];
            if(item.key1==key1){
                rs.push(item);
            }
        }
        return rs;
    }
    public getItemsByKey2(key2:any):CallbackCacheItem[]{
        var rs:CallbackCacheItem[] = [];
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackCacheItem = this.items[i];
            if(item.key2==key2){
                rs.push(item);
            }
        }
        return rs;
    }
    public removeItemsByKey12(key1:any,key2:any):void{
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackCacheItem = this.items[i];
            if(item.key1==key1 && item.key2 == key2){
                this.items.splice(i,1);
                i--;
            }
        }
    }
    public removeItemsByKey1(key1:any):void{
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackCacheItem = this.items[i];
            if(item.key1==key1){
                this.items.splice(i,1);
                i--;
            }
        }
    }
    public removeItemsByKey2(key2:any):void{
        for (let i = 0; i < this.items.length; i++) {
            let item:CallbackCacheItem = this.items[i];
            if(item.key2==key2){
                this.items.splice(i,1);
                i--;
            }
        }
    }
}
class CallbackCacheItem{
    public key1:any;
    public key2:any;
    public data:any;
}