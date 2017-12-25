
class JoystickModule extends libAdapter.EventDispatcher {

    private view: fuis.joysticks_1.UI_JoystickMain;
    private _InitX: number;
    private _InitY: number;
    private _startStageX: number;
    private _startStageY: number;
    private _lastStageX: number;
    private _lastStageY: number;
    private _button: fairygui.GButton;
    private _touchArea: fairygui.GObject;
    private _thumb: fairygui.GObject;
    private _center: fairygui.GObject;
    private touchId: number;
    private _tweener: laya.utils.Tween;
    private tempPoi: laya.maths.Point;

    public static JoystickMoving: string = "JoystickMoving";
    public static JoystickUp: string = "JoystickUp";
    /** button在视觉上距离center的最大距离 */
    public radius: number;
    /** touchStart时如果超过这个值则立即触发移动,否则进挪动center */
    public radiiDoMovingWhenStart: number;

    public constructor(view: fuis.joysticks_1.UI_JoystickMain) {
        super();
        this.view = view;
        this._button = view.m_joystick;
        this._button.changeStateOnClick = false;
        this._thumb = view.m_joystick.m_thumb;
        this._touchArea = view.m_joystick_touch;
        this._center = view.m_joystick_center;

        this._InitX = view.width / 2;
        this._InitY = view.height / 2;
        this.touchId = -1;
        this.radius = 150;
        this.radiiDoMovingWhenStart = 80;

        this.tempPoi = new laya.maths.Point();

        this._center.setXY(this._InitX, this._InitY);
        this._button.selected = false;

        this._touchArea.on(laya.events.Event.MOUSE_DOWN, this, this.onTouchDown);
    }

    public Trigger(evt: laya.events.Event): void {
        this.onTouchDown(evt);
    }

    private onTouchDown(evt: laya.events.Event) {
        if (this.touchId == -1)//First touch
        {
            this.touchId = evt.touchId;

            if (this._tweener != null) {
                this._tweener.clear();
                this._tweener = null;
            }
            this.view.globalToLocal(evt.stageX, evt.stageY, this.tempPoi);
            var bx: number = this.tempPoi.x;
            var by: number = this.tempPoi.y;
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

            var deltaX: number = bx - this._InitX;
            var deltaY: number = by - this._InitY;
            var degree: number = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
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
    }
    private resetUI() {
        this._button.selected = false;
        this._thumb.rotation = 0;
        this._center.visible = true;
        this._center.x = this._InitX;
        this._center.y = this._InitY;
    }
    private useTween: boolean = false;
    private OnTouchUp(evt: laya.events.Event): void {
        if (this.touchId != -1 && evt.touchId == this.touchId) {
            this.touchId = -1;
            this._thumb.rotation = this._thumb.rotation + 180;
            this._center.visible = false;
            if (this.useTween == true) {
                this._tweener = laya.utils.Tween.to(this._button, { x: this._InitX - this._button.width / 2, y: this._InitY - this._button.height / 2 },
                    300, laya.utils.Ease.circOut, laya.utils.Handler.create(this, function (): void {
                        this._tweener = null;
                        this.resetUI();

                    }));
            } else {
                this.resetUI();
            }

            Laya.stage.off(laya.events.Event.MOUSE_MOVE, this, this.OnTouchMove);
            Laya.stage.off(laya.events.Event.MOUSE_UP, this, this.OnTouchUp);

            this.event(JoystickModule.JoystickUp);
        }
    }

    private OnTouchMove(evt: laya.events.Event): void {
        if (this.touchId != -1 && evt.touchId == this.touchId) {
            this.view.globalToLocal(evt.stageX, evt.stageY, this.tempPoi);
            var bx: number = this.tempPoi.x;
            var by: number = this.tempPoi.y;
            //
            var moveX: number = bx - this._lastStageX;
            var moveY: number = by - this._lastStageY;
            this._lastStageX = bx;
            this._lastStageY = by;
            var buttonX: number = this._button.x + moveX;
            var buttonY: number = this._button.y + moveY;

            var offsetX: number = buttonX - this._startStageX;
            var offsetY: number = buttonY - this._startStageY;

            var rad: number = Math.atan2(offsetY, offsetX);
            var degree: number = rad * 180 / Math.PI;
            this._thumb.rotation = degree + 90;

            var maxX: number = this.radius * Math.cos(rad);
            var maxY: number = this.radius * Math.sin(rad);
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
    }
}
