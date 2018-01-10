var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tests;
(function (tests) {
    var TestProtobuf = (function () {
        function TestProtobuf() {
            // Laya.stage.addEventListener(egret.Event.CHANGE,this.onStageChange,this);
            // this.testProtobuf_proto();
            // this.testProtobuf_static();
            console.log("[debug]", pb.cmd.BattleTankMove);
            this.testProtobuf_static_class(pb.Login);
        }
        TestProtobuf.prototype.testProtobuf_static = function () {
            var msg = new pb.Login();
            msg.account = "a";
            msg.password = "b";
            //
            console.log("msg = " + JSON.stringify(msg));
            var buffer1 = pb.Login.encode(msg).finish();
            console.log("buffer = " + Array.prototype.toString.call(buffer1));
            var decoded1 = pb.Login.decode(buffer1);
            console.log("decoded = " + JSON.stringify(decoded1));
            //
        };
        TestProtobuf.prototype.testProtobuf_static_class = function (cls) {
            var login = new cls();
            login.account = "aclass";
            login.password = "bclass";
            var cr = new pb.CreateRole();
            cr.name = "cr name";
            cr.sex = 1;
            //
            console.log("msg = " + JSON.stringify(login));
            var buffer1 = cls.encode(login).finish();
            console.log("buffer = " + Array.prototype.toString.call(buffer1));
            var decoded1 = cls.decode(buffer1);
            console.log("decoded = " + JSON.stringify(decoded1));
        };
        //===no static model
        TestProtobuf.prototype.testProtobuf_proto = function () {
            protobuf.load("pb/pb.proto", this.onAssetsLoaded);
        };
        TestProtobuf.prototype.onAssetsLoaded = function (err, root) {
            if (err)
                throw err;
            //-
            var Login = root.lookupType("pb.Login");
            var message = Login.create({ account: "qiu", password: "204qiu" });
            console.log("message = " + JSON.stringify(message));
            var buffer = Login.encode(message).finish();
            console.log("buffer = " + Array.prototype.toString.call(buffer));
            var decoded = Login.decode(buffer);
            console.log("decoded = " + JSON.stringify(decoded));
            //
        };
        return TestProtobuf;
    }());
    tests.TestProtobuf = TestProtobuf;
    __reflect(TestProtobuf.prototype, "tests.TestProtobuf");
})(tests || (tests = {}));
//# sourceMappingURL=TestProtobuf.js.map