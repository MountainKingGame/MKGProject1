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
var IdVo = /** @class */ (function () {
    function IdVo() {
    }
    return IdVo;
}());
var MoveVo = /** @class */ (function (_super) {
    __extends(MoveVo, _super);
    function MoveVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pos = new Vector2();
        _this.moveDir = Direction4.None;
        return _this;
    }
    return MoveVo;
}(IdVo));
//
var TankVo = /** @class */ (function (_super) {
    __extends(TankVo, _super);
    function TankVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TankVo;
}(MoveVo));
var BulletVo = /** @class */ (function (_super) {
    __extends(BulletVo, _super);
    function BulletVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BulletVo;
}(MoveVo));
var SkillVo = /** @class */ (function (_super) {
    __extends(SkillVo, _super);
    function SkillVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SkillVo;
}(IdVo));
var BuffVo = /** @class */ (function (_super) {
    __extends(BuffVo, _super);
    function BuffVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BuffVo;
}(IdVo));
//# sourceMappingURL=BattleVos.js.map