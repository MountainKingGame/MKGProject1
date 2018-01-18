class NetMgr {
	static si:NetMgr;
	private fake:ServiceMgr = new ServiceMgr();
	public init(){
		this.fake.netMgr = this;
		this.fake.init();
	}

	public req(cmd:number,req:any,callback:any=null,resClass:any=null){
		console.log("[debug]","send",cmd);
		this.fake.req(cmd,req);
	}
	public res(cmd:number,res:any=null){
		console.log("[debug]","receive",cmd);
	}
}