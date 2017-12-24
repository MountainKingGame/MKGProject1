namespace tests {
    export class TestProtobuf {
        private ProtoBuf: any = Laya.Browser.window.protobuf;
        constructor() {
            // Laya.stage.addEventListener(egret.Event.CHANGE,this.onStageChange,this);
            // this.testProtobuf_proto();
            // this.testProtobuf_static();
            console.log("[debug]", pb.cmd.BattleTankMove);
            this.testProtobuf_static_class(pb.Login);
        }

        private testProtobuf_static() {
            let msg: pb.Login = new pb.Login();
            msg.account = "a";
            msg.password = "b";
            //
            console.log(`msg = ${JSON.stringify(msg)}`);
            let buffer1 = pb.Login.encode(msg).finish();
            console.log(`buffer = ${Array.prototype.toString.call(buffer1)}`);
            let decoded1 = pb.Login.decode(buffer1);
            console.log(`decoded = ${JSON.stringify(decoded1)}`);
            //
        }
        private testProtobuf_static_class(cls: any): void {
            var login: pb.Login = new cls();
            login.account = "aclass";
            login.password = "bclass";
            var cr: pb.CreateRole = new pb.CreateRole();
            cr.name = "cr name";
            cr.sex = 1;
            //
            console.log(`msg = ${JSON.stringify(login)}`);
            let buffer1 = cls.encode(login).finish();
            console.log(`buffer = ${Array.prototype.toString.call(buffer1)}`);
            let decoded1 = cls.decode(buffer1);
            console.log(`decoded = ${JSON.stringify(decoded1)}`);
        }
        private testProtobuf_proto() {
            this.ProtoBuf.load("pb/pb.proto", this.onAssetsLoaded);
        }
        private onAssetsLoaded(err: any, root: any): void {
            if (err)
                throw err;
            //-
            const Login = root.lookupType("pb.Login");
            let message = Login.create({ account: "qiu", password: "204qiu" });
            console.log(`message = ${JSON.stringify(message)}`);
            let buffer = Login.encode(message).finish();
            console.log(`buffer = ${Array.prototype.toString.call(buffer)}`);
            let decoded = Login.decode(buffer);
            console.log(`decoded = ${JSON.stringify(decoded)}`);
            //
        }
    }
}