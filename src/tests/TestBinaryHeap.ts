class TestBinaryHeap {
    test0() {
        let arr1: number[] = [2, 5, 7];
        arr1["a"] = 9;
        arr1["4"] = 13;//与 arr1[4]一样的效果
        console.log("[info]", arr1);
        delete arr1[2];//这样删除没用的,内容没了,但key还在,length也不会变
        delete arr1["1"];//和delete arr1[2]一样的效果,能删除value,但key还在,lenght不变
        delete arr1["4"];//同delete arr1[2]
        delete arr1["a"];//有用key value全没了,因为不是数组的key
        console.log("[len]", arr1.length);
        console.log("[info]", arr1);
    }
    test1() {
        let arr1: { val: number }[] = [];
        let arr2: { val: number }[] = [];
        let len = this.randomInt(10, 20);
        while (len--) {
            BinaryHeapUtil.pushMin(arr1, { val: this.randomInt(0, 99) }, "val");
            BinaryHeapUtil.pushMax(arr2, { val: this.randomInt(0, 99) }, "val");
        }
        // console.log("[debug]", arr1);
        // console.log("[debug]", arr2);
        console.log("------------------");
        // len = this.randomInt(1,Math.ceil(arr1.length/2));
        len = 5;
        while (len--) {
            console.log("[debug]", len, "pop:", BinaryHeapUtil.popMin(arr1, "val"));
        }
        console.log("[debug]", arr1);
        console.log("------------------");
        len = 5;
        while (len--) {
            console.log("[debug]", len, "pop:", BinaryHeapUtil.popMax(arr2, "val"));
        }
        console.log("[debug]", arr2);
    }
    randomInt(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}
// new TestBinaryHeap().test1();