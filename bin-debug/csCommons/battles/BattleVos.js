var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var IdVo = (function () {
    function IdVo() {
    }
    return IdVo;
}());
__reflect(IdVo.prototype, "IdVo");
var MoveVo = (function (_super) {
    __extends(MoveVo, _super);
    function MoveVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pos = new Vector2();
        _this.moveDir = Direction4.None;
        return _this;
    }
    return MoveVo;
}(IdVo));
__reflect(MoveVo.prototype, "MoveVo");
//
var TankVo = (function (_super) {
    __extends(TankVo, _super);
    function TankVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TankVo;
}(MoveVo));
__reflect(TankVo.prototype, "TankVo");
var BulletVo = (function (_super) {
    __extends(BulletVo, _super);
    function BulletVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BulletVo;
}(MoveVo));
__reflect(BulletVo.prototype, "BulletVo");
var SkillVo = (function (_super) {
    __extends(SkillVo, _super);
    function SkillVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SkillVo;
}(IdVo));
__reflect(SkillVo.prototype, "SkillVo");
var BuffVo = (function (_super) {
    __extends(BuffVo, _super);
    function BuffVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BuffVo;
}(IdVo));
__reflect(BuffVo.prototype, "BuffVo");
//# sourceMappingURL=BattleVos.js.map