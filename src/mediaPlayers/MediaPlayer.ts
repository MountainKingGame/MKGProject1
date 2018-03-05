class MediaPlayer{
    sound:egret.Sound
    ui:fuis.Package1.UI_MediaPlayer;
    datas:ISrtItem[] = [];
    constructor(stage){
        fairygui.UIPackage.addPackage("Package1");
        fuis.Package1.Package1Binder.bindAll();
        //
        stage.addChild(fairygui.GRoot.inst.displayObject);
        let root = new fairygui.GComponent();
        fairygui.GRoot.inst.addChild(root);
        root.addChild(this.ui = fuis.Package1.UI_MediaPlayer.createInstance())
        this.ui.visible=false;
        //---
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            console.log("[debug]","load success");
            this.sound = loader.data;
            this.sound.play()
            this.loadSrt()
        }, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR , (event: egret.Event) =>{
            console.log("[debug]","io error");
        },this);
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        loader.load(new egret.URLRequest("resource/mediaPlayer/Zootopia_1.mp3"));
    }
    loadSrt(){
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            console.log("loadSrt:",loader.data)
            this.datas = JSON.parse(loader.data);
            this.initUI()
        }, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR , (event: egret.Event) =>{
            console.log("[debug]","io error");
        },this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.load(new egret.URLRequest("resource/mediaPlayer/Zootopia.srt.json"));
    }
    initUI(){
        this.ui.visible = true;
        this.ui.m_listSentense.setVirtual();
        this.ui.m_listSentense.itemRenderer = this.listSentense_itemRenderer.bind(this);
        //
        this.ui.m_listSentense.numItems = this.datas.length;
        this.ui.m_listSentense.refreshVirtualList();
    }
    listSentense_itemRenderer(i:number,item:fuis.Package1.UI_SentenseItem)
    {
        let data = this.datas[i]
        item.m_txtLineNumber.text = (i+1).toString()+'('+data.lineNumber+')';
        item.m_txtTime.text = data.startTime+'~'+data.endTime;
        item.m_txtContent.text = data.content;
    }
}
interface ISrtItem {
    lineNumber?: number
    startTime?: number
    endTime?: number
    content?: string
}