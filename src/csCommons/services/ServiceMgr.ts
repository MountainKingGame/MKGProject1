class ServiceMgr {
	public netMgr:NetMgr;
	private callbackCache:CallbackPool<number> = new CallbackPool();
	public constructor() {
	}
	public add(cmd:number,owner:any,callback:any){
		this.callbackCache.addItem(cmd,owner,callback);
	}
	public req(cmd:number,req:any):void{
		let item:CallbackPoolItem<number> = this.callbackCache.getItemByKey(cmd);
		if(item==null){
			console.log("[warn]",this,"No add cmd");
		}else{
			(item.callback as Function).call(item.thisObj,cmd,req);
		}
	}
	public res(cmd:number,res:any):void{
		this.netMgr.res(cmd,res);
	}
	//===
	private battle:FightService;
	public init(){
		this.battle = new FightService();
		this.battle.mgr = this;
		this.battle.init();
	}
}