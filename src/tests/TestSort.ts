namespace tests {
    class TestDllNode implements IDoubleLinkedListNode{
        data:number = 0;
        nextNode:IDoubleLinkedListNode;
        prevNode:IDoubleLinkedListNode;
        constructor(data?:number){
            this.data = data;
        }
    }
    export class TestSort {
        testSortBy1() {
            var a = [8, 9, 8, 3, 4, 5, 0, 8, 9, 5, 6, 7, 4, 3, 9, 8, 7, 5, 3, 2, 0, 9];
            a.sort(this.compare1);
            console.info("[debug]", a);
        }
        testSortBy2() {
            var a = [{ v: 3 }, { v: 1 }, { v: 0 }, { v: 7 }, { v: 2 }, { v: 3 }, { v: 8 }, { v: 7 }];
            a.sort(this.compare2);
            console.info("[debug]", a);
        }
        testDoubleLinkedList() {
            let list:DoubleLinkedList = new DoubleLinkedList();
            let n6:TestDllNode;
            list.push(new TestDllNode(3));
            list.push(n6 = new TestDllNode(6));
            list.push(new TestDllNode(9));
            list.insertNext(new TestDllNode(7),n6);
            list.insertPrev(new TestDllNode(4),n6);
            let rs:number[] = [];
            console.log("[info]",list.length);
            while(list.head){
                rs.push((list.head as TestDllNode).data);
                list.pop();
            }
            console.log("[info]",rs.join(","));
        }

        compare1(a, b) {
            if (a > b) {
                return 1;
            } else if (a < b) {
                return -1
            } else {
                return 0;
            }
        }
        compare2(a, b) {
            if (a.v > b.v) {
                return 1;
            } else if (a.v < b.v) {
                return -1
            } else {
                return 0;
            }
        }
    }
}
