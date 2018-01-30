class BinaryHeapUtil {
    static pushMin(arr: any[], node: any, keyName: string) {
        arr.push(node);
        let i = arr.length - 1;
        while (i > 0) {
            let parentIndex = Math.ceil(i / 2) - 1;
            if (node[keyName] < arr[parentIndex][keyName]) {
                arr[i] = arr[parentIndex];
                arr[parentIndex] = node;
                i = parentIndex;
            } else {
                break;
            }
        }
    }
    static pushMax(arr: any[], node: any, keyName: string) {
        arr.push(node);
        let i = arr.length - 1;
        while (i > 0) {
            let parentIndex = Math.ceil(i / 2) - 1;
            if (node[keyName] > arr[parentIndex][keyName]) {
                arr[i] = arr[parentIndex];
                arr[parentIndex] = node;
                i = parentIndex;
            } else {
                break;
            }
        }
    }
    static popMin(arr: any[], keyName: string): any {
        let head = arr[0];
        let node = arr[0] = arr[arr.length - 1];
        arr.pop();
        //
        let i = 0;
        while (true) {
            let leftIndex = i * 2 + 1;
            let rightIndex = leftIndex + 1;
            let left: any = arr[leftIndex];
            let right: any = arr[rightIndex];
            if (left == undefined && right == undefined) {
                break;
            } else {
                let tempIndex: number;
                let temp: any;
                if (left == undefined) {
                    tempIndex = rightIndex;
                    temp = right;
                } else if (right == undefined) {
                    tempIndex = leftIndex;
                    temp = left;
                } else {
                    if (left[keyName] < right[keyName]) {
                        tempIndex = leftIndex;
                        temp = left;
                    } else {
                        tempIndex = rightIndex;
                        temp = right;
                    }
                }
                if (node[keyName] > temp[keyName]) {
                    arr[i] = arr[tempIndex];
                    arr[tempIndex] = node;
                    i = tempIndex;
                } else {
                    break;
                }
            }
        }
        return head;
    }
    static popMax(arr: any[], keyName: string): any {
        let head = arr[0];
        let node = arr[0] = arr[arr.length - 1];
        arr.pop();
        //
        let i = 0;
        while (true) {
            let leftIndex = i * 2 + 1;
            let rightIndex = leftIndex + 1;
            let left: any = arr[leftIndex];
            let right: any = arr[rightIndex];
            if (left == undefined && right == undefined) {
                break;
            } else {
                let tempIndex: number;
                let temp: any;
                if (left == undefined) {
                    tempIndex = rightIndex;
                    temp = right;
                } else if (right == undefined) {
                    tempIndex = leftIndex;
                    temp = left;
                } else {
                    if (left[keyName] > right[keyName]) {
                        tempIndex = leftIndex;
                        temp = left;
                    } else {
                        tempIndex = rightIndex;
                        temp = right;
                    }
                }
                if (node[keyName] < temp[keyName]) {
                    arr[i] = arr[tempIndex];
                    arr[tempIndex] = node;
                    i = tempIndex;
                } else {
                    break;
                }
            }
        }
        return head;
    }
}