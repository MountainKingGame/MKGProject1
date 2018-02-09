class DisposeBase implements IDispose{
    isDisposed:boolean=false;
    dispose(){
        this.isDisposed = true;
    }
}