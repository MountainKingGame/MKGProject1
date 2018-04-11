/**
 * Entitas Generated Extensions for arpg
 *
 * do not edit this file
 */
(function(){
  "use strict";
  var Bag = entitas.utils.Bag;
  var Pool = entitas.Pool;
  var Entity = entitas.Entity;
  var Matcher = entitas.Matcher;
  var SingleEntityException = entitas.SingleEntityException;
  var MouseComponent = arpg.MouseComponent;
  var AvatarComponent = arpg.AvatarComponent;
  var PropLv1Component = arpg.PropLv1Component;
  var PositionComponent = arpg.PositionComponent;
  var ForwardComponent = arpg.ForwardComponent;
  var MoveComponent = arpg.MoveComponent;
  var CurrOrderComponent = arpg.CurrOrderComponent;
  var SkillArrComponent = arpg.SkillArrComponent;
  var MeComponent = arpg.MeComponent;
  var MyTeamComponent = arpg.MyTeamComponent;
  var NeutralComponent = arpg.NeutralComponent;
  var EnemyComponent = arpg.EnemyComponent;
  var CoreComponentIds = arpg.CoreComponentIds;
  /** @type {entitas.utils.Bag} */
  Entity._mouseComponentPool = new Bag();
  (function() {
    for (var i=0; i<128; i++) {
      Entity._mouseComponentPool.add(new MouseComponent());
    }
  })();
  Entity.clearMouseComponentPool = function() {
    Entity._mouseComponentPool.clear();
  };
  /** @type {{arpg.MouseComponent} */
  Object.defineProperty(Entity.prototype, 'mouse', {
    get: function() {
      return this.getComponent(CoreComponentIds.Mouse);
    }
  });
  /** @type {boolean} */
  Object.defineProperty(Entity.prototype, 'hasMouse', {
    get: function() {
      return this.hasComponent(CoreComponentIds.Mouse);
    }
  });
  /**
   * @param {boolean} isTrigger
   * @param {number} x
   * @param {number} y
   * @returns {entitas.Entity}
   */
  Entity.prototype.addMouse = function(isTrigger, x, y) {
    var component = Entity._mouseComponentPool.size() > 0 ? Entity._mouseComponentPool.removeLast() : new MouseComponent();
    component.isTrigger = isTrigger;
    component.x = x;
    component.y = y;
    this.addComponent(CoreComponentIds.Mouse, component);
    return this;
  };
  /**
   * @param {boolean} isTrigger
   * @param {number} x
   * @param {number} y
   * @returns {entitas.Entity}
   */
  Entity.prototype.replaceMouse = function(isTrigger, x, y) {
    var previousComponent = this.hasMouse ? this.mouse : null;
    var component = Entity._mouseComponentPool.size() > 0 ? Entity._mouseComponentPool.removeLast() : new MouseComponent();
    component.isTrigger = isTrigger;
    component.x = x;
    component.y = y;
    this.replaceComponent(CoreComponentIds.Mouse, component);
    if (previousComponent != null) {
      Entity._mouseComponentPool.add(previousComponent);
    }
    return this;
  };
  /**
   * @returns {entitas.Entity}
   */
  Entity.prototype.removeMouse = function() {
    var component = this.mouse;
    this.removeComponent(CoreComponentIds.Mouse);
    Entity._mouseComponentPool.add(component);
    return this;
  };
  /** @type {entitas.utils.Bag} */
  Entity._avatarComponentPool = new Bag();
  (function() {
    for (var i=0; i<128; i++) {
      Entity._avatarComponentPool.add(new AvatarComponent());
    }
  })();
  Entity.clearAvatarComponentPool = function() {
    Entity._avatarComponentPool.clear();
  };
  /** @type {{arpg.AvatarComponent} */
  Object.defineProperty(Entity.prototype, 'avatar', {
    get: function() {
      return this.getComponent(CoreComponentIds.Avatar);
    }
  });
  /** @type {boolean} */
  Object.defineProperty(Entity.prototype, 'hasAvatar', {
    get: function() {
      return this.hasComponent(CoreComponentIds.Avatar);
    }
  });
  /**
   * @param {GComponent} ui
   * @returns {entitas.Entity}
   */
  Entity.prototype.addAvatar = function(ui) {
    var component = Entity._avatarComponentPool.size() > 0 ? Entity._avatarComponentPool.removeLast() : new AvatarComponent();
    component.ui = ui;
    this.addComponent(CoreComponentIds.Avatar, component);
    return this;
  };
  /**
   * @param {GComponent} ui
   * @returns {entitas.Entity}
   */
  Entity.prototype.replaceAvatar = function(ui) {
    var previousComponent = this.hasAvatar ? this.avatar : null;
    var component = Entity._avatarComponentPool.size() > 0 ? Entity._avatarComponentPool.removeLast() : new AvatarComponent();
    component.ui = ui;
    this.replaceComponent(CoreComponentIds.Avatar, component);
    if (previousComponent != null) {
      Entity._avatarComponentPool.add(previousComponent);
    }
    return this;
  };
  /**
   * @returns {entitas.Entity}
   */
  Entity.prototype.removeAvatar = function() {
    var component = this.avatar;
    this.removeComponent(CoreComponentIds.Avatar);
    Entity._avatarComponentPool.add(component);
    return this;
  };
  /** @type {entitas.utils.Bag} */
  Entity._propLv1ComponentPool = new Bag();
  (function() {
    for (var i=0; i<128; i++) {
      Entity._propLv1ComponentPool.add(new PropLv1Component());
    }
  })();
  Entity.clearPropLv1ComponentPool = function() {
    Entity._propLv1ComponentPool.clear();
  };
  /** @type {{arpg.PropLv1Component} */
  Object.defineProperty(Entity.prototype, 'propLv1', {
    get: function() {
      return this.getComponent(CoreComponentIds.PropLv1);
    }
  });
  /** @type {boolean} */
  Object.defineProperty(Entity.prototype, 'hasPropLv1', {
    get: function() {
      return this.hasComponent(CoreComponentIds.PropLv1);
    }
  });
  /**
   * @param {number} moveSpeed
   * @param {number} hpMax
   * @param {number} hp
   * @param {number} radii
   * @returns {entitas.Entity}
   */
  Entity.prototype.addPropLv1 = function(moveSpeed, hpMax, hp, radii) {
    var component = Entity._propLv1ComponentPool.size() > 0 ? Entity._propLv1ComponentPool.removeLast() : new PropLv1Component();
    component.moveSpeed = moveSpeed;
    component.hpMax = hpMax;
    component.hp = hp;
    component.radii = radii;
    this.addComponent(CoreComponentIds.PropLv1, component);
    return this;
  };
  /**
   * @param {number} moveSpeed
   * @param {number} hpMax
   * @param {number} hp
   * @param {number} radii
   * @returns {entitas.Entity}
   */
  Entity.prototype.replacePropLv1 = function(moveSpeed, hpMax, hp, radii) {
    var previousComponent = this.hasPropLv1 ? this.propLv1 : null;
    var component = Entity._propLv1ComponentPool.size() > 0 ? Entity._propLv1ComponentPool.removeLast() : new PropLv1Component();
    component.moveSpeed = moveSpeed;
    component.hpMax = hpMax;
    component.hp = hp;
    component.radii = radii;
    this.replaceComponent(CoreComponentIds.PropLv1, component);
    if (previousComponent != null) {
      Entity._propLv1ComponentPool.add(previousComponent);
    }
    return this;
  };
  /**
   * @returns {entitas.Entity}
   */
  Entity.prototype.removePropLv1 = function() {
    var component = this.propLv1;
    this.removeComponent(CoreComponentIds.PropLv1);
    Entity._propLv1ComponentPool.add(component);
    return this;
  };
  /** @type {entitas.utils.Bag} */
  Entity._positionComponentPool = new Bag();
  (function() {
    for (var i=0; i<128; i++) {
      Entity._positionComponentPool.add(new PositionComponent());
    }
  })();
  Entity.clearPositionComponentPool = function() {
    Entity._positionComponentPool.clear();
  };
  /** @type {{arpg.PositionComponent} */
  Object.defineProperty(Entity.prototype, 'position', {
    get: function() {
      return this.getComponent(CoreComponentIds.Position);
    }
  });
  /** @type {boolean} */
  Object.defineProperty(Entity.prototype, 'hasPosition', {
    get: function() {
      return this.hasComponent(CoreComponentIds.Position);
    }
  });
  /**
   * @param {number} x
   * @param {number} y
   * @returns {entitas.Entity}
   */
  Entity.prototype.addPosition = function(x, y) {
    var component = Entity._positionComponentPool.size() > 0 ? Entity._positionComponentPool.removeLast() : new PositionComponent();
    component.x = x;
    component.y = y;
    this.addComponent(CoreComponentIds.Position, component);
    return this;
  };
  /**
   * @param {number} x
   * @param {number} y
   * @returns {entitas.Entity}
   */
  Entity.prototype.replacePosition = function(x, y) {
    var previousComponent = this.hasPosition ? this.position : null;
    var component = Entity._positionComponentPool.size() > 0 ? Entity._positionComponentPool.removeLast() : new PositionComponent();
    component.x = x;
    component.y = y;
    this.replaceComponent(CoreComponentIds.Position, component);
    if (previousComponent != null) {
      Entity._positionComponentPool.add(previousComponent);
    }
    return this;
  };
  /**
   * @returns {entitas.Entity}
   */
  Entity.prototype.removePosition = function() {
    var component = this.position;
    this.removeComponent(CoreComponentIds.Position);
    Entity._positionComponentPool.add(component);
    return this;
  };
  /** @type {entitas.utils.Bag} */
  Entity._forwardComponentPool = new Bag();
  (function() {
    for (var i=0; i<128; i++) {
      Entity._forwardComponentPool.add(new ForwardComponent());
    }
  })();
  Entity.clearForwardComponentPool = function() {
    Entity._forwardComponentPool.clear();
  };
  /** @type {{arpg.ForwardComponent} */
  Object.defineProperty(Entity.prototype, 'forward', {
    get: function() {
      return this.getComponent(CoreComponentIds.Forward);
    }
  });
  /** @type {boolean} */
  Object.defineProperty(Entity.prototype, 'hasForward', {
    get: function() {
      return this.hasComponent(CoreComponentIds.Forward);
    }
  });
  /**
   * @param {number} degree
   * @returns {entitas.Entity}
   */
  Entity.prototype.addForward = function(degree) {
    var component = Entity._forwardComponentPool.size() > 0 ? Entity._forwardComponentPool.removeLast() : new ForwardComponent();
    component.degree = degree;
    this.addComponent(CoreComponentIds.Forward, component);
    return this;
  };
  /**
   * @param {number} degree
   * @returns {entitas.Entity}
   */
  Entity.prototype.replaceForward = function(degree) {
    var previousComponent = this.hasForward ? this.forward : null;
    var component = Entity._forwardComponentPool.size() > 0 ? Entity._forwardComponentPool.removeLast() : new ForwardComponent();
    component.degree = degree;
    this.replaceComponent(CoreComponentIds.Forward, component);
    if (previousComponent != null) {
      Entity._forwardComponentPool.add(previousComponent);
    }
    return this;
  };
  /**
   * @returns {entitas.Entity}
   */
  Entity.prototype.removeForward = function() {
    var component = this.forward;
    this.removeComponent(CoreComponentIds.Forward);
    Entity._forwardComponentPool.add(component);
    return this;
  };
  /** @type {entitas.utils.Bag} */
  Entity._moveComponentPool = new Bag();
  (function() {
    for (var i=0; i<128; i++) {
      Entity._moveComponentPool.add(new MoveComponent());
    }
  })();
  Entity.clearMoveComponentPool = function() {
    Entity._moveComponentPool.clear();
  };
  /** @type {{arpg.MoveComponent} */
  Object.defineProperty(Entity.prototype, 'move', {
    get: function() {
      return this.getComponent(CoreComponentIds.Move);
    }
  });
  /** @type {boolean} */
  Object.defineProperty(Entity.prototype, 'hasMove', {
    get: function() {
      return this.hasComponent(CoreComponentIds.Move);
    }
  });
  /**
   * @param {number} kind
   * @param {IXY} to
   * @param {number} startFrame
   * @param {number} lifeFrame
   * @returns {entitas.Entity}
   */
  Entity.prototype.addMove = function(kind, to, startFrame, lifeFrame) {
    var component = Entity._moveComponentPool.size() > 0 ? Entity._moveComponentPool.removeLast() : new MoveComponent();
    component.kind = kind;
    component.to = to;
    component.startFrame = startFrame;
    component.lifeFrame = lifeFrame;
    this.addComponent(CoreComponentIds.Move, component);
    return this;
  };
  /**
   * @param {number} kind
   * @param {IXY} to
   * @param {number} startFrame
   * @param {number} lifeFrame
   * @returns {entitas.Entity}
   */
  Entity.prototype.replaceMove = function(kind, to, startFrame, lifeFrame) {
    var previousComponent = this.hasMove ? this.move : null;
    var component = Entity._moveComponentPool.size() > 0 ? Entity._moveComponentPool.removeLast() : new MoveComponent();
    component.kind = kind;
    component.to = to;
    component.startFrame = startFrame;
    component.lifeFrame = lifeFrame;
    this.replaceComponent(CoreComponentIds.Move, component);
    if (previousComponent != null) {
      Entity._moveComponentPool.add(previousComponent);
    }
    return this;
  };
  /**
   * @returns {entitas.Entity}
   */
  Entity.prototype.removeMove = function() {
    var component = this.move;
    this.removeComponent(CoreComponentIds.Move);
    Entity._moveComponentPool.add(component);
    return this;
  };
  /** @type {entitas.utils.Bag} */
  Entity._currOrderComponentPool = new Bag();
  (function() {
    for (var i=0; i<128; i++) {
      Entity._currOrderComponentPool.add(new CurrOrderComponent());
    }
  })();
  Entity.clearCurrOrderComponentPool = function() {
    Entity._currOrderComponentPool.clear();
  };
  /** @type {{arpg.CurrOrderComponent} */
  Object.defineProperty(Entity.prototype, 'currOrder', {
    get: function() {
      return this.getComponent(CoreComponentIds.CurrOrder);
    }
  });
  /** @type {boolean} */
  Object.defineProperty(Entity.prototype, 'hasCurrOrder', {
    get: function() {
      return this.hasComponent(CoreComponentIds.CurrOrder);
    }
  });
  /**
   * @param {OrderKind} order
   * @param {boolean} autoAttack
   * @param {ActionTarget} target
   * @returns {entitas.Entity}
   */
  Entity.prototype.addCurrOrder = function(order, autoAttack, target) {
    var component = Entity._currOrderComponentPool.size() > 0 ? Entity._currOrderComponentPool.removeLast() : new CurrOrderComponent();
    component.order = order;
    component.autoAttack = autoAttack;
    component.target = target;
    this.addComponent(CoreComponentIds.CurrOrder, component);
    return this;
  };
  /**
   * @param {OrderKind} order
   * @param {boolean} autoAttack
   * @param {ActionTarget} target
   * @returns {entitas.Entity}
   */
  Entity.prototype.replaceCurrOrder = function(order, autoAttack, target) {
    var previousComponent = this.hasCurrOrder ? this.currOrder : null;
    var component = Entity._currOrderComponentPool.size() > 0 ? Entity._currOrderComponentPool.removeLast() : new CurrOrderComponent();
    component.order = order;
    component.autoAttack = autoAttack;
    component.target = target;
    this.replaceComponent(CoreComponentIds.CurrOrder, component);
    if (previousComponent != null) {
      Entity._currOrderComponentPool.add(previousComponent);
    }
    return this;
  };
  /**
   * @returns {entitas.Entity}
   */
  Entity.prototype.removeCurrOrder = function() {
    var component = this.currOrder;
    this.removeComponent(CoreComponentIds.CurrOrder);
    Entity._currOrderComponentPool.add(component);
    return this;
  };
  /** @type {entitas.utils.Bag} */
  Entity._skillArrComponentPool = new Bag();
  (function() {
    for (var i=0; i<128; i++) {
      Entity._skillArrComponentPool.add(new SkillArrComponent());
    }
  })();
  Entity.clearSkillArrComponentPool = function() {
    Entity._skillArrComponentPool.clear();
  };
  /** @type {{arpg.SkillArrComponent} */
  Object.defineProperty(Entity.prototype, 'skillArr', {
    get: function() {
      return this.getComponent(CoreComponentIds.SkillArr);
    }
  });
  /** @type {boolean} */
  Object.defineProperty(Entity.prototype, 'hasSkillArr', {
    get: function() {
      return this.hasComponent(CoreComponentIds.SkillArr);
    }
  });
  /**
   * @param {SkillStateComponent[]} skillArr
   * @returns {entitas.Entity}
   */
  Entity.prototype.addSkillArr = function(skillArr) {
    var component = Entity._skillArrComponentPool.size() > 0 ? Entity._skillArrComponentPool.removeLast() : new SkillArrComponent();
    component.skillArr = skillArr;
    this.addComponent(CoreComponentIds.SkillArr, component);
    return this;
  };
  /**
   * @param {SkillStateComponent[]} skillArr
   * @returns {entitas.Entity}
   */
  Entity.prototype.replaceSkillArr = function(skillArr) {
    var previousComponent = this.hasSkillArr ? this.skillArr : null;
    var component = Entity._skillArrComponentPool.size() > 0 ? Entity._skillArrComponentPool.removeLast() : new SkillArrComponent();
    component.skillArr = skillArr;
    this.replaceComponent(CoreComponentIds.SkillArr, component);
    if (previousComponent != null) {
      Entity._skillArrComponentPool.add(previousComponent);
    }
    return this;
  };
  /**
   * @returns {entitas.Entity}
   */
  Entity.prototype.removeSkillArr = function() {
    var component = this.skillArr;
    this.removeComponent(CoreComponentIds.SkillArr);
    Entity._skillArrComponentPool.add(component);
    return this;
  };
  /** @type {arpg.MeComponent} */
  Entity.meComponent = new MeComponent();
  /** @type {boolean} */
  Object.defineProperty(Entity.prototype, 'isMe', {
    get: function() {
      return this.hasComponent(CoreComponentIds.Me);
    },
    set: function(value) {
      if (value !== this.isMe) {
        if (value) {
          this.addComponent(CoreComponentIds.Me, Entity.meComponent);
        } else {
          this.removeComponent(CoreComponentIds.Me);
        }
      }
    }
  });
  /**
   * @param {boolean} value
   * @returns {entitas.Entity}
   */
  Entity.prototype.setMe = function(value) {
    this.isMe = value;
    return this;
  };
  /** @type {arpg.MyTeamComponent} */
  Entity.myTeamComponent = new MyTeamComponent();
  /** @type {boolean} */
  Object.defineProperty(Entity.prototype, 'isMyTeam', {
    get: function() {
      return this.hasComponent(CoreComponentIds.MyTeam);
    },
    set: function(value) {
      if (value !== this.isMyTeam) {
        if (value) {
          this.addComponent(CoreComponentIds.MyTeam, Entity.myTeamComponent);
        } else {
          this.removeComponent(CoreComponentIds.MyTeam);
        }
      }
    }
  });
  /**
   * @param {boolean} value
   * @returns {entitas.Entity}
   */
  Entity.prototype.setMyTeam = function(value) {
    this.isMyTeam = value;
    return this;
  };
  /** @type {arpg.NeutralComponent} */
  Entity.neutralComponent = new NeutralComponent();
  /** @type {boolean} */
  Object.defineProperty(Entity.prototype, 'isNeutral', {
    get: function() {
      return this.hasComponent(CoreComponentIds.Neutral);
    },
    set: function(value) {
      if (value !== this.isNeutral) {
        if (value) {
          this.addComponent(CoreComponentIds.Neutral, Entity.neutralComponent);
        } else {
          this.removeComponent(CoreComponentIds.Neutral);
        }
      }
    }
  });
  /**
   * @param {boolean} value
   * @returns {entitas.Entity}
   */
  Entity.prototype.setNeutral = function(value) {
    this.isNeutral = value;
    return this;
  };
  /** @type {arpg.EnemyComponent} */
  Entity.enemyComponent = new EnemyComponent();
  /** @type {boolean} */
  Object.defineProperty(Entity.prototype, 'isEnemy', {
    get: function() {
      return this.hasComponent(CoreComponentIds.Enemy);
    },
    set: function(value) {
      if (value !== this.isEnemy) {
        if (value) {
          this.addComponent(CoreComponentIds.Enemy, Entity.enemyComponent);
        } else {
          this.removeComponent(CoreComponentIds.Enemy);
        }
      }
    }
  });
  /**
   * @param {boolean} value
   * @returns {entitas.Entity}
   */
  Entity.prototype.setEnemy = function(value) {
    this.isEnemy = value;
    return this;
  };
  /** @type {entitas.Matcher} */
  Matcher._matcherMouse=null;
  
  /** @type {entitas.Matcher} */
  Object.defineProperty(Matcher, 'Mouse', {
    get: function() {
      if (Matcher._matcherMouse == null) {
        Matcher._matcherMouse = Matcher.allOf(CoreComponentIds.Mouse);
      }
      
      return Matcher._matcherMouse;
    }
  });
  /** @type {entitas.Matcher} */
  Matcher._matcherAvatar=null;
  
  /** @type {entitas.Matcher} */
  Object.defineProperty(Matcher, 'Avatar', {
    get: function() {
      if (Matcher._matcherAvatar == null) {
        Matcher._matcherAvatar = Matcher.allOf(CoreComponentIds.Avatar);
      }
      
      return Matcher._matcherAvatar;
    }
  });
  /** @type {entitas.Matcher} */
  Matcher._matcherPropLv1=null;
  
  /** @type {entitas.Matcher} */
  Object.defineProperty(Matcher, 'PropLv1', {
    get: function() {
      if (Matcher._matcherPropLv1 == null) {
        Matcher._matcherPropLv1 = Matcher.allOf(CoreComponentIds.PropLv1);
      }
      
      return Matcher._matcherPropLv1;
    }
  });
  /** @type {entitas.Matcher} */
  Matcher._matcherPosition=null;
  
  /** @type {entitas.Matcher} */
  Object.defineProperty(Matcher, 'Position', {
    get: function() {
      if (Matcher._matcherPosition == null) {
        Matcher._matcherPosition = Matcher.allOf(CoreComponentIds.Position);
      }
      
      return Matcher._matcherPosition;
    }
  });
  /** @type {entitas.Matcher} */
  Matcher._matcherForward=null;
  
  /** @type {entitas.Matcher} */
  Object.defineProperty(Matcher, 'Forward', {
    get: function() {
      if (Matcher._matcherForward == null) {
        Matcher._matcherForward = Matcher.allOf(CoreComponentIds.Forward);
      }
      
      return Matcher._matcherForward;
    }
  });
  /** @type {entitas.Matcher} */
  Matcher._matcherMove=null;
  
  /** @type {entitas.Matcher} */
  Object.defineProperty(Matcher, 'Move', {
    get: function() {
      if (Matcher._matcherMove == null) {
        Matcher._matcherMove = Matcher.allOf(CoreComponentIds.Move);
      }
      
      return Matcher._matcherMove;
    }
  });
  /** @type {entitas.Matcher} */
  Matcher._matcherCurrOrder=null;
  
  /** @type {entitas.Matcher} */
  Object.defineProperty(Matcher, 'CurrOrder', {
    get: function() {
      if (Matcher._matcherCurrOrder == null) {
        Matcher._matcherCurrOrder = Matcher.allOf(CoreComponentIds.CurrOrder);
      }
      
      return Matcher._matcherCurrOrder;
    }
  });
  /** @type {entitas.Matcher} */
  Matcher._matcherSkillArr=null;
  
  /** @type {entitas.Matcher} */
  Object.defineProperty(Matcher, 'SkillArr', {
    get: function() {
      if (Matcher._matcherSkillArr == null) {
        Matcher._matcherSkillArr = Matcher.allOf(CoreComponentIds.SkillArr);
      }
      
      return Matcher._matcherSkillArr;
    }
  });
  /** @type {entitas.Matcher} */
  Matcher._matcherMe=null;
  
  /** @type {entitas.Matcher} */
  Object.defineProperty(Matcher, 'Me', {
    get: function() {
      if (Matcher._matcherMe == null) {
        Matcher._matcherMe = Matcher.allOf(CoreComponentIds.Me);
      }
      
      return Matcher._matcherMe;
    }
  });
  /** @type {entitas.Matcher} */
  Matcher._matcherMyTeam=null;
  
  /** @type {entitas.Matcher} */
  Object.defineProperty(Matcher, 'MyTeam', {
    get: function() {
      if (Matcher._matcherMyTeam == null) {
        Matcher._matcherMyTeam = Matcher.allOf(CoreComponentIds.MyTeam);
      }
      
      return Matcher._matcherMyTeam;
    }
  });
  /** @type {entitas.Matcher} */
  Matcher._matcherNeutral=null;
  
  /** @type {entitas.Matcher} */
  Object.defineProperty(Matcher, 'Neutral', {
    get: function() {
      if (Matcher._matcherNeutral == null) {
        Matcher._matcherNeutral = Matcher.allOf(CoreComponentIds.Neutral);
      }
      
      return Matcher._matcherNeutral;
    }
  });
  /** @type {entitas.Matcher} */
  Matcher._matcherEnemy=null;
  
  /** @type {entitas.Matcher} */
  Object.defineProperty(Matcher, 'Enemy', {
    get: function() {
      if (Matcher._matcherEnemy == null) {
        Matcher._matcherEnemy = Matcher.allOf(CoreComponentIds.Enemy);
      }
      
      return Matcher._matcherEnemy;
    }
  });
  /** @type {entitas.Entity} */
  Object.defineProperty(Pool.prototype, 'mouseEntity', {
    get: function() {
      return this.getGroup(Matcher.Mouse).getSingleEntity();
    }
  });
  /** @type {arpg.MouseComponent} */
  Object.defineProperty(Pool.prototype, 'mouse', {
    get: function() {
      return this.mouseEntity.mouse;
    }
  });
  /** @type {boolean} */
  Object.defineProperty(Pool.prototype, 'hasMouse', {
    get: function() {
      return this.mouseEntity != undefined;
    }
  });
  /**
   * @param {boolean} isTrigger
   * @param {number} x
   * @param {number} y
   * @returns {entitas.Entity}
   */
  Pool.prototype.setMouse = function(isTrigger, x, y) {
    if (this.hasMouse) {
      throw new SingleEntityException(Matcher.Mouse);
    }
    var entity = this.createEntity('Mouse');
    entity.addMouse(isTrigger, x, y);
    return entity;
  };
  /**
   * @param {boolean} isTrigger
   * @param {number} x
   * @param {number} y
   * @returns {entitas.Entity}
   */
  Pool.prototype.replaceMouse = function(isTrigger, x, y) {
    var entity = this.mouseEntity;
    if (entity == null) {
      entity = this.setMouse(isTrigger, x, y);
    } else {
      entity.replaceMouse(isTrigger, x, y);
    }
    return entity;
  };
  /**
   * @returns {entitas.Entity}
   */
  Pool.prototype.removeMouse = function() {
    this.destroyEntity(this.mouseEntity);
  };
})();