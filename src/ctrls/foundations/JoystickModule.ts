
class JoystickModule extends egret.EventDispatcher {
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
    private _tweener: egret.Tween;
    private _curPos: egret.Point;
    
    public static JoystickMoving: string = "JoystickMoving";
    public static JoystickUp: string = "JoystickUp";
    /** Max distance between button and center in visual */
    public radius: number;
    /** When touchStart trigger, if beyond this value then move immediately else move center only */
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
        
        this._curPos = new egret.Point();

        this._center.setXY(this._InitX, this._InitY);
        this._button.selected = false;
        this._touchArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchDown,this);
    }

    public Trigger(evt: egret.TouchEvent): void {
        this.onTouchDown(evt);
    }

    private onTouchDown(evt: egret.TouchEvent) {
        if(this.touchId == -1)//First touch
        {
            this.touchId = evt.touchPointID;

            if(this._tweener != null) {
                this._tweener.setPaused(true);
                this._tweener = null;
            }
            this.view.globalToLocal(evt.stageX,evt.stageY,this._curPos);
            var bx: number = this._curPos.x;
            var by: number = this._curPos.y;
            this._button.selected = true;

            if(bx < 0)
                bx = 0;
            else if(bx > this._touchArea.width)
                bx = this._touchArea.width;

            if(by > fairygui.GRoot.inst.height)
                by = fairygui.GRoot.inst.height;
            else if(by < this._touchArea.y)
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
            var degree: number = Math.atan2(deltaY,deltaX) * 180 / Math.PI;
            this._thumb.rotation = degree + 90;

            fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.OnTouchMove,this);
            fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_END,this.OnTouchUp,this);
            if (MathUtil.distance(bx, by, this._InitX, this._InitY) > this.radiiDoMovingWhenStart) {
                 this.dispatchEventWith(JoystickModule.JoystickMoving,false,degree);
            }
        }
    }

    private OnTouchUp(evt: egret.TouchEvent): void {
        if(this.touchId != -1 && evt.touchPointID == this.touchId) {
            this.touchId = -1;
            this._thumb.rotation = this._thumb.rotation + 180;
            this._center.visible = false;
            this._tweener = egret.Tween.get(this._button)
                .to({ x: this._InitX - this._button.width / 2,y: this._InitY - this._button.height / 2 },
                    300,egret.Ease.circOut)
                .call(function(): void {
                    this._tweener = null;
                    this._button.selected = false;
                    this._thumb.rotation = 0;
                    this._center.visible = true;
                    this._center.x = this._InitX - this._center.width / 2;
                    this._center.y = this._InitY - this._center.height / 2;
                },this);

            fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.OnTouchMove,this);
            fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_END,this.OnTouchUp,this);

            this.dispatchEventWith(JoystickModule.JoystickUp,false);
        }
    }

    private OnTouchMove(evt: egret.TouchEvent): void {
        if(this.touchId != -1 && evt.touchPointID == this.touchId) {
            var bx: number = evt.stageX / fairygui.GRoot.contentScaleFactor;
            var by: number = evt.stageY / fairygui.GRoot.contentScaleFactor;
            var moveX: number = bx - this._lastStageX;
            var moveY: number = by - this._lastStageY;
            this._lastStageX = bx;
            this._lastStageY = by;
            var buttonX: number = this._button.x + moveX;
            var buttonY: number = this._button.y + moveY;

            var offsetX: number = buttonX + this._button.width / 2 - this._startStageX;
            var offsetY: number = buttonY + this._button.height / 2 - this._startStageY;

            var rad: number = Math.atan2(offsetY,offsetX);
            var degree: number = rad * 180 / Math.PI;
            this._thumb.rotation = degree + 90;

            var maxX: number = this.radius * Math.cos(rad);
            var maxY: number = this.radius * Math.sin(rad);
            if(Math.abs(offsetX) > Math.abs(maxX))
                offsetX = maxX;
            if(Math.abs(offsetY) > Math.abs(maxY))
                offsetY = maxY;

            buttonX = this._startStageX + offsetX;
            buttonY = this._startStageY + offsetY;
            if(buttonX < 0)
                buttonX = 0;
            if(buttonY > fairygui.GRoot.inst.height)
                buttonY = fairygui.GRoot.inst.height;

            this._button.x = buttonX - this._button.width / 2;
            this._button.y = buttonY - this._button.height / 2;

            this.dispatchEventWith(JoystickModule.JoystickMoving,false,degree);
        }
    }
}
