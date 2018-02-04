interface IDispose {
	// addDisposeHandler(callback):void;
	// removeDisposeHandler(callback):void;
	dispose():void;
}
interface IXY{
    x?:number;
    y?:number;
}
interface IVector2 extends IXY{
}
interface IGrid{
    col?:number;
    row?:number;
}
interface IRect{
    left?:number;
    top?:number;
    right?:number;
    bottom?:number;
}