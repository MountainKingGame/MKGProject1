
class Rect implements IQuadTreeNode {
    ownerQuadTree: QuadTree;
    prevNode:IQuadTreeNode;
    nextNode:IQuadTreeNode;
    isDirty: boolean;
    speedArr: number[];
    nextSpeedArr: number[];
    left: number;
    top: number;
    get right(): number {
        return this.left + this.w;
    }
    get bottom(): number {
        return this.top + this.h;
    }
    h: number;
    w: number;
    xHalf: number;
    yHalf: number;
    wHalf: number;
    hHalf: number;
    static tempRectArr = [new Rect(0, 0, 0, 0),
    new Rect(0, 0, 0, 0)];
    constructor(x, y, width, height, speedArr?: number[]) {
        if (!(this instanceof Rect)) return;
        this.speedArr = speedArr || [0, 0];
        this.nextSpeedArr = this.speedArr.slice();
        this.resize(width, height);
        this.moveTo(x, y);
    }

    moveTo(x: number, y: number) {
        if (this.left === x && this.top === y) return;
        this.left = x;
        this.top = y;
        this.xHalf = x + this.wHalf;
        this.yHalf = y + this.hHalf;
        this.isDirty = true;
    }

    resize(w: number, h: number) {
        if (this.w === w && this.h === h) return;
        this.w = w;
        this.h = h;
        this.wHalf = w / 2;
        this.hHalf = h / 2;
        this.xHalf = this.left + this.wHalf;
        this.yHalf = this.top + this.hHalf;
        this.isDirty = true;
    }

    draw(cxt) {
        cxt.save();
        cxt.beginPath();
        cxt.rect(this.left, this.top, this.w, this.h);
        cxt.closePath();
        cxt.restore();
    }

    run(time?) {
        time = time || 16;
        this.speedArr[0] = this.nextSpeedArr[0];
        this.speedArr[1] = this.nextSpeedArr[1];

        this.moveTo(
            this.left + this.speedArr[0] * time / 1000,
            this.top + this.speedArr[1] * time / 1000
        );
    }

    copy(rect: Rect) {
        this.resize(rect.w, rect.h);
        this.moveTo(rect.left, rect.top);
        this.nextSpeedArr[0] = rect.speedArr[0];
        this.nextSpeedArr[1] = rect.speedArr[1];
    }

    init(x, y, w, h, speedArr) {
        this.resize(w, h);
        this.moveTo(x, y);
    }

