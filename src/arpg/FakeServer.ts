class FakeServer{
    static si:FakeServer
    constructor(){
        FakeServer.si = this;
    }
    onSend(cmd,req:any):void{
        var role = ARPGFacade.si.myRoleReal;
        req.currFrame = ARPGFacade.si.timer.currFrame+3;
        req.from = role.position;
        setTimeout(() => {
            MsgMgr.si.send(MsgConsts.NetRes_+cmd,req);
        }, 200);
    }
}