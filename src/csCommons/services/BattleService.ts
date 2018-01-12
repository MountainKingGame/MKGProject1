/*
* name;
*/
class BattleService {
  public mgr: ServiceMgr;
  public init(): void {
    this.mgr.add(123, this,this.req);
  }
  public req(cmd: number, req: any): void {
    this.mgr.res(cmd, null);
  }
}