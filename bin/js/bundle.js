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
var GComponent = fairygui.GComponent;
var Handler = laya.utils.Handler;
var Loader = laya.net.Loader;
var BattleConst = /** @class */ (function () {
    function BattleConst() {
        this.modelFrameRate = 10;
        this.modelFrameMs = Math.round(1000 / this.modelFrameRate);
    }
    BattleConst.inst = new BattleConst();
    return BattleConst;
}());
var BattleModel = /** @class */ (function () {
    function BattleModel() {
        this.partialAdd = new BattleModelPartialAdd(this);
        this.partialOnFrame = new BattleModelPartialOnFrame(this);
        //--
        this.dirty = false;
    }
    //
    BattleModel.prototype.init = function () {
        this.currFrame = 0;
        this.tanks = {};
    };
    BattleModel.prototype.clearFrame = function () {
        this.dirty = false;
    };
    return BattleModel;
}());
/**
 * 为BattleModel添加新物品的方法集合
 */
var BattleModelPartialAdd = /** @class */ (function () {
    function BattleModelPartialAdd(owner) {
        this.owner = owner;
    }
    BattleModelPartialAdd.prototype.addTank = function (vo) {
        if (this.owner.tanks[vo.id] != undefined) {
            console.log("[fatal]", "tankVo.id is exist!", vo);
        }
        else {
            this.owner.tanks[vo.id] = vo;
        }
    };
    return BattleModelPartialAdd;
}());
var BattleModelPartialOnFrame = /** @class */ (function () {
    function BattleModelPartialOnFrame(owner) {
        this.owner = owner;
    }
    /**
     * onFrame
     */
    BattleModelPartialOnFrame.prototype.onFrame = function () {
        this.owner.currFrame++;
        this.onFrame_inCmd();
        this.onFrame_hitTest(); //因为被hit后的物品是不能在做后面动作了
        this.onFrame_generate();
        this.onFrame_fire();
        this.onFrame_move(); //move放最后,因为需要view在这一帧移动到xy,然后下一帧再处理hit等事项
    };
    BattleModelPartialOnFrame.prototype.onFrame_inCmd = function () {
    };
    BattleModelPartialOnFrame.prototype.onFrame_generate = function () {
    };
    BattleModelPartialOnFrame.prototype.onFrame_fire = function () {
    };
    BattleModelPartialOnFrame.prototype.onFrame_hitTest = function () {
    };
    /**
     * onFrame_move
     */
    BattleModelPartialOnFrame.prototype.onFrame_move = function () {
    };
    return BattleModelPartialOnFrame;
}());
var BattleUtil = /** @class */ (function () {
    function BattleUtil() {
    }
    /** 是否水平方向 */
    BattleUtil.isHorizontalDirection4 = function (dir) {
        return dir == Direction4.Right || dir == Direction4.Left;
    };
    /** 是否垂直方向 */
    BattleUtil.isVerticalDirection4 = function (dir) {
        return dir == Direction4.Down || dir == Direction4.Up;
    };
    return BattleUtil;
}());
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
var ModelFacade = /** @class */ (function () {
    function ModelFacade() {
        console.log("[debug]", "ModelFacade constructor");
        this.timeMgr = new TimeMgr();
        this.netMgr = new NetMgr();
        this.netMgr.init();
    }
    return ModelFacade;
}());
var CtrlFacade = /** @class */ (function (_super) {
    __extends(CtrlFacade, _super);
    function CtrlFacade() {
        return _super.call(this) || this;
    }
    return CtrlFacade;
}(ModelFacade));
var CtrlBase = /** @class */ (function () {
    function CtrlBase(view) {
        this.z_view = view;
    }
    CtrlBase.prototype.init = function () {
    };
    CtrlBase.prototype.open = function () {
    };
    CtrlBase.prototype.close = function () {
    };
    CtrlBase.prototype.dispose = function () {
        if (this.z_view != null) {
            this.z_view.dispose();
            this.z_view = null;
        }
    };
    return CtrlBase;
}());
var BattleCtrl = /** @class */ (function (_super) {
    __extends(BattleCtrl, _super);
    function BattleCtrl(view) {
        var _this = _super.call(this, view) || this;
        _this.partialOnFrame = new BattleCtrlPartialOnFrame(_this);
        _this.view = view;
        return _this;
    }
    Object.defineProperty(BattleCtrl.prototype, "model", {
        /**
         * battle model
         */
        get: function () {
            return this.proxy.model;
        },
        enumerable: true,
        configurable: true
    });
    BattleCtrl.prototype.dispose = function () {
        if (this.view != null) {
            this.view.dispose();
            this.view = null;
        }
        _super.prototype.dispose.call(this);
    };
    BattleCtrl.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        //
        this.proxy = new BattleProxy();
        this.proxy.facade = this.facade;
        this.proxy.init();
        //
        this.initUI();
        setInterval(function () { return _this.partialOnFrame.onFrame_model(); }, BattleConst.inst.modelFrameMs);
        setInterval(function () { return _this.partialOnFrame.onFrame_view(); }, GameConst.inst.viewFrameMs);
        //
        this.partialOnFrame.AddTank();
    };
    BattleCtrl.prototype.initUI = function () {
        this.facade.ctrlMgr.addCtrl(CtrlId.Joysick, this.joystick = new JoystickCtrl(this.view.m_joysick));
    };
    return BattleCtrl;
}(CtrlBase));
var TankCtrl = /** @class */ (function (_super) {
    __extends(TankCtrl, _super);
    function TankCtrl() {
        var _this = this;
        var view = fuis.battles.UI_Tank.createInstance();
        _this = _super.call(this, view) || this;
        _this.view = view;
        _this.view.setXY(300, 500);
        _this.view.rotation = 180;
        return _this;
        //
        // this.view.m_icon.filters = [new egret.BlurFilter(12,12)];
        /* var cm: fairygui.utils.ColorMatrix = new fairygui.ColorMatrix();
         // let arr:number[] = [-0.14,1.00,0.94,0.39];
         let arr:number[] = [-0.35,0.95,1.00,-0.26];//红色
         cm.adjustBrightness(arr[0]);
         cm.adjustContrast(arr[1]);
         cm.adjustSaturation(arr[2]);
         cm.adjustHue(arr[3]);
         var cf: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(cm.matrix);
         this.view.m_icon.filters = [cf];*/
    }
    TankCtrl.prototype.dispose = function () {
        if (this.view != null) {
            this.view.dispose();
            this.view = null;
        }
        _super.prototype.dispose.call(this);
    };
    TankCtrl.prototype.init = function () {
        _super.prototype.init.call(this);
        // this.view.m_icon.color = "0x00FF00";
        // this.view.m_icon.color = 0x00FFFF;
    };
    return TankCtrl;
}(CtrlBase));
var JoystickCtrl = /** @class */ (function (_super) {
    __extends(JoystickCtrl, _super);
    function JoystickCtrl(view) {
        var _this = _super.call(this, view) || this;
        _this.view = view;
        return _this;
    }
    JoystickCtrl.prototype.dispose = function () {
        if (this.view != null) {
            this.view.dispose();
            this.view = null;
        }
        _super.prototype.dispose.call(this);
    };
    JoystickCtrl.prototype.init = function () {
        _super.prototype.init.call(this);
        fairygui.GRoot.inst.addChild(this.view);
        this.txtLog = this.view.getChild("n9").asTextField;
        this.module = new JoystickModule(this.view);
        // this.module.addEventListener(JoystickModule.JoystickMoving,this.onJoystickMoving,this);
        // this.module.addEventListener(JoystickModule.JoystickUp,this.onJoystickUp,this);
        this.module.on(JoystickModule.JoystickMoving, this, this.onJoystickMoving);
        this.module.on(JoystickModule.JoystickUp, this, this.onJoystickUp);
        //
        // this.txtLog.visible = false;
        this.view.m_joystick_dir.visible = false;
    };
    JoystickCtrl.prototype.onJoystickMoving = function (val) {
        // this.txtLog.text = "" + evt.data;
        val = MathUtil.repeatDegree(val);
        val = Math.round(val / 90) + 1;
        if (val >= 5) {
            val = 1;
        }
        this.view.m_joystick_dir.visible = true;
        this.view.m_joystick_dir.rotation = (val - 1) * 90;
        this.view.m_joystick_dir.setXY(this.view.m_joystick_center.x, this.view.m_joystick_center.y);
        var dir = val;
        // this.txtLog.text = "" + evt.data + " dir:"+dir.toString();
    };
    JoystickCtrl.prototype.onJoystickUp = function () {
        this.txtLog.text = "";
        this.view.m_joystick_dir.visible = false;
    };
    return JoystickCtrl;
}(CtrlBase));
var BattleCtrlPartialOnFrame = /** @class */ (function () {
    function BattleCtrlPartialOnFrame(owner) {
        this.owner = owner;
    }
    BattleCtrlPartialOnFrame.prototype.onFrame_model = function () {
        // let date:Date = new Date();
        // console.log("[debug]",date.getTime
        this.owner.proxy.onFrame();
    };
    BattleCtrlPartialOnFrame.prototype.onFrame_view = function () {
        if (this.owner.model.dirty) {
            //说明执行过proxy.onFrame,需要根据model的数据做处理
            this.owner.proxy.clearFrame();
        }
        //更新自身动画
    };
    BattleCtrlPartialOnFrame.prototype.AddTank = function () {
        var tank = new TankCtrl();
        this.owner.view.addChild(tank.view);
    };
    return BattleCtrlPartialOnFrame;
}());
var CtrlId;
(function (CtrlId) {
    CtrlId[CtrlId["Battle"] = 20001] = "Battle";
    CtrlId[CtrlId["Joysick"] = 20002] = "Joysick";
})(CtrlId || (CtrlId = {}));
/*
* name;
*/
var libAdapter;
(function (libAdapter) {
    var EventDispatcher = /** @class */ (function (_super) {
        __extends(EventDispatcher, _super);
        function EventDispatcher() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDispatcher;
    }(laya.events.EventDispatcher));
    libAdapter.EventDispatcher = EventDispatcher;
})(libAdapter || (libAdapter = {}));
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
/**
 * 4方向
 */
