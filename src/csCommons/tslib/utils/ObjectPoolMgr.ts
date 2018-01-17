class ObjectPoolMgr{
    public static readonly si = new ObjectPoolMgr();
    public create<T>(c: {new(): T; }): T {
        return new c();
    }
}