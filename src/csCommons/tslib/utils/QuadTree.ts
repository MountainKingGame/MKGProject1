/**
 * http://blog.lxjwlt.com/front-end/2014/09/04/quadtree-for-collide-detection.html
 */
class QuadTree implements IDispose {
    static MAX_NODE = 10;
    static MAX_LEVEL = 5;
    //
    parent: QuadTree;
    /**self rect */
    rect: IQuadTreeRect;
    level: number;
    children: QuadTree[];
    nodeList:DoubleLinkedList;
    //---
    static debug_nodePush_count: number = 0;
    static debug_getIndex_count: number = 0;
    static debug_isInner_count: number = 0;

    constructor(rect: IQuadTreeRect, parentQuadTree: QuadTree = null) {
        this.children = [];
        this.nodeList = new DoubleLinkedList();
        this.parent = parentQuadTree;
        if (this.parent == null) {
            this.level = 0;
        } else {
            this.level = this.parent.level + 1;
        }
        this.rect = rect;
    }
    clear() {
        this.nodeList.clear(true);
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            child.clear();
        }
    }

    dispose(){
        this.nodeList.dispose();
        this.nodeList = null;
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            child.dispose();
        }
        this.children = null;
        this.rect = null;
        this.parent = null;
    }

    split() {
        let xHalf = Math.round((this.rect.x + this.rect.right) / 2);
        let yHalf = Math.round((this.rect.y + this.rect.bottom) / 2);
        this.children.push(
            new QuadTree(new QuadTreeRect(this.rect.x, xHalf, this.rect.y, yHalf), this),
            new QuadTree(new QuadTreeRect(xHalf, this.rect.right, this.rect.y, yHalf), this),
            new QuadTree(new QuadTreeRect(this.rect.x, xHalf, yHalf, this.rect.bottom), this),
            new QuadTree(new QuadTreeRect(xHalf, this.rect.right, yHalf, this.rect.bottom), this)
        );
    }
    getIndex(rect: IQuadTreeRect) {
        QuadTree.debug_getIndex_count++;
        var onLeft = rect.right <= this.children[0].rect.right;
        var onRight = rect.x >= this.children[0].rect.right;
        var onTop = rect.bottom <= this.children[0].rect.bottom;
        var onBottom = rect.y >= this.children[0].rect.bottom;

        if (onTop) {
            if (onLeft) {
                return 0;
            } else if (onRight) {
                return 1;
            }
        } else if (onBottom) {
            if (onLeft) {
                return 2;
            } else if (onRight) {
                return 3;
            }
        }
        // 如果物体跨越多个象限，则返回-1
        return -1;
    }
    insert(node: IQuadTreeNode) {
        var i: number, index: number;
        if (this.children.length) {
            index = this.getIndex(node);
            if (index !== -1) {
                this.children[index].insert(node);
                return;
            }
        }
        //
        this.addItem(node);
        //
        if (this.nodeList.length > QuadTree.MAX_NODE && this.level < QuadTree.MAX_LEVEL) {
            if (!this.children.length) {
                this.split();//拆分
            }
            let checkNode = this.nodeList.head as IQuadTreeNode;
            while (checkNode != null) {
                node = checkNode;
                checkNode = checkNode.prevNode;
                //
                index = this.getIndex(node);
                if (index !== -1) {
                    this.__removeItem(node);
                    // this.nodes[index].insert(rect);//There is no need to write like this, because there is already a index value, and subNode can't split at this time
                    this.children[index].addItem(node);
                }
            }
        }
    }
    static removeItem(node: IQuadTreeNode) {
        // if(node.ownerQuadTree){
            node.ownerQuadTree.__removeItem(node);
        // }
    }
    private __removeItem(node: IQuadTreeNode) {
        this.nodeList.remove(node);
        node.ownerQuadTree = null;
    }
    private addItem(node: IQuadTreeNode) {
        this.nodeList.push(node);
        node.ownerQuadTree = this;
        QuadTree.debug_nodePush_count++;
    }
    static isInner(rect: IQuadTreeRect, outRect: IQuadTreeRect) {
        QuadTree.debug_isInner_count++;
        return rect.x >= outRect.x &&
            rect.right <= outRect.right &&
            rect.y >= outRect.y &&
            rect.bottom <= outRect.bottom;
    }
    refresh(root: QuadTree = null) {
        if (root == null) {
            QuadTree.debug_nodePush_count = 0;
            QuadTree.debug_getIndex_count = 0;
            QuadTree.debug_isInner_count = 0;
            root = this;
        }
        var node: IQuadTreeNode, index: number, i: number, len: number;

        let checkNode = this.nodeList.head as IQuadTreeNode;
        while (checkNode != null) {
            node = checkNode;
            checkNode = checkNode.prevNode;
            //
            if (node.ownerQuadTree == this) {
                if (node.isDirty == false) {
                    continue;
                }
                node.isDirty = false;
                // 如果矩形不属于该象限， 且该矩形不是root,则将该矩形重新插入root
                if (!QuadTree.isInner(node, this.rect)) {
                    if (this !== root) {
                        this.__removeItem(node);
                        root.insert(node);
                        // this.parent.insert(this.items.splice(i, 1)[0]);
                    }
                }
                //fox:不要等 从root insert新的后会导致超过上限再拆分或重新排列, 因为会导致this.nodes 变化,本次循环又肯呢个出错,所以必须把需要放到children放进去
                else if (this.children.length) {
                    // 如果矩形属于该象限且该象限具有子象限，则将该矩形安插到子象限中
                    index = this.getIndex(node);
                    if (index !== -1) {
                        this.__removeItem(node);
                        this.children[index].insert(node);
                    }
                }
            } else {
                //TODO: error
                console.log("[error]");
            }
        }

        // 递归刷新子象限
        for (i = 0, len = this.children.length; i < len; i++) {
            this.children[i].refresh(root);
        }
    }
    /** 检索可以用鱼碰撞的结果队列 */
    retrieve(node: IQuadTreeNode): IQuadTreeNode[] {
        var result: IQuadTreeNode[] = [];
        if (this.children.length > 0) {
            var index: number;
            index = this.getIndex(node);
            if (index !== -1) {
                result = result.concat(this.children[index].retrieve(node));
            } else {
                // 切割矩形
                var arr: IQuadTreeRect[], i: number;
                arr = QuadTree.carve(node, this.children[0].rect.right, this.children[0].rect.bottom);
                for (i = arr.length - 1; i >= 0; i--) {
                    index = this.getIndex(arr[i]);
                    result = result.concat(this.children[index].retrieve(node));
                }
            }
        }
        QuadTree.pushNodesInArray(this.nodeList.head as IQuadTreeNode, result);
        return result;
    }
    static pushNodesInArray(headNode: IQuadTreeNode, arr: IQuadTreeNode[]) {
        while (headNode != null) {
            arr.push(headNode);
            headNode = headNode.prevNode;
        }
    }
    static carve(rect: IQuadTreeRect, cX: number, cY: number) {
        var result: IQuadTreeRect[] = [],
            temp: IQuadTreeRect[] = [];
        var isCarveX = cX > rect.x && cX < rect.right;
        var isCarveY = cY > rect.y && cY < rect.bottom;

        // 切割XY方向
        if (isCarveX && isCarveY) {
            temp = QuadTree.carve(rect, cX, rect.y);
            while (temp.length) {
                result = result.concat(QuadTree.carve(temp.shift(), rect.x, cY));
            }

            // 只切割X方向
        } else if (isCarveX) {
            result.push(
                new QuadTreeRect(rect.x, cX, rect.y, rect.bottom),
                new QuadTreeRect(cX, rect.right, rect.y, rect.bottom)
            );

            // 只切割Y方向
        } else if (isCarveY) {
            result.push(
                new QuadTreeRect(rect.x, rect.right, rect.y, cY),
                new QuadTreeRect(rect.x, rect.right, cY, rect.bottom)
            );
        }

        return result;
    }
}
/** Pivot and anchor is top-left */
interface IQuadTreeRect {
    x: number;
    y: number;
    right: number;
    bottom: number;
}
class QuadTreeRect implements IQuadTreeRect {
    x: number;
    y: number;
    right: number;
    bottom: number;
    constructor(x, right, y, bottom) {
        this.x = x;
        this.y = y;
        this.right = right;
        this.bottom = bottom;
    }
}
interface IQuadTreeNode extends IQuadTreeRect,IDoubleLinkedListNode {
    prevNode: IQuadTreeNode;
    nextNode: IQuadTreeNode;
    ownerQuadTree: QuadTree;
    isDirty: boolean;
    x: number;
    y: number;
    right: number;
    bottom: number;
}