
class JoystickInner extends egret.EventDispatcher {
    private ui: fuis.joysticks_1.UI_JoystickMain;
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
    private _tweener: egret.Tween;
    private _curPos: egret.Point;//only for temp

    public static JoystickMoving: string = "JoystickMoving";
    public static JoystickUp: string = "JoystickUp";
    /** Max distance between button and center in visual */
    public radius: number = 150;
    /** When touchStart trigger, if beyond this value then move immediately else move center only */
    public radiiDoMovingWhenStart: number = 80;

    public showDirUseButtonThumb: boolean = true;

    public constructor(ui: fuis.joysticks_1.UI_JoystickMain) {
        super();
        this.ui = ui;
        this.init();
    }
    public init(){
        this._button = this.ui.m_joystick;
        this._button.changeStateOnClick = false;
        this._thumb = this.ui.m_joystick.m_thumb;
        this._touchArea = this.ui.m_joystick_touch;
        this._center = this.ui.m_joystick_center;

        this._InitX = this.ui.width / 2;
        this._InitY = this.ui.height / 2;
        this.touchId = -1;

        this._curPos = new egret.Point();

        this._center.setXY(this._InitX, this._InitY);
        this._button.selected = false;
        this._touchArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);

    }

    public Trigger(evt: egret.TouchEvent): void {
        this.onTouchDown(evt);
    }

    private onTouchDown(evt: egret.TouchEvent) {
        if (this.touchId == -1)//First touch
        {
            this.touchId = evt.touchPointID;

            if (this._tweener != null) {
                this._tweener.setPaused(true);
                this._tweener = null;
            }
            this.ui.globalToLocal(evt.stageX, evt.stageY, this._curPos);
            var bx: number = this._curPos.x;
            var by: number = this._curPos.y;

            bx = MathUtil.clamp(bx,0,this._touchArea.width);
            by = MathUtil.clamp(by,0,this._touchArea.height);

            this._lastStageX = this._startStageX = bx;
            this._lastStageY = this._startStageY = by;

            this._center.visible = true;
            this._center.x = this._button.x = bx;
            this._center.y = this._button.y = by;

            var deltaX: number = bx - this._InitX;
            var deltaY: number = by - this._InitY;
            this.degree = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            this.countDirection();
            //-
            fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
            fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchUp, this);
            if (MathUtil.distance(bx, by, this._InitX, this._InitY) > this.radiiDoMovingWhenStart) {
                this._button.selected = true;
                this.dispatchEventWith(JoystickInner.JoystickMoving, false, this.degree);
            }
        }
    }
    public degree: number;
    public direction:Direction4;
    private countDirection() {
        this.direction = Direction4Util.degreeToDir(this.degree);
        //-
        if (this.showDirUseButtonThumb) {
            this._thumb.rotation = (this.direction) * 90 ;//thump forward dir up when ro=0
        } else {
            this._thumb.rotation = this.degree + 90;
            this.ui.m_joystick_dir.visible = true;
            this.ui.m_joystick_dir.rotation = (this.direction - 1) * 90;
            this.ui.m_joystick_dir.setXY(this.ui.m_joystick_center.x, this.ui.m_joystick_center.y);
        }
    }

    private OnTouchUp(evt: egret.TouchEvent): void {
        if (this.touchId != -1 && evt.touchPointID == this.touchId) {
            this.touchId = -1;
            this._thumb.rotation = this._thumb.rotation + 180;
            this._center.visible = false;
            //-do not use tween
            // this.resetTouchPosition();
            //-use tween
            this._tweener = egret.Tween.get(this._button)
                .to({ x: this._InitX, y: this._InitY },
                300, egret.Ease.circOut)
                .call(this.resetTouchPosition, this);
            //-
            fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
            fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchUp, this);
            //
            this.ui.m_joystick_dir.visible = false;
        }
    }
    private resetTouchPosition() {
        this._tweener = null;
        this._button.selected = false;
        this._thumb.rotation = 0;
        this._center.visible = true;
        this._center.x = this._InitX;
        this._center.y = this._InitY;
    }

    private OnTouchMove(evt: egret.TouchEvent): void {
        if (this.touchId != -1 && evt.touchPointID == this.touchId) {
            this._button.selected = true;
            //
            this.ui.globalToLocal(evt.stageX, evt.stageY, this._curPos);
            var bx: number = this._curPos.x;
            var by: number = this._curPos.y;
            // var bx: number = evt.stageX / fairygui.GRoot.contentScaleFactor;
            // var by: number = evt.stageY / fairygui.GRoot.contentScaleFactor;
            var moveX: number = bx - this._lastStageX;
            var moveY: number = by - this._lastStageY;
            this._lastStageX = bx;
            this._lastStageY = by;
            var buttonX: number = this._button.x + moveX;
            var buttonY: number = this._button.y + moveY;

            var offsetX: number = buttonX - this._startStageX;
            var offsetY: number = buttonY - this._startStageY;

            var rad: number = Math.atan2(offsetY, offsetX);
            this.degree = rad * 180 / Math.PI;
            this.countDirection();

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
            if (buttonY > this._touchArea.height)
                buttonY = this._touchArea.height;

            this._button.x = buttonX;
            this._button.y = buttonY;

            this.dispatchEventWith(JoystickInner.JoystickMoving, false, this.degree);
        }
    }
}
