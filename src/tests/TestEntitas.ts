namespace tests {
    export class TestEntitas {
        constructor() {
            var systems: entitas.Systems;
            example.Pools.pool.createEntity
            systems = new entitas.Systems().add(example.Pools.pool.createSystem(MySystem))
            var e = example.Pools.pool.createEntity('entity_1');
            e.addVelocity(1, 3)
            e.addPosition(7, 9)
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
                console.log("[log] velocity:", e.velocity.x, e.velocity.y);

            }
        }

        public setPool(pool: entitas.Pool) {
            this.pool = pool;
            this.group = pool.getGroup(entitas.Matcher.allOf(entitas.Matcher.Position, entitas.Matcher.Velocity));// same as: this.group = pool.getGroup(entitas.Matcher.allOf(example.CoreComponentIds.Position, example.CoreComponentIds.Velocity));
        }
    }
}