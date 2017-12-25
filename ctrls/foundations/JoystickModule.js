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
var JoystickModule = /** @class */ (function (_super) {
    __extends(JoystickModule, _super);
    function JoystickModule(view) {
        var _this = _super.call(this) || this;
        _this.useTween = false;
        _this.view = view;
        _this._button = view.m_joystick;
        _this._button.changeStateOnClick = false;
        _this._thumb = view.m_joystick.m_thumb;
        _this._touchArea = view.m_joystick_touch;
        _this._center = view.m_joystick_center;
        _this._InitX = view.width / 2;
        _this._InitY = view.height / 2;
        _this.touchId = -1;
        _this.radius = 150;
        _this.radiiDoMovingWhenStart = 80;
        _this.tempPoi = new laya.maths.Point();
        _this._center.setXY(_this._InitX, _this._InitY);
        _this._button.selected = false;
        _this._touchArea.on(laya.events.Event.MOUSE_DOWN, _this, _this.onTouchDown);
        return _this;
    }
    JoystickModule.prototype.Trigger = function (evt) {
        this.onTouchDown(evt);
    };
    JoystickModule.prototype.onTouchDown = function (evt) {
        if (this.touchId == -1) {
            this.touchId = evt.touchId;
            if (this._tweener != null) {
                this._tweener.clear();
                this._tweener = null;
            }
            this.view.globalToLocal(evt.stageX, evt.stageY, this.tempPoi);
            var bx = this.tempPoi.x;
            var by = this.tempPoi.y;
            // Log.info(this,`stagePos:${evt.stageX},${evt.stageY}`);
            // Log.info(this,`curPos:${bx},${by}`);
            this._button.selected = true;
            if (bx < 0)
                bx = 0;
            else if (bx > this._touchArea.width)
                bx = this._touchArea.width;
            if (by > fairygui.GRoot.inst.height)
                by = fairygui.GRoot.inst.height;
            else if (by < this._touchArea.y)
                by = this._touchArea.y;
            this._lastStageX = bx;
            this._lastStageY = by;
            this._startStageX = bx;
            this._startStageY = by;
            this._center.visible = true;
            this._center.x = bx;
            this._center.y = by;
            this._button.x = bx;
            this._button.y = by;
            var deltaX = bx - this._InitX;
            var deltaY = by - this._InitY;
            var degree = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            this._thumb.rotation = degree + 90;
            Laya.stage.on(laya.events.Event.MOUSE_MOVE, this, this.OnTouchMove);
            Laya.stage.on(laya.events.Event.MOUSE_UP, this, this.OnTouchUp);
            //  fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.OnTouchMove,this);
            //  fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_END,this.OnTouchUp,this);
            //---检测是否立即触发一次moving
            if (MathUtil.distance(bx, by, this._InitX, this._InitY) > this.radiiDoMovingWhenStart) {
                this.event(JoystickModule.JoystickMoving, degree);
            }
        }
    };
    JoystickModule.prototype.resetUI = function () {
        this._button.selected = false;
        this._thumb.rotation = 0;
        this._center.visible = true;
        this._center.x = this._InitX;
        this._center.y = this._InitY;
    };
    JoystickModule.prototype.OnTouchUp = function (evt) {
        if (this.touchId != -1 && evt.touchId == this.touchId) {
            this.touchId = -1;
            this._thumb.rotation = this._thumb.rotation + 180;
            this._center.visible = false;
            if (this.useTween == true) {
                this._tweener = laya.utils.Tween.to(this._button, { x: this._InitX - this._button.width / 2, y: this._InitY - this._button.height / 2 }, 300, laya.utils.Ease.circOut, laya.utils.Handler.create(this, function () {
                    this._tweener = null;
                    this.resetUI();
                }));
            }
            else {
                this.resetUI();
            }
            Laya.stage.off(laya.events.Event.MOUSE_MOVE, this, this.OnTouchMove);
            Laya.stage.off(laya.events.Event.MOUSE_UP, this, this.OnTouchUp);
            this.event(JoystickModule.JoystickUp);
        }
    };
    JoystickModule.prototype.OnTouchMove = function (evt) {
        if (this.touchId != -1 && evt.touchId == this.touchId) {
            this.view.globalToLocal(evt.stageX, evt.stageY, this.tempPoi);
            var bx = this.tempPoi.x;
            var by = this.tempPoi.y;
            //
            var moveX = bx - this._lastStageX;
            var moveY = by - this._lastStageY;
            this._lastStageX = bx;
            this._lastStageY = by;
            var buttonX = this._button.x + moveX;
            var buttonY = this._button.y + moveY;
            var offsetX = buttonX - this._startStageX;
            var offsetY = buttonY - this._startStageY;
            var rad = Math.atan2(offsetY, offsetX);
            var degree = rad * 180 / Math.PI;
            this._thumb.rotation = degree + 90;
            var maxX = this.radius * Math.cos(rad);
            var maxY = this.radius * Math.sin(rad);
            if (Math.abs(offsetX) > Math.abs(maxX))
                offsetX = maxX;
            if (Math.abs(offsetY) > Math.abs(maxY))
                offsetY = maxY;
            buttonX = this._startStageX + offsetX;
            buttonY = this._startStageY + offsetY;
            if (buttonX < 0)
                buttonX = 0;
            if (buttonY > fairygui.GRoot.inst.height)
                buttonY = fairygui.GRoot.inst.height;
            this._button.x = buttonX;
            this._button.y = buttonY;
            this.event(JoystickModule.JoystickMoving, degree);
        }
    };
    JoystickModule.JoystickMoving = "JoystickMoving";
    JoystickModule.JoystickUp = "JoystickUp";
    return JoystickModule;
}(libAdapter.EventDispatcher));
//# sourceMappingURL=JoystickModule.js.map