namespace tests {
    export class TestEntitas {
        constructor() {
            var systems: entitas.Systems;
            // arpg.Pools.pool.createEntity
            systems = new entitas.Systems().add(arpg.Pools.pool.createSystem(MySystem))
            var e = arpg.Pools.pool.createEntity('entity_1');
            e.addPosition(7, 9)
            var moveComp = new arpg.MoveComponent()
            e.addComponent(CoreComponentIds.Move, moveComp)
            // e.addMove(MoveKindEnum.TimeAndDistance,13,0,0,0,0)
            systems.initialize()
            systems.execute()
        }
    }

    export class MySystem implements entitas.IExecuteSystem, entitas.ISetPool {
        protected pool: entitas.Pool;
        protected group: entitas.Group;

        public execute() {
            var entities = this.group.getEntities();
            for (var i = 0, l = entities.length; i < l; i++) {
                var e = entities[i];
                console.log("[log] position:", e.position.x, e.position.y);
                // console.log("[log] velocity:", e.move.kind);
                
            }
        }

        public setPool(pool: entitas.Pool) {
            this.pool = pool;
            this.group = pool.getGroup(entitas.Matcher.anyOf(entitas.Matcher.Position, entitas.Matcher.Move));// same as: this.group = pool.getGroup(entitas.Matcher.allOf(arpg.CoreComponentIds.Position, arpg.CoreComponentIds.Velocity));
        }
    }
}