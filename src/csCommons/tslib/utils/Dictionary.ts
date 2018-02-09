class Dictionary<K, V> extends DisposeBase {
    private cache = {};
    length: number = 0;
    set(key: K, value: V) {
        if (this.has(key) == false) {
            this.length++;
        }
        this.cache[<string><any>key] = value;
    }
    remove(key: K) {
        if (this.has(key) == true) {
            this.length--;
        }
        delete this.cache[<string><any>key];
    }
    removeAll() {
        for (const key in this.cache) {
            delete this.cache[key];
        }
    }
    has(key: K): boolean {
        return this.cache[<string><any>key] != undefined;
    }
    get(key: K) {
        return this.cache[<string><any>key]
    }
    dispose(){
        if(this.isDisposed==false){
            this.removeAll();
            super.dispose();
        }
    }
}