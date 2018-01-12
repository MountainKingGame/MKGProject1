class ServiceMgr {
	public netMgr:NetMgr;
	private callbackCache:CallbackCache = new CallbackCache();
	public constructor() {
	}
	public add(cmd:number,owner:any,callback:any){
		this.callbackCache.addItem(cmd,owner,callback);
	}
	public req(cmd:number,req:any):void{
		let item:CallbackCacheItem = this.callbackCache.getItemByKey1(cmd);
		if(item==null){
			console.log("[warn]",this,"No add cmd");
		}else{
			(item.data as Function).call(item.key2,cmd,req);
		}
	}
	public res(cmd:number,res:any):void{
		this.netMgr.res(cmd,res);
	}
	//===
	private battle:BattleService;
	public init(){
		this.battle = new BattleService();
		this.battle.mgr = this;
		this.battle.init();
	}
}