/**
 * http://blog.lxjwlt.com/front-end/2014/09/04/quadtree-for-collide-detection.html
 */
class QuadTree {
    static MAX_ITEMS = 10;
    static MAX_LEVEL = 5;
    //
    parent: QuadTree;
    /**self bounds */
    bounds: IQuadTreeRect;
    level: number;
    children: QuadTree[];
    items: IQuadTreeItem[];
    //---
    static debug_itemsPush_count: number = 0;
    static debug_getIndex_count: number = 0;
    static debug_isInner_count: number = 0;

    constructor(bounds: IQuadTreeRect, parentQuadTree: QuadTree = null) {
        this.items = [];
        this.children = [];
        this.parent = parentQuadTree;
        if (this.parent == null) {
            this.level = 0;
        } else {
            this.level = this.parent.level + 1;
        }
        this.bounds = bounds;
    }
    clear() {
        var nodes: QuadTree[] = this.children;
        var subnode: QuadTree;
        this.items.splice(0, this.items.length);
        while (nodes.length) {
            subnode = nodes.shift();
            subnode.clear();
        }
    }

    split() {
        let xHalf = Math.round((this.bounds.x+this.bounds.right)/2);
        let yHalf = Math.round((this.bounds.y+this.bounds.bottom)/2);
        this.children.push(
            new QuadTree(new QuadTreeRect(this.bounds.x, xHalf, this.bounds.y, yHalf), this),
            new QuadTree(new QuadTreeRect(xHalf, this.bounds.right, this.bounds.y, yHalf), this),
            new QuadTree(new QuadTreeRect(this.bounds.x, xHalf, yHalf, this.bounds.bottom), this),
            new QuadTree(new QuadTreeRect(xHalf, this.bounds.right, yHalf, this.bounds.bottom), this)
        );
    }
    getIndex(rect: IQuadTreeRect) {
        QuadTree.debug_getIndex_count++;
        var bounds = this.bounds;
        var onLeft = rect.right <= this.children[0].bounds.right;
        var onRight = rect.x >= this.children[0].bounds.right;
        var onTop = rect.bottom <= this.children[0].bounds.bottom;
        var onBottom = rect.y >= this.children[0].bounds.bottom;

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
    insert(rect: IQuadTreeItem) {
        var i: number, index: number;
        if (this.children.length) {
            index = this.getIndex(rect);
            if (index !== -1) {
                this.children[index].insert(rect);
                return;
            }
        }
        //
        this.items.push(rect);
        rect.ownerQuadTree = this;
        QuadTree.debug_itemsPush_count++;
        //
        if (this.items.length > QuadTree.MAX_ITEMS && this.level < QuadTree.MAX_LEVEL) {
            if (!this.children.length) {
                this.split();//拆分
            }
            for (i = this.items.length - 1; i >= 0; i--) {
                index = this.getIndex(this.items[i]);
                if (index !== -1) {
                    rect = this.items.splice(i, 1)[0];
                    this.children[index].items.push(rect);
                    rect.ownerQuadTree = this.children[index];
                    QuadTree.debug_itemsPush_count++;
                    // this.nodes[index].insert(rect);//There is no need to write like this, because there is already a index value, and subNode can't split at this time
                }
            }
        }
    }
    static isInner(rect: IQuadTreeRect, bounds: IQuadTreeRect) {
        QuadTree.debug_isInner_count++;
        return rect.x >= bounds.x &&
            rect.right <= bounds.right &&
            rect.y >= bounds.y &&
            rect.bottom <= bounds.bottom;
    }
    refresh(root: QuadTree = null) {
        if (root == null) {
            QuadTree.debug_itemsPush_count = 0;
            QuadTree.debug_getIndex_count = 0;
            QuadTree.debug_isInner_count = 0;
            root = this;
        }
        var item: IQuadTreeItem, index: number, i: number, len: number;


        for (i = this.items.length - 1; i >= 0; i--) {
            item = this.items[i];
            if (item.isDirty == false) {
                continue;
            }
            item.isDirty = false;
            // 如果矩形不属于该象限， 且该矩形不是root,则将该矩形重新插入root
            if (!QuadTree.isInner(item, this.bounds)) {
                if (this !== root) {
                    root.insert(this.items.splice(i, 1)[0]);
                    // this.parent.insert(this.items.splice(i, 1)[0]);
                }
            }
            //fox:不要等 从root insert新的后会导致超过上限再拆分或重新排列, 因为会导致this.items变化,本次循环又肯呢个出错,所以必须把需要放到children放进去
            else if (this.children.length) {
                // 如果矩形属于该象限且该象限具有子象限，则将该矩形安插到子象限中
                index = this.getIndex(item);
                if (index !== -1) {
                    this.children[index].insert(this.items.splice(i, 1)[0]);
                }
            } 
        }

        // 递归刷新子象限
        for (i = 0, len = this.children.length; i < len; i++) {
            this.children[i].refresh(root);
        }
    }
    /** 检索可以用鱼碰撞的结果队列 */
    retrieve(rect: IQuadTreeItem) {
        var result: IQuadTreeItem[] = [];
        if (this.children.length > 0) {
            var index: number;
            index = this.getIndex(rect);
            if (index !== -1) {
                result = result.concat(this.children[index].retrieve(rect));
            } else {
                // 切割矩形
                var arr: IQuadTreeRect[], i: number;
                arr = QuadTree.carve(rect, this.children[0].bounds.right, this.children[0].bounds.bottom);
                for (i = arr.length - 1; i >= 0; i--) {
                    index = this.getIndex(arr[i]);
                    result = result.concat(this.children[index].retrieve(rect));
                }
            }
        }
        result = result.concat(this.items);
        return result;
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
                new QuadTreeRect(cX, rect.y, rect.y, rect.bottom)
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
interface IQuadTreeItem extends IQuadTreeRect {
    ownerQuadTree: QuadTree;
    isDirty: boolean;
    x: number;
    y: number;
    right: number;
    bottom: number;
}