class TestHttp {
    testPost() {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        //设置为 POST 请求
        request.open("/savefile", egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send("path=resource/assets/stc/map_cell_1.json&content={cells=[][]}");
        request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this);
    }
    post1(){
        var params = "p1=postP1&p2=postP2";
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("savefile",egret.HttpMethod.POST);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        // request.send({p1:"postP1",p2:"postP2"});
        request.send( "p1=postP1&p2=postP2");
    }
    get1(){
        var params = "?p1=getP1&p2={cells:[[1,2,3],[4,2,3],[9,2,3]]}";
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("get1"+params,egret.HttpMethod.GET);
        request.send();
    }
    private onPostComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("post response data : ",request.response);
    }
    private onPostIOError(event:egret.IOErrorEvent):void {
        console.log("post error : " + event);
    }
    private onPostProgress(event:egret.ProgressEvent):void {
        console.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }
}