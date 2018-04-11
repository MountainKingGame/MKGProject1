namespace tests {
    export class TestEntitas {
        constructor() {
            var systems: entitas.Systems;
            // arpg.Pools.pool.createEntity
            systems = new entitas.Systems().add(arpg.Pools.pool.createSystem(MySystem))
            var e = arpg.Pools.pool.createEntity('entity_1');
            // e.addPosition(7, 9)
            console.log("[log] ---do init 0");
            e.addForward(14)
            console.log("[log] ---do init 0 end");
            e.addPosition(7, 9) //group如果使用position筛选的,则不触发group事件,
            //因为没有在group中;如果group是其它筛选,保证entity在组里,会触发add;会触发entity事件
            systems.initialize()
            // systems.execute()
            console.log("[log] ---do change 0");
            console.log("[log] ---do change 1");
            e.position.x = 13
            e.position.y = 17
            e.replaceComponent(CoreComponentIds.Position, e.position)
            console.log("[log] ---do change 2");
            e.replacePosition(14, 55)
            //replaceComponent和replacePosition 都会依次触发group的remove,add,update事件 
            console.log("[log] ---do change 3");
            e.replaceForward(47)
            console.log("[log] ---do change 4");
            e.removePosition()
            console.log("[log] ---do change 5");
            e.addPosition(51, 52)
        }
    }

    export class MySystem implements entitas.ISetPool, IInitializeSystem, entitas.IExecuteSystem {
        protected pool: entitas.Pool;
        protected group: entitas.Group;

        public setPool(pool: entitas.Pool) {
            this.pool = pool;
            this.group = pool.getGroup(entitas.Matcher.anyOf(entitas.Matcher.Position, entitas.Matcher.Forward));
            //anyOf is different as allOf
            console.log("[debug] setPool", this.group.getEntities().length, "<-`this.group.getEntities().length`");
            this.group.onEntityAdded.add((g: Group, e: Entity, c_id: number, c: IComponent) => {
                console.log("[debug] group(Position|Forward).onEntityAdded", arpg.CoreComponentIds[c_id], c);
            })
            this.group.onEntityRemoved.add((g: Group, e: Entity, c_id: number, c: IComponent) => {
                console.log("[debug] group(Position|Forward).onEntityRemoved", arpg.CoreComponentIds[c_id], c);
            })
            this.group.onEntityUpdated.add((g: Group, e: Entity, c_id: number, oldC: IComponent, newC: IComponent) => {
                console.log("[debug] group(Position|Forward).onEntityUpdated", arpg.CoreComponentIds[c_id], oldC, newC);
            })
            //
            this.pool.getGroup(Matcher.Position).onEntityAdded.add((g: Group, e: Entity, c_id: number, c: IComponent) => {
                console.log("[debug] group(Position).onEntityAdded", arpg.CoreComponentIds[c_id], c);
            })
            this.pool.getGroup(Matcher.Position).onEntityRemoved.add((g: Group, e: Entity, c_id: number, c: IComponent) => {
                console.log("[debug] group(Position).onEntityRemoved", arpg.CoreComponentIds[c_id], c);
            })
            this.pool.getGroup(Matcher.Position).onEntityUpdated.add((g: Group, e: Entity, c_id: number, oldC: IComponent, newC: IComponent) => {
                console.log("[debug] group(Position).onEntityUpdated", arpg.CoreComponentIds[c_id], oldC, newC);
            })
            //
            this.pool.getGroup(Matcher.Forward).onEntityAdded.add((g: Group, e: Entity, c_id: number, c: IComponent) => {
                console.log("[debug] group(Forward).onEntityAdded", arpg.CoreComponentIds[c_id], c);
            })
            this.pool.getGroup(Matcher.Forward).onEntityRemoved.add((g: Group, e: Entity, c_id: number, c: IComponent) => {
                console.log("[debug] group(Forward).onEntityRemoved", arpg.CoreComponentIds[c_id], c);
            })
            this.pool.getGroup(Matcher.Forward).onEntityUpdated.add((g: Group, e: Entity, c_id: number, oldC: IComponent, newC: IComponent) => {
                console.log("[debug] group(Forward).onEntityUpdated", arpg.CoreComponentIds[c_id], oldC, newC);
            })
        }
        public initialize() {
            console.log("[debug] initialize", this.group.getEntities().length, "<-`this.group.getEntities().length`");
        }
        public execute() {
            var entities = this.group.getEntities();
            for (var i = 0, l = entities.length; i < l; i++) {
                var e = entities[i];
                console.log("[log] system.execute:");
                // console.log("[log] velocity:", e.move.kind);
            }
        }

    }
}