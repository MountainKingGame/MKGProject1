## FairyGUI
#### BlurFilter
```
this.view.m_icon.filters = [new egret.BlurFilter(12,12)];
```
#### change color of GComponent
```
var cm: fairygui.utils.ColorMatrix = new fairygui.ColorMatrix();
// let arr:number[] = [-0.14,1.00,0.94,0.39];
let arr:number[] = [-0.35,0.95,1.00,-0.26];//红色
cm.adjustBrightness(arr[0]);
cm.adjustContrast(arr[1]);
cm.adjustSaturation(arr[2]);
cm.adjustHue(arr[3]);
var cf: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(cm.matrix);
this.view.m_icon.filters = [cf];
```

## npm
### script in package.json
```
{
    "name": "cb_client",
    "version": "1.0.1",
    "scripts": {
        "t1": "echo 1",
        "t2":"echo 2",
        "t3":"npm run t1 & npm run t2"
    }
}
```