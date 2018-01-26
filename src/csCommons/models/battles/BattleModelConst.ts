namespace models.battles {
    export enum BattleVoStateA {
        None = 0,
        Living = 1,
        Dump = 4,
        Rebirth = 5,
    }
    export enum BattleGroup{
        None = 0,
        Player,
        CPU,
        NPC,
    }
    export enum CellLv{
        Wood = 0,
        Stone = 1,
        Iron = 2,
    }
}