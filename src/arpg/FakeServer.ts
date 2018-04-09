class FakeServer{
    static singleton:FakeServer
    constructor(){
        FakeServer.singleton = this;
    }
    onSend(cmd,req:any):void{
        var role = ARPGFacade.singleton.myRoleNet;
        req.currFrame = ARPGFacade.singleton.currFrame+3;
        req.fromX = role.position.x;
        req.fromY = role.position.y;
        setTimeout(() => {
            MsgMgr.si.send(MsgConsts.NetRes_+cmd,req);
        }, 200);
    }
}