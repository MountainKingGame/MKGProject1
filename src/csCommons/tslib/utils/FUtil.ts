class FUtil{
    /**
    * 获取当前时间戳(ms)
    * 
    * javascript 中使用 new Date().getTime() 方法
        IE8 以上版本可以使用 直接使用Date.now()方法
        //IE8以下版本
        if (!Date.now) {
            Date.now = function() { return new Date().getTime(); };
        }
        jQuery 获取时间戳 $.now()
        var timestamp = $.now();
    */
    static now():number{
        return new Date().getTime();
    }
    static getValueInMap(map:any,key:any,_default:any):any{
        if(map[key]==undefined){
            return _default;
        }
        return map[key];
    }
}