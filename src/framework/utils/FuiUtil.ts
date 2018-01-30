class FuiUtil {
    /**
     * scale a object when scale it by a xy in it as anchor
     * @param obj 
     * @param x 
     * @param y 
     * @param deltaScale
     */
    static scaleAndMoveByXy(obj: fairygui.GObject, anchorX: number, anchorY: number, deltaScaleX: number, deltaScaleY: number = undefined) {
        if (deltaScaleY == undefined) {
            deltaScaleY = deltaScaleX;
        }
        obj.setScale(obj.scaleX+deltaScaleX,obj.scaleY+deltaScaleY);
        obj.setXY(obj.x - anchorX * deltaScaleX, obj.y - anchorY * deltaScaleY);
        /* derivation process
        //-old values
        var sx0: number = obj.scaleX;
        var sy0: number = obj.scaleY;
        //-
        var xa0 = anchorX*sx0;
        var xa1 = anchorX*(sx0+deltaScaleX);
        var ya0 = anchorX*sx0;
        var ya1 = anchorX*(sx0+deltaScaleX);
        obj.setXY(obj.x + (xa0-xa1),obj.y + (xa0-xa1)); 
        */
    }
    static copyProp4(target:fairygui.GComponent,from:fairygui.GComponent){
        target.setXY(from.x,from.y);
        target.setSize(from.width,from.height);
    }
}