var Direction4;
(function (Direction4) {
    Direction4[Direction4["None"] = 0] = "None";
    Direction4[Direction4["Up"] = 1] = "Up";
    Direction4[Direction4["Down"] = 2] = "Down";
    Direction4[Direction4["Left"] = 3] = "Left";
    Direction4[Direction4["Right"] = 4] = "Right";
})(Direction4 || (Direction4 = {}));
var CtrlContext = /** @class */ (function () {
    function CtrlContext() {
    }
    return CtrlContext;
}());
var CtrlMgr = /** @class */ (function () {
    function CtrlMgr() {
        // public sceneLayer:fairygui.GComponent; 
        this.ctrlCache = {};
    }
    CtrlMgr.prototype.addCtrl = function (id, ctrl) {
        if (this.ctrlCache[id.toFixed()] != undefined) {
            console.log("[fatal]", "ctrlBase(id=" + id + ") is exist!");
            return;
        }
        this.ctrlCache[id.toFixed()] = ctrl;
        if (ctrl.z_view != null) {
            this.rootLayer.addChild(ctrl.z_view);
        }
        ctrl.facade = this.facade;
        switch (id) {
            case CtrlId.Battle:
                this.facade.battle = ctrl;
                break;
        }
        ctrl.init();
        return ctrl;
    };
    CtrlMgr.prototype.getCtrl = function (id) {
        if (this.ctrlCache[id.toFixed()] != undefined) {
            return this.ctrlCache[id];
        }
        else {
            return null;
        }
    };
    return CtrlMgr;
}());
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Vector2.prototype, "magnitude", {
        /**
         * Returns the length of this vector (Read Only).
         * The length of the vector is square root of (x*x+y*y).
         * If you only need to compare magnitudes of some vectors, you can compare squared magnitudes of them using sqrMagnitude (computing squared magnitudes is faster).
         */
        get: function () {
            return MathUtil.magnitude(this.x, this.y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "sqrMagnitude", {
        /**
         * Returns the squared length of this vector (Read Only).
         * Calculating the squared magnitude instead of the magnitude is much faster.
         * Often if you are comparing magnitudes of two vectors you can just compare their squared magnitudes.
         */
        get: function () {
            return this.x * this.x + this.y * this.y;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the distance between a and b.
        Vector2.Distance(a,b) is the same as (a-b).magnitude.
     */
    Vector2.distance = function (a, b) {
        return MathUtil.magnitude(b.x - a.x, b.y - a.y);
    };
    return Vector2;
}());
var CallbackCache = /** @class */ (function () {
    function CallbackCache() {
        this.items = [];
    }
    CallbackCache.prototype.addItem = function (key1, key2, data) {
        var item = new CallbackCacheItem();
        item.key1 = key1;
        item.key2 = key2;
        item.data = data;
        this.items.push(item);
    };
    CallbackCache.prototype.getItemByKey12 = function (key1, key2) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key1 == key1 && item.key2 == key2) {
                return item;
            }
        }
        return null;
    };
    CallbackCache.prototype.getItemByKey1 = function (key1) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key1 == key1) {
                return item;
            }
        }
        return null;
    };
    CallbackCache.prototype.getItemByKey2 = function (key2) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key2 == key2) {
                return item;
            }
        }
        return null;
    };
    CallbackCache.prototype.getItemsByKey12 = function (key1, key2) {
        var rs = [];
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key1 == key1 && item.key2 == key2) {
                rs.push(item);
            }
        }
        return rs;
    };
    CallbackCache.prototype.getItemsByKey1 = function (key1) {
        var rs = [];
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key1 == key1) {
                rs.push(item);
            }
        }
        return rs;
    };
    CallbackCache.prototype.getItemsByKey2 = function (key2) {
        var rs = [];
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key2 == key2) {
                rs.push(item);
            }
        }
        return rs;
    };
    CallbackCache.prototype.removeItemsByKey12 = function (key1, key2) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key1 == key1 && item.key2 == key2) {
                this.items.splice(i, 1);
                i--;
            }
        }
    };
    CallbackCache.prototype.removeItemsByKey1 = function (key1) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key1 == key1) {
                this.items.splice(i, 1);
                i--;
            }
        }
    };
    CallbackCache.prototype.removeItemsByKey2 = function (key2) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.key2 == key2) {
                this.items.splice(i, 1);
                i--;
            }
        }
    };
    return CallbackCache;
}());
var CallbackCacheItem = /** @class */ (function () {
    function CallbackCacheItem() {
    }
    return CallbackCacheItem;
}());
var MathUtil = /** @class */ (function () {
    function MathUtil() {
    }
    /**
     * 循环数值t,min到max之间。t值永远不会大于等于max的值,也永远不会小于0
     * e.g. repeat(370,0,360)=>10; repeat(-90,0,360)=>270;  repeat(752,0,360)=>32;
     */
    MathUtil.repeat = function (val, min, max) {
        var diff = max - min;
        while (val >= max) {
            val -= diff;
        }
        while (val < min) {
            val += diff;
        }
        return val;
    };
    MathUtil.repeatDegree = function (val) {
        return MathUtil.repeat(val, 0, 360);
    };
    /**
     * 限制value的值在min和max之间， 如果value小于min，返回min。 如果value大于max，返回max，否则返回value
     * e.g. clamp(-3,0,10)=>0; clamp(30,0,12)=>12;  clamp(20,0,42)=>20;
     */
    MathUtil.clamp = function (val, min, max) {
        if (val > max) {
            return max;
        }
        if (val < min) {
            return min;
        }
        return val;
    };
    MathUtil.magnitude = function (diffX, diffY) {
        return Math.sqrt(diffX * diffX + diffY * diffY);
    };
    MathUtil.distance = function (ax, ay, bx, by) {
        return MathUtil.magnitude(bx - ax, by - ay);
    };
    return MathUtil;
}());
var TimeMgr = /** @class */ (function () {
    function TimeMgr() {
        var _this = this;
        this.startTime = Date.now();
        // setInterval(()=>this.onFrame(),1);
        setInterval(function () { return _this.onFrame(); }, GameConst.inst.viewFrameMs);
    }
    TimeMgr.prototype.onFrame = function () {
        this.time = Date.now() - this.startTime;
    };
    return TimeMgr;
}());
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var fuis;
(function (fuis) {
    var joysticks;
    (function (joysticks) {
        var UI_JoystickMain = /** @class */ (function (_super) {
            __extends(UI_JoystickMain, _super);
            function UI_JoystickMain() {
                return _super.call(this) || this;
            }
            UI_JoystickMain.createInstance = function () {
                return (fairygui.UIPackage.createObject("joysticks", "JoystickMain"));
            };
            UI_JoystickMain.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_joystick_dir = (this.getChildAt(0));
                this.m_joystick_center = (this.getChildAt(1));
                this.m_joystick = (this.getChildAt(2));
                this.m_joystick_touch = (this.getChildAt(3));
                this.m_n9 = (this.getChildAt(4));
            };
            UI_JoystickMain.URL = "ui://rbw1tvvviitt1";
            return UI_JoystickMain;
        }(fairygui.GComponent));
        joysticks.UI_JoystickMain = UI_JoystickMain;
    })(joysticks = fuis.joysticks || (fuis.joysticks = {}));
})(fuis || (fuis = {}));
var GameConst = /** @class */ (function () {
    function GameConst() {
        this.viewFrameRate = 30;
        this.viewFrameMs = Math.round(1000 / this.viewFrameRate);
    }
    GameConst.inst = new GameConst();
    return GameConst;
}());
var NetMgr = /** @class */ (function () {
    function NetMgr() {
        this.fake = new ServiceMgr();
    }
    NetMgr.prototype.init = function () {
        this.fake.netMgr = this;
        this.fake.init();
    };
    NetMgr.prototype.req = function (cmd, req, callback, resClass) {
        if (callback === void 0) { callback = null; }
        if (resClass === void 0) { resClass = null; }
        console.log("[debug]", "send", cmd);
        this.fake.req(cmd, req);
    };
    NetMgr.prototype.res = function (cmd, res) {
        if (res === void 0) { res = null; }
        console.log("[debug]", "receive", cmd);
    };
    return NetMgr;
}());
var libAdapter;
(function (libAdapter) {
    var Util = /** @class */ (function () {
        function Util() {
        }
        Util.addEvent = function (target, event, owner, callback) {
        };
        return Util;
    }());
    libAdapter.Util = Util;
})(libAdapter || (libAdapter = {}));
var BattleProxy = /** @class */ (function () {
    function BattleProxy() {
    }
    BattleProxy.prototype.init = function () {
        this.model = new BattleModel();
        this.model.facade = this.facade;
        this.model.init();
        // let tank:TankVo = new TankVo();
        // tank.id = 1001;
        // this.model.partialAdd.addTank(tank);
        //
        this.facade.netMgr.req(123, null);
    };
    BattleProxy.prototype.onFrame = function () {
        this.model.partialOnFrame.onFrame();
    };
    BattleProxy.prototype.clearFrame = function () {
        this.model.clearFrame();
    };
    return BattleProxy;
}());
/*
* name;
*/
var BattleService = /** @class */ (function () {
    function BattleService() {
    }
    BattleService.prototype.init = function () {
        this.mgr.add(123, this, this.req);
    };
    BattleService.prototype.req = function (cmd, req) {
        this.mgr.res(cmd, null);
    };
    return BattleService;
}());
var ServiceMgr = /** @class */ (function () {
    function ServiceMgr() {
        this.callbackCache = new CallbackCache();
    }
    ServiceMgr.prototype.add = function (cmd, owner, callback) {
        this.callbackCache.addItem(cmd, owner, callback);
    };
    ServiceMgr.prototype.req = function (cmd, req) {
        var item = this.callbackCache.getItemByKey1(cmd);
        if (item == null) {
            console.log("[warn]", this, "No add cmd");
        }
        else {
            item.data.call(item.key2, cmd, req);
        }
    };
    ServiceMgr.prototype.res = function (cmd, res) {
        this.netMgr.res(cmd, res);
    };
    ServiceMgr.prototype.init = function () {
        this.battle = new BattleService();
        this.battle.mgr = this;
        this.battle.init();
    };
    return ServiceMgr;
}());
var tests;
(function (tests) {
    var TestProtobuf = /** @class */ (function () {
        function TestProtobuf() {
            this.ProtoBuf = Laya.Browser.window.protobuf;
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
        TestProtobuf.prototype.testProtobuf_proto = function () {
            this.ProtoBuf.load("pb/pb.proto", this.onAssetsLoaded);
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
})(tests || (tests = {}));
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\frameworks\environments\Imports.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\csCommons\battles\BattleConst.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\csCommons\battles\BattleModel.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\csCommons\battles\BattleModelPartialAdd.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\csCommons\battles\BattleModelPartialOnFrame.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\csCommons\battles\BattleUtil.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\csCommons\battles\BattleVos.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\csCommons\ModelFacade.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\ctrls\CtrlFacade.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\frameworks\ctrlMgrs\CtrlBase.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\ctrls\battles\BattleCtrl.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\ctrls\battles\TankCtrl.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\ctrls\foundations\JoystickCtrl.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\ctrls\battles\BattleCtrlPartialOnFrame.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\ctrls\CtrlId.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\libAdapters\LibAdapterEventDispatcher.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\ctrls\foundations\JoystickModule.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\frameworks\consts\Direction4.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\frameworks\ctrlMgrs\CtrlContext.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\frameworks\ctrlMgrs\CtrlMgr.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\frameworks\interfaces\IDispose.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\frameworks\structs\Vector2.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\frameworks\utils\CallbackCache.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\frameworks\utils\MathUtil.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\frameworks\utils\TimeMgr.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\fuis\joysticks\UI_JoystickMain.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\games\consts\GameConst.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\games\nets\NetMgr.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\libAdapters\libAdapter.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\models\battles\BattleProxy.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\services\BattleService.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\services\ServiceMgr.ts" />
/// <reference path="C:\fox\H5\projects\TankBattle\Laya\src\tests\TestProtobuf.ts" /> 
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(600, 900, Laya.WebGL);
        // laya.utils.Stat.show(0, 0);
        //设置适配模式
        // Laya.stage.scaleMode = "showall";
        // Laya.stage.scaleMode = "noscale";
        Laya.stage.scaleMode = "full"; //可以侦听stage resize
        Laya.stage.alignH = "left";
        Laya.stage.alignV = "top";
        //设置横竖屏
        // Laya.stage.screenMode = "horizontal";
        Laya.stage.screenMode = "vertical";
        // Laya.stage.screenMode = "none";
        Laya.loader.load([
            { url: "res/fuis/joysticks@atlas0.png", type: Loader.IMAGE },
            { url: "res/fuis/joysticks.fui", type: Loader.BUFFER },
            { url: "res/fuis/battles@atlas0.png", type: Loader.IMAGE },
            { url: "res/fuis/battles.fui", type: Loader.BUFFER }
        ], Handler.create(this, this.onLoaded));
    }
    GameMain.prototype.onLoaded = function () {
        fairygui.UIPackage.addPackage("res/fuis/joysticks");
        fairygui.UIPackage.addPackage("res/fuis/battles");
        fuis.joysticks.joysticksBinder.bindAll();
        fuis.battles.battlesBinder.bindAll();
        /*
        fairygui.UIConfig.defaultFont = "宋体";
        */
        //--init facade
        Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
        var facade = new CtrlFacade();
        facade.ctrlMgr = new CtrlMgr();
        facade.ctrlMgr.facade = facade;
        facade.ctrlMgr.rootLayer = fairygui.GRoot.inst;
        //
        CtrlFacade.inst = ModelFacade.inst = facade;
        //--do my things
        var battle = new BattleCtrl(fuis.battles.UI_Battle.createInstance());
        facade.ctrlMgr.addCtrl(CtrlId.Battle, battle);
        console.log("[debug]", "StageWH:", Laya.stage.width, Laya.stage.height);
        battle.view.setSize(Laya.stage.width, Laya.stage.height);
        Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
    };
    GameMain.prototype.onResize = function () {
        console.log("[debug]", "OnResize StageWH:", Laya.stage.width, Laya.stage.height);
    };
    return GameMain;
}());
new GameMain();
new tests.TestProtobuf();
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var fuis;
(function (fuis) {
    var battles;
    (function (battles) {
        var battlesBinder = /** @class */ (function () {
            function battlesBinder() {
            }
            battlesBinder.bindAll = function () {
                fairygui.UIObjectFactory.setPackageItemExtension(battles.UI_Battle.URL, battles.UI_Battle);
                fairygui.UIObjectFactory.setPackageItemExtension(battles.UI_ContentLayer.URL, battles.UI_ContentLayer);
                fairygui.UIObjectFactory.setPackageItemExtension(battles.UI_Tank.URL, battles.UI_Tank);
                fairygui.UIObjectFactory.setPackageItemExtension(battles.UI_MapCell.URL, battles.UI_MapCell);
            };
            return battlesBinder;
        }());
        battles.battlesBinder = battlesBinder;
    })(battles = fuis.battles || (fuis.battles = {}));
})(fuis || (fuis = {}));
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var fuis;
(function (fuis) {
    var battles;
    (function (battles) {
        var UI_Battle = /** @class */ (function (_super) {
            __extends(UI_Battle, _super);
            function UI_Battle() {
                return _super.call(this) || this;
            }
            UI_Battle.createInstance = function () {
                return (fairygui.UIPackage.createObject("battles", "Battle"));
            };
            UI_Battle.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_bg = (this.getChildAt(0));
                this.m_contentLayer = (this.getChildAt(1));
                this.m_joysick = (this.getChildAt(2));
            };
            UI_Battle.URL = "ui://ybsps8tfqitl0";
            return UI_Battle;
        }(fairygui.GComponent));
        battles.UI_Battle = UI_Battle;
    })(battles = fuis.battles || (fuis.battles = {}));
})(fuis || (fuis = {}));
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var fuis;
(function (fuis) {
    var battles;
    (function (battles) {
        var UI_ContentLayer = /** @class */ (function (_super) {
            __extends(UI_ContentLayer, _super);
            function UI_ContentLayer() {
                return _super.call(this) || this;
            }
            UI_ContentLayer.createInstance = function () {
                return (fairygui.UIPackage.createObject("battles", "ContentLayer"));
            };
            UI_ContentLayer.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_bg = (this.getChildAt(0));
            };
            UI_ContentLayer.URL = "ui://ybsps8tfqitl1";
            return UI_ContentLayer;
        }(fairygui.GComponent));
        battles.UI_ContentLayer = UI_ContentLayer;
    })(battles = fuis.battles || (fuis.battles = {}));
})(fuis || (fuis = {}));
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var fuis;
(function (fuis) {
    var battles;
    (function (battles) {
        var UI_MapCell = /** @class */ (function (_super) {
            __extends(UI_MapCell, _super);
            function UI_MapCell() {
                return _super.call(this) || this;
            }
            UI_MapCell.createInstance = function () {
                return (fairygui.UIPackage.createObject("battles", "MapCell"));
            };
            UI_MapCell.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_icon = (this.getChildAt(0));
            };
            UI_MapCell.URL = "ui://ybsps8tfu9boc";
            return UI_MapCell;
        }(fairygui.GComponent));
        battles.UI_MapCell = UI_MapCell;
    })(battles = fuis.battles || (fuis.battles = {}));
})(fuis || (fuis = {}));
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var fuis;
(function (fuis) {
    var battles;
    (function (battles) {
        var UI_Tank = /** @class */ (function (_super) {
            __extends(UI_Tank, _super);
            function UI_Tank() {
                return _super.call(this) || this;
            }
            UI_Tank.createInstance = function () {
                return (fairygui.UIPackage.createObject("battles", "Tank"));
            };
            UI_Tank.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_icon = (this.getChildAt(0));
            };
            UI_Tank.URL = "ui://ybsps8tfu9bo3";
            return UI_Tank;
        }(fairygui.GComponent));
        battles.UI_Tank = UI_Tank;
    })(battles = fuis.battles || (fuis.battles = {}));
})(fuis || (fuis = {}));
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var fuis;
(function (fuis) {
    var catchFishes;
    (function (catchFishes) {
        var catchFishesBinder = /** @class */ (function () {
            function catchFishesBinder() {
            }
            catchFishesBinder.bindAll = function () {
                fairygui.UIObjectFactory.setPackageItemExtension(catchFishes.UI_ViewA.URL, catchFishes.UI_ViewA);
                fairygui.UIObjectFactory.setPackageItemExtension(catchFishes.UI_ButtonA.URL, catchFishes.UI_ButtonA);
                fairygui.UIObjectFactory.setPackageItemExtension(catchFishes.UI_FishA.URL, catchFishes.UI_FishA);
                fairygui.UIObjectFactory.setPackageItemExtension(catchFishes.UI_BulletA.URL, catchFishes.UI_BulletA);
            };
            return catchFishesBinder;
        }());
        catchFishes.catchFishesBinder = catchFishesBinder;
    })(catchFishes = fuis.catchFishes || (fuis.catchFishes = {}));
})(fuis || (fuis = {}));
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var fuis;
(function (fuis) {
    var catchFishes;
    (function (catchFishes) {
        var UI_BulletA = /** @class */ (function (_super) {
            __extends(UI_BulletA, _super);
            function UI_BulletA() {
                return _super.call(this) || this;
            }
            UI_BulletA.createInstance = function () {
                return (fairygui.UIPackage.createObject("catchFishes", "BulletA"));
            };
            UI_BulletA.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_n0 = (this.getChildAt(0));
            };
            UI_BulletA.URL = "ui://x2dkl1uftm116";
            return UI_BulletA;
        }(fairygui.GComponent));
        catchFishes.UI_BulletA = UI_BulletA;
    })(catchFishes = fuis.catchFishes || (fuis.catchFishes = {}));
})(fuis || (fuis = {}));
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var fuis;
(function (fuis) {
    var catchFishes;
    (function (catchFishes) {
        var UI_ButtonA = /** @class */ (function (_super) {
            __extends(UI_ButtonA, _super);
            function UI_ButtonA() {
                return _super.call(this) || this;
            }
            UI_ButtonA.createInstance = function () {
                return (fairygui.UIPackage.createObject("catchFishes", "ButtonA"));
            };
            UI_ButtonA.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_button = this.getControllerAt(0);
                this.m_icon = (this.getChildAt(0));
                this.m_title = (this.getChildAt(1));
            };
            UI_ButtonA.URL = "ui://x2dkl1ufhmf22";
            return UI_ButtonA;
        }(fairygui.GButton));
        catchFishes.UI_ButtonA = UI_ButtonA;
    })(catchFishes = fuis.catchFishes || (fuis.catchFishes = {}));
})(fuis || (fuis = {}));
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var fuis;
(function (fuis) {
    var catchFishes;
    (function (catchFishes) {
        var UI_FishA = /** @class */ (function (_super) {
            __extends(UI_FishA, _super);
            function UI_FishA() {
                return _super.call(this) || this;
            }
            UI_FishA.createInstance = function () {
                return (fairygui.UIPackage.createObject("catchFishes", "FishA"));
            };
            UI_FishA.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_n0 = (this.getChildAt(0));
                this.m_hit = this.getTransitionAt(0);
            };
            UI_FishA.URL = "ui://x2dkl1uftm115";
            return UI_FishA;
        }(fairygui.GComponent));
        catchFishes.UI_FishA = UI_FishA;
    })(catchFishes = fuis.catchFishes || (fuis.catchFishes = {}));
})(fuis || (fuis = {}));
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var fuis;
(function (fuis) {
    var catchFishes;
    (function (catchFishes) {
        var UI_ViewA = /** @class */ (function (_super) {
            __extends(UI_ViewA, _super);
            function UI_ViewA() {
                return _super.call(this) || this;
            }
            UI_ViewA.createInstance = function () {
                return (fairygui.UIPackage.createObject("catchFishes", "ViewA"));
            };
            UI_ViewA.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_c1 = this.getControllerAt(0);
                this.m_fishA = (this.getChildAt(0));
                this.m_btnA = (this.getChildAt(1));
                this.m_txtA = (this.getChildAt(2));
            };
            UI_ViewA.URL = "ui://x2dkl1ufhmf20";
            return UI_ViewA;
        }(fairygui.GComponent));
        catchFishes.UI_ViewA = UI_ViewA;
    })(catchFishes = fuis.catchFishes || (fuis.catchFishes = {}));
})(fuis || (fuis = {}));
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var fuis;
(function (fuis) {
    var joysticks;
    (function (joysticks) {
        var joysticksBinder = /** @class */ (function () {
            function joysticksBinder() {
            }
            joysticksBinder.bindAll = function () {
                fairygui.UIObjectFactory.setPackageItemExtension(joysticks.UI_JoystickMain.URL, joysticks.UI_JoystickMain);
                fairygui.UIObjectFactory.setPackageItemExtension(joysticks.UI_circle.URL, joysticks.UI_circle);
            };
            return joysticksBinder;
        }());
        joysticks.joysticksBinder = joysticksBinder;
    })(joysticks = fuis.joysticks || (fuis.joysticks = {}));
})(fuis || (fuis = {}));
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var fuis;
(function (fuis) {
    var joysticks;
    (function (joysticks) {
        var UI_circle = /** @class */ (function (_super) {
            __extends(UI_circle, _super);
            function UI_circle() {
                return _super.call(this) || this;
            }
            UI_circle.createInstance = function () {
                return (fairygui.UIPackage.createObject("joysticks", "circle"));
            };
            UI_circle.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.m_button = this.getControllerAt(0);
                this.m_thumb = (this.getChildAt(0));
            };
            UI_circle.URL = "ui://rbw1tvvvq9do18";
            return UI_circle;
        }(fairygui.GButton));
        joysticks.UI_circle = UI_circle;
    })(joysticks = fuis.joysticks || (fuis.joysticks = {}));
})(fuis || (fuis = {}));
//# sourceMappingURL=bundle.js.map