    // 改变碰撞后运动方向
    collide(rect: Rect, isInner: boolean = false) {
        if (!(rect instanceof Rect)) return;

        var tRect1 = Rect.tempRectArr[0],
            tRect2 = Rect.tempRectArr[1],
            thisRect: Rect, sWidthSum: number, sHeightSum: number, dWidth: number, dHeight: number,
            onHorizontal: boolean, onVertical: boolean, focusPointDir: number;

        if (!isInner) {

            tRect1.copy(this);
            tRect2.copy(rect);

            // 判断碰撞方向
            sWidthSum = tRect1.wHalf + tRect2.wHalf;
            sHeightSum = tRect1.hHalf + tRect2.hHalf;
            dWidth = sWidthSum - Math.abs(tRect1.xHalf - tRect2.xHalf);
            dHeight = sHeightSum - Math.abs(tRect1.yHalf - tRect2.yHalf);

            while (dWidth > 0 && dHeight > 0) {
                tRect1.run(-16);
                tRect2.run(-16);
                dWidth = sWidthSum - Math.abs(tRect1.xHalf - tRect2.xHalf);
                dHeight = sHeightSum - Math.abs(tRect1.yHalf - tRect2.yHalf);
            }

            onHorizontal = dWidth <= 0;
            onVertical = dHeight <= 0;

            // 改变方向
            if (onHorizontal) {
                focusPointDir = this.xHalf > rect.xHalf ? 1 : -1;
                // this.nextSpeedArr[0] = focusPointDir * (Math.abs(this.nextSpeedArr[0]) + Math.abs(rect.speedArr[0])) / 2; //Speed is influenced by the other rect
                this.nextSpeedArr[0] = focusPointDir * (Math.abs(this.nextSpeedArr[0])); //Speed is not influenced by the other rect
            }

            if (onVertical) {
                focusPointDir = tRect1.yHalf > tRect2.yHalf ? 1 : -1;
                // this.nextSpeedArr[1] = focusPointDir * (Math.abs(this.nextSpeedArr[1]) + Math.abs(rect.speedArr[1])) / 2;
                this.nextSpeedArr[1] = focusPointDir * (Math.abs(this.nextSpeedArr[1]));
            }

        } else {
            if (Math.abs(this.xHalf - rect.xHalf) + this.wHalf > rect.wHalf) {
                this.nextSpeedArr[0] = -(this.nextSpeedArr[0] || this.speedArr[0]);
                this.moveTo(this.xHalf > rect.xHalf ?
                    rect.left + rect.w - this.w : rect.left, this.top);
            }
            if (Math.abs(this.yHalf - rect.yHalf) + this.hHalf > rect.hHalf) {
                this.nextSpeedArr[1] = -(this.nextSpeedArr[1] || this.speedArr[1]);
                this.moveTo(this.left, this.yHalf > rect.yHalf ?
                    rect.top + rect.h - this.h : rect.top);
            }
        }
    }

    // 检查两个矩形是否互相接近
    static isApproach(rect1: Rect, rect2: Rect) {
        /*    if (1 > 0) {
               return true;
           } */
        // var tempRect1 = rect1.copy(),
        //     tempRect2 = rect2.copy();

        // tempRect1.run();
        // tempRect2.run();

        // return +(Math.pow(rect1.cX - rect2.cX, 2) - Math.pow(tempRect1.cX - tempRect2.cX, 2) +
        //     Math.pow(rect1.cY - rect2.cY, 2) - Math.pow(tempRect1.cY - tempRect2.cY, 2)).toFixed(6) > 0 ?
        //     true : false;

        var tRect1 = Rect.tempRectArr[0],
            tRect2 = Rect.tempRectArr[1];

        tRect1.copy(rect1);
        tRect2.copy(rect2);

        tRect1.run();
        tRect2.run();

        return +(Math.pow(rect1.xHalf - rect2.xHalf, 2) - Math.pow(tRect1.xHalf - tRect2.xHalf, 2) +
            Math.pow(rect1.yHalf - rect2.yHalf, 2) - Math.pow(tRect1.yHalf - tRect2.yHalf, 2)).toFixed(6) > 0 ?
            true : false;


        // var dX, dY;

        // dX = rect1.cX + rect1.speedArr[0] * 0.016 - rect2.cX + rect2.speedArr[0] * 0.016;
        // dY = rect1.cY + rect1.speedArr[1] * 0.016 - rect2.cY + rect2.speedArr[1] * 0.016;

        // return +(Math.pow(rect1.cX - rect2.cX, 2) - Math.pow(dX, 2) +
        //     Math.pow(rect1.cY - rect2.cY, 2) - Math.pow(dY, 2)).toFixed(6) > 0 ?
        //     true : false;
    }

    // 检查矩形是否发生碰撞
    static isCollide(rect1: Rect, rect2: Rect) {
        if (Math.abs(rect1.xHalf - rect2.xHalf) < rect1.wHalf + rect2.wHalf &&
            Math.abs(rect1.yHalf - rect2.yHalf) < rect1.hHalf + rect2.hHalf &&
            Rect.isApproach(rect1, rect2)) {

            rect1.collide(rect2);
            rect2.collide(rect1);
        }
    };
}

