class PkgName {
    static movieClips_1 = "movieClips_1";
}
class ResMgr {
    public static si: ResMgr = new ResMgr();
    private createMovieClip(pkgName: string, itemName: string) {
        let mc: fairygui.GMovieClip = fairygui.UIPackage.createObject("movieClips_1", itemName).asMovieClip;
        mc.setPlaySettings(0, -1, 1, 0, mc.dispose.bind(mc));
        mc.setPivot(0.5, 0.5, true);
        return mc;
    }
    mcBoomBig() {
        return this.createMovieClip(PkgName.movieClips_1, "baiJinYuLei_baoZha")
    }
    mcBoomHeiHuoYao() {
        return this.createMovieClip(PkgName.movieClips_1, "picV382_boom_heiHuoYao")
    }
    mcBoomHuangJin() {
        return this.createMovieClip(PkgName.movieClips_1, "picV382_boom_huangJin")
    }
    mcBoomBaiYin() {
        return this.createMovieClip(PkgName.movieClips_1, "picV382_boom_baiYin")
    }
    mcBoomQingTong() {
        return this.createMovieClip(PkgName.movieClips_1, "picV382_boom_qingTong")
    }

    debugRect(x:number,y:number,w:number,h:number,pivotCenter:boolean=false){
        let ui = fuis.elements_1.UI_DebugRect.createInstance();
        if(pivotCenter){
            ui.setPivot(0.5,0.5,true);
        }
        ui.setXY(x,y);
        // ui.setSize(w,h);
        ui.width = w;
        ui.height = h;
        return ui;
    }
}