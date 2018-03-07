class MediaPlayer {
    sound: egret.Sound
    sc: egret.SoundChannel;
    ui: fuis.Package1.UI_MediaPlayer;
    datas: ISrtItem[] = [];
    constructor(stage) {
        fairygui.UIPackage.addPackage("Package1");
        fuis.Package1.Package1Binder.bindAll();
        //
        stage.addChild(fairygui.GRoot.inst.displayObject);
        let root = new fairygui.GComponent();
        fairygui.GRoot.inst.addChild(root);
        root.addChild(this.ui = fuis.Package1.UI_MediaPlayer.createInstance())
        // this.ui.visible = false;
        //---
        // this.loadSound();
        var sound: egret.Sound = RES.getRes("Zootopia_1_mp3");
        this.sound = sound;
        this.parseSrt(RES.getRes('Zootopia.srt_json'))
    }
    loadSound() {
        this.appeandLog('constructor')
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            this.appeandLog('load mp3 success')
            console.log("[debug]", "load success");
            this.sound = loader.data;
            this.loadSrt()
        }, this);
        loader.addEventListener(egret.ProgressEvent.PROGRESS, (event: egret.ProgressEvent) => {
            this.appeandLog(`mp3 ProgressEvent: ${event.bytesLoaded}/${event.bytesTotal}`)
        }, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.Event) => {
            this.appeandLog('mp3 io error')
            console.log("[debug]", "io error");
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        this.appeandLog('load mp3 start')
        loader.load(new egret.URLRequest("resource/assets/mediaPlayer/Zootopia_1.mp3"));
    }
    appeandLog(str: string) {
        this.ui.m_txtLog.text += '\n' + str;
    }
    parseSrt(rs: ISrtItem[]) {
        this.datas = [];
        for (let i = 0; i < rs.length; i++) {
            let item: ISrtItem = rs[i];
            if (item.contentEN) {
                this.datas.push(item);
            }
        }
        this.initUI()
    }
    loadSrt() {
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            this.appeandLog('load srt success')
            this.parseSrt(JSON.parse(loader.data))
        }, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.Event) => {
            this.appeandLog('load srt io error')
            console.log("[debug]", "io error");
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        this.appeandLog('load srt start')
        loader.load(new egret.URLRequest("resource/assets/mediaPlayer/Zootopia.srt.json"));
    }
    currI: number = 0;
    currTime: number = 0
    loopCount: number = 3;
    currLoop: number;
    initUI() {
        this.ui.m_txtLog.text = 'All are ready';
        this.ui.visible = true;
        this.ui.m_listSentense.setVirtual();
        this.ui.m_listSentense.itemRenderer = this.listSentense_itemRenderer.bind(this);
        //
        this.ui.m_btnPrev.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPrev, this);
        this.ui.m_btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNext, this);
        this.ui.m_btnLoopSub.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLoopSub, this);
        this.ui.m_btnLoopAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLoopAdd, this);
        this.ui.m_btnShowCN.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowCN, this);
        this.ui.m_btnShowEN.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowEN, this);
        this.ui.m_txtLoop.text = this.loopCount.toString();
        //
        this.ui.m_listSentense.numItems = this.datas.length;
        this.ui.m_listSentense.refreshVirtualList();
    }
    isShowCN: boolean = true;
    isShowEN: boolean = true;
    onShowCN() {
        this.isShowCN = !this.isShowCN;
        this.ui.m_listSentense.refreshVirtualList();
    }
    onShowEN() {
        this.isShowEN = !this.isShowEN;
        this.ui.m_listSentense.refreshVirtualList();
    }
    listSentense_itemRenderer(i: number, item: fuis.Package1.UI_SentenseItem) {
        let data = this.datas[i]
        data.i = i;
        item.m_txtLineNumber.text = (i + 1).toString() + '(' + data.lineNumber + ')';
        item.m_txtTime.text = this.timeMsToStr(data.startTime) + '~' + this.timeMsToStr(data.endTime);
        if (this.isShowCN && this.isShowEN) {
            item.m_txtContent.text = data.contentCN + '\n' + data.contentEN;
        } else if (this.isShowCN) {
            item.m_txtContent.text = data.contentCN
        } else if (this.isShowEN) {
            item.m_txtContent.text = data.contentEN
        } else {
            item.m_txtContent.text = ''
        }
        // console.log("[info]", "listSentense_itemRenderer", i);
        // if(item.hasEventListener(egret.TouchEvent.TOUCH_TAP)==false){
        // console.log("[info]","add e",i);
        item.m_btnPlay.data = data;
        item.m_btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListItemTap, this)
        // }
    }
    onListItemTap(e: egret.TouchEvent) {
        let data: ISrtItem = e.currentTarget.data
        console.log("[info]", data.startTime);
        this.currLoop = 0;
        this.currI = data.i;
        this.playSoundAtPosition()
    }
    playSoundAtPosition() {
        this.isWaitGap = false;
        let timeMs = this.datas[this.currI].startTime;
        if (this.sc != null) {
            this.sc.stop();
        }
        // this.sc.position = data.startTime/1000-0.1
        this.sc = this.sound.play(timeMs / 1000 - 0.2)
        this.currTime = this.datas[this.currI].startTime;
        this.ui.m_txtCurrI.text = `${this.currI}(${this.datas[this.currI].lineNumber})`
        this.ui.m_txtCurrTime.text = this.timeMsToStr(this.datas[this.currI].startTime)
    }
    isWaitGap = false;
    tick(deltaMs) {
        if (this.sc || this.isWaitGap==true) {
            this.currTime += (deltaMs);
            if (this.isWaitGap == false) {
                if (this.currTime < this.datas[this.currI].endTime + 0.3) {
                    this.ui.m_txtCurrTime.text = this.timeMsToStr(this.currTime);
                } else {
                    if (this.sc) {
                        this.sc.stop();
                        this.sc = null;
                    }
                    this.isWaitGap = true;
                    this.currTime = 0;
                }
            } else {
                //等间隔时间
                if (this.currTime > 1000) {
                    this.isWaitGap = false;
                    this.currLoop++;
                    console.log("[info]", this.currLoop, "`this.currLoop`");
                    if (this.currLoop < this.loopCount) {
                        this.playSoundAtPosition()
                    } else {
                        this.currI += 1;
                        if (this.currI < this.datas.length) {
                            this.currLoop = 0;
                            this.playSoundAtPosition()
                        } else {
                            if (this.sc) {
                                this.sc.stop();
                                this.sc = null;
                            }
                        }
                    }
                }
            }
        }
    }
    onBtnPrev() {
        if (this.currI > 1) {
            this.currI--;
            this.playSoundAtPosition()
        }
    }
    onBtnNext() {
        if (this.currI < this.datas.length - 1) {
            this.currI++;
            this.playSoundAtPosition()
        }
    }
    onBtnLoopSub() {
        this.loopCount = Math.max(1, this.loopCount - 1)
        this.ui.m_txtLoop.text = this.loopCount.toString();
    }
    onBtnLoopAdd() {
        this.loopCount = this.loopCount + 1
        this.ui.m_txtLoop.text = this.loopCount.toString();
    }
    timeMsToStr(val: number): string {
        let ms = val % 1000;
        let s = Math.floor(val / 1000)
        s %= 60
        let m = Math.floor(s / 60)
        m %= 60
        let h = Math.floor(m / 60)
        h %= 60
        return `${h}:${m}:${s},${val}`
    }
}
interface ISrtItem {
    i?: number
    lineNumber?: number
    startTime?: number
    endTime?: number
    contentCN?: string
    contentEN?: string
}