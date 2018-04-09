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
  var AvatarComponent = arpg.AvatarComponent;
  var PositionComponent = arpg.PositionComponent;
  var MoveComponent = arpg.MoveComponent;
  var MouseComponent = arpg.MouseComponent;
  var PretreatMoveComponent = arpg.PretreatMoveComponent;
  var NetMoveComponent = arpg.NetMoveComponent;
  var RealMoveComponent = arpg.RealMoveComponent;
  var CoreComponentIds = arpg.CoreComponentIds;
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
   * @param {MoveKindEnum} kind
   * @param {number} speed
   * @param {number} speedX
   * @param {number} speedY
   * @param {number} toX
   * @param {number} toY
   * @param {number} startFrame
   * @param {number} lifeFrame
   * @param {number} totalFrame
   * @returns {entitas.Entity}
   */
  Entity.prototype.addMove = function(kind, speed, speedX, speedY, toX, toY, startFrame, lifeFrame, totalFrame) {
    var component = Entity._moveComponentPool.size() > 0 ? Entity._moveComponentPool.removeLast() : new MoveComponent();
    component.kind = kind;
    component.speed = speed;
    component.speedX = speedX;
    component.speedY = speedY;
    component.toX = toX;
    component.toY = toY;
    component.startFrame = startFrame;
    component.lifeFrame = lifeFrame;
    component.totalFrame = totalFrame;
    this.addComponent(CoreComponentIds.Move, component);
    return this;
  };
  /**
   * @param {MoveKindEnum} kind
   * @param {number} speed
   * @param {number} speedX
   * @param {number} speedY
   * @param {number} toX
   * @param {number} toY
   * @param {number} startFrame
   * @param {number} lifeFrame
   * @param {number} totalFrame
   * @returns {entitas.Entity}
   */
  Entity.prototype.replaceMove = function(kind, speed, speedX, speedY, toX, toY, startFrame, lifeFrame, totalFrame) {
    var previousComponent = this.hasMove ? this.move : null;
    var component = Entity._moveComponentPool.size() > 0 ? Entity._moveComponentPool.removeLast() : new MoveComponent();
    component.kind = kind;
    component.speed = speed;
    component.speedX = speedX;
    component.speedY = speedY;
    component.toX = toX;
    component.toY = toY;
    component.startFrame = startFrame;
    component.lifeFrame = lifeFrame;
    component.totalFrame = totalFrame;
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
  /** @type {arpg.PretreatMoveComponent} */
  Entity.pretreatMoveComponent = new PretreatMoveComponent();
  /** @type {boolean} */
  Object.defineProperty(Entity.prototype, 'isPretreatMove', {
    get: function() {
      return this.hasComponent(CoreComponentIds.PretreatMove);
    },
    set: function(value) {
      if (value !== this.isPretreatMove) {
        if (value) {
          this.addComponent(CoreComponentIds.PretreatMove, Entity.pretreatMoveComponent);
        } else {
          this.removeComponent(CoreComponentIds.PretreatMove);
        }
      }
    }
  });
  /**
   * @param {boolean} value
   * @returns {entitas.Entity}
   */
  Entity.prototype.setPretreatMove = function(value) {
    this.isPretreatMove = value;
    return this;
  };
  /** @type {arpg.NetMoveComponent} */
  Entity.netMoveComponent = new NetMoveComponent();
  /** @type {boolean} */
  Object.defineProperty(Entity.prototype, 'isNetMove', {
    get: function() {
      return this.hasComponent(CoreComponentIds.NetMove);
    },
    set: function(value) {
      if (value !== this.isNetMove) {
        if (value) {
          this.addComponent(CoreComponentIds.NetMove, Entity.netMoveComponent);
        } else {
          this.removeComponent(CoreComponentIds.NetMove);
        }
      }
    }
  });
  /**
   * @param {boolean} value
   * @returns {entitas.Entity}
   */
  Entity.prototype.setNetMove = function(value) {
    this.isNetMove = value;
    return this;
  };
  /** @type {arpg.RealMoveComponent} */
  Entity.realMoveComponent = new RealMoveComponent();
  /** @type {boolean} */
  Object.defineProperty(Entity.prototype, 'isRealMove', {
    get: function() {
      return this.hasComponent(CoreComponentIds.RealMove);
    },
    set: function(value) {
      if (value !== this.isRealMove) {
        if (value) {
          this.addComponent(CoreComponentIds.RealMove, Entity.realMoveComponent);
        } else {
          this.removeComponent(CoreComponentIds.RealMove);
        }
      }
    }
  });
  /**
   * @param {boolean} value
   * @returns {entitas.Entity}
   */
  Entity.prototype.setRealMove = function(value) {
    this.isRealMove = value;
    return this;
  };
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
  Matcher._matcherPretreatMove=null;
  
  /** @type {entitas.Matcher} */
  Object.defineProperty(Matcher, 'PretreatMove', {
    get: function() {
      if (Matcher._matcherPretreatMove == null) {
        Matcher._matcherPretreatMove = Matcher.allOf(CoreComponentIds.PretreatMove);
      }
      
      return Matcher._matcherPretreatMove;
    }
  });
  /** @type {entitas.Matcher} */
  Matcher._matcherNetMove=null;
  
  /** @type {entitas.Matcher} */
  Object.defineProperty(Matcher, 'NetMove', {
    get: function() {
      if (Matcher._matcherNetMove == null) {
        Matcher._matcherNetMove = Matcher.allOf(CoreComponentIds.NetMove);
      }
      
      return Matcher._matcherNetMove;
    }
  });
  /** @type {entitas.Matcher} */
  Matcher._matcherRealMove=null;
  
  /** @type {entitas.Matcher} */
  Object.defineProperty(Matcher, 'RealMove', {
    get: function() {
      if (Matcher._matcherRealMove == null) {
        Matcher._matcherRealMove = Matcher.allOf(CoreComponentIds.RealMove);
      }
      
      return Matcher._matcherRealMove;
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