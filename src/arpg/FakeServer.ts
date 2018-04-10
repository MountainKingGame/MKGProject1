class FakeServer{
    static si:FakeServer
    constructor(){
        FakeServer.si = this;
    }
    onSend(cmd,req:any):void{
        var role = ARPGFacade.si.myRoleNet;
        req.currFrame = ARPGFacade.si.currFrame+3;
        req.fromX = role.position.x;
        req.fromY = role.position.y;
        setTimeout(() => {
            MsgMgr.si.send(MsgConsts.NetRes_+cmd,req);
        }, 200);
    }
}