class TestQuadTreeShow {
    canvas: HTMLCanvasElement;
    cxt: CanvasRenderingContext2D;
    w = 1000;
    h = 500;
    rectArr: Rect[] = [];
    tree: QuadTree;
    time: number;
    collideCount: number;
    test1: boolean = false;
    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('mycanvas');
        this.cxt = this.canvas.getContext('2d');
        // 设置canvas尺寸
        this.canvas.setAttribute('width', this.w.toString());
        this.canvas.setAttribute('height', this.h.toString());


        // 随机创建
        if (!this.test1) {
            for (let i = 0; i < 100; i++) {
                if (i < 90) {
                    this.rectArr.push(
                        new Rect(Math.floor(Math.random() * (this.w - 20)),
                            Math.floor(Math.random() * (this.h - 20)),
                            Math.floor(Math.random() * 40 + 5),
                            Math.floor(Math.random() * 40 + 5),
                            // 200,200,
                            [Math.floor(Math.random() * 60 + 20), Math.floor(Math.random() * 60 + 20)])
                    );
                } else {
                    this.rectArr.push(
                        new Rect(Math.floor(Math.random() * (this.w - 20)),
                            Math.floor(Math.random() * (this.h - 20)),
                            200, 200,
                            [0, 0])
                    );
                }
            }
        } else {
            for (let i = 0; i < 11; i++) {
                switch (i) {
                    case 3:
                        this.rectArr.push(new Rect(
                            this.w / 2 - 100, this.h / 2 + 100, 200, 200
                        ));
                        break;
                    case 10:
                        this.rectArr.push(new Rect(
                            0, 0, 200, 200
                        ));
                        break;
                    default:
                        this.rectArr.push(new Rect(
                            this.w / 2 - 100, this.h / 2 - 100, 200, 200
                        ));
                        break;
                }
            }
        }

        // 初始化四叉树
        this.tree = new QuadTree(new QuadTreeRect(0, this.w, 0, this.h));
        for (let i = 0, len = this.rectArr.length; i < len; i++) {
            this.tree.insert(this.rectArr[i]);
        }

        this.time = new Date().getTime();

        this.cxt.fillStyle = '#000';

        requestAnimationFrame(this.draw.bind(this));
    }
    frame:number = 0;
    draw() {
        this.frame++;
        var cTime = Date.now(),
            i, j, len, rect, tempRect;

        // 清屏
        this.cxt.clearRect(0, 0, this.w, this.h);

        // 更新四叉树
        this.tree.refresh();
        //
        this.collideCount = 0;
        // 碰撞检测
        for (i = 0, len = this.rectArr.length; i < len; i++) {
            tempRect = this.tree.retrieve(this.rectArr[i]);
            // console.log(tempRect.length);
            for (j = 0; j < tempRect.length; j++) {
                if (this.rectArr[i] != tempRect[j]) {
                    this.collideCount++;
                    Rect.isCollide(this.rectArr[i], tempRect[j]);
                }
            }
            if(this.frame%len==i){
                this.rectArr[i].resize(Math.floor(Math.random() * 140 + 5),Math.floor(Math.random() * 140 + 5));
            }
            // 防止溢出画布
            this.rectArr[i].collide(new Rect(0, 0, this.w, this.h), true);
        }
        
        if (this.test1) {
            this.rectArr[3].moveTo(0, 0);
            this.rectArr[10].moveTo(this.w / 2 - 100, this.h / 2 - 100);
        }
        // 绘制
        for (i = 0, len = this.rectArr.length; i < len; i++) {
            if (!this.test1) {
                this.rectArr[i].run(cTime - this.time);
            }
            this.rectArr[i].draw(this.cxt);
            this.rectArr[i].draw(this.cxt);
            this.cxt.fill();
        }
        
        console.info(cTime-this.time,this.collideCount, QuadTree.debug_nodePush_count, QuadTree.debug_getIndex_count, QuadTree.debug_isInner_count);
        this.time = cTime;

        requestAnimationFrame(this.draw.bind(this));
    }
}