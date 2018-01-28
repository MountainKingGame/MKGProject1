class MouseWheelCtrl {
    /**
     * (delta:number,sender:MouseWheelCtrl)
     */
    static Msg_OnChange = "MouseWheelCtrl.Msg_OnChange";

    private static _si: MouseWheelCtrl;
    public static get si(): MouseWheelCtrl {
        if (!MouseWheelCtrl._si) MouseWheelCtrl._si = new MouseWheelCtrl();
        return MouseWheelCtrl._si;
    }
    init() {
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', this.scrollFunc, false);
        }//W3C 
        window.onmousewheel = document.onmousewheel = this.scrollFunc;//IE/Opera/Chrome 
    }
    scrollFunc(e) {
        let delta:number;
        if (e.wheelDelta) {//IE/Opera/Chrome 
            delta = e.wheelDelta;
        } else if (e.detail) {//Firefox 
            delta = e.detail;
        }
        // console.log("[info]",delta,"`delta`",e.screenX,e.screenY);
        MsgMgr.si.send(MouseWheelCtrl.Msg_OnChange,delta,this);
    }

}