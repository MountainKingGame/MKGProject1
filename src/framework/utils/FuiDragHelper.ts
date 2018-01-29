class FuiDragHelper implements IDispose {
    target: fairygui.GComponent;
    /**
     * 计算时不会考虑缩放,性能更好一些 
     * 确定ui不会被缩放,或者放在被缩放的层级中,这个参数就可以设置为true,
     * */
    noScale: boolean = true;
    /**自动触发, true:自动触发拖动 false: 不会自动触发move,必须由外部控制,并且传递 参数 e: egret.TouchEvent */
    autoTouchMove:boolean = true;
    constructor(target: fairygui.GComponent) {
        this.target = target;
        this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.target.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.target.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.target.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchEnd, this);
        this.target.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    }
    public dispose() {
        this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.target.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.target.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchEnd, this);
        this.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        this.target = null;
    }
    isBegin:boolean=false;
    lastTouchX: number = 0;
    lastTouchY: number = 0;
    private onTouchBegin(e: egret.TouchEvent) {
        this.isBegin=true;//防止没有 onTouchBegin,就直接 onTouchMove , 外部直接调用onTouchMove有可能出现这种情况
        this.lastTouchX = e.stageX;
        this.lastTouchY = e.stageY;
    }
    public onTouchMove(e: egret.TouchEvent) {
        if(this.isBegin==false){
            return;
        }
        if(e.touchDown){
            if(this.autoTouchMove){
                this.target.x += e.stageX - this.lastTouchX;
                this.target.y += e.stageY - this.lastTouchY;
            }
            this.lastTouchX = e.stageX;
            this.lastTouchY = e.stageY;
        }else{
            this.onTouchEnd(e);
        }
    }
    private onTouchEnd(e: egret.TouchEvent) {
        this.isBegin=false;
    }

}