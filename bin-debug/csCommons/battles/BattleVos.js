var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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