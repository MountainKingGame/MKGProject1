class KeyBoardCtrl {
    /* 
    字母和数字键的键码值(keyCode)
    按键	键码	按键	键码	按键	键码	按键	键码
    A	65	J	74	S	83	1	49
    B	66	K	75	T	84	2	50
    C	67	L	76	U	85	3	51
    D	68	M	77	V	86	4	52
    E	69	N	78	W	87	5	53
    F	70	O	79	X	88	6	54
    G	71	P	80	Y	89	7	55
    H	72	Q	81	Z	90	8	56
    I	73	R	82	0	48	9	57
    a s w d : 65 83 87 68
    数字键盘上的键的键码值(keyCode)	功能键键码值(keyCode)
    按键	键码	按键	键码	按键	键码	按键	键码
    0	96	8	104	F1	112	F7	118
    1	97	9	105	F2	113	F8	119
    2	98	*	106	F3	114	F9	120
    3	99	+	107	F4	115	F10	121
    4	100	Enter	108	F5	116	F11	122
    5	101	-	109	F6	117	F12	123
    6	102	.	110	 	 	 	 
    7	103	/	111	 	 	 
    控制键键码值(keyCode)
    按键	键码	按键	键码	按键	键码	按键	键码
    BackSpace	8	Esc	27	Right Arrow	39	-_	189
    Tab	9	Spacebar	32	Down Arrow	40	.>	190
    Clear	12	Page Up	33	Insert	45	/?	191
    Enter	13	Page Down	34	Delete	46	`~	192
    Shift	16	End	35	Num Lock	144	[{	219
    Control	17	Home	36	;:	186	\|	220
    Alt	18	Left Arrow	37	=+	187	]}	221
    Cape Lock	20	Up Arrow	38	,<	188	'"	222	 
    */
    private static _si: KeyBoardCtrl;
    public static get si(): KeyBoardCtrl {
        if (!KeyBoardCtrl._si) KeyBoardCtrl._si = new KeyBoardCtrl();
        return KeyBoardCtrl._si;
    }
    //
    static KeyDown = "KeyBoardCtrl.OnKeyDown";
    static KeyUp = "KeyBoardCtrl.OnKeyUp";
    //
    static KEY_0 = 48;
    static KEY_1 = 49;
    static KEY_2 = 50;
    static KEY_3 = 51;
    static KEY_4 = 52;
    static KEY_5 = 53;
    static KEY_6 = 54;
    static KEY_7 = 55;
    static KEY_8 = 56;
    static KEY_9 = 57;
    //
    static KEY_A = 65;
    static KEY_B = 66;
    static KEY_C = 67;
    static KEY_D = 68;
    static KEY_J = 74;
    static KEY_S = 83;
    static KEY_W = 87;
    //
    static KEY_SPACE_BAR = 32;
    static KEY_SHIFT = 16;
    static KEY_CTRL = 17;
    static KEY_ALT = 18;
    static KEY_ENTER = 13;
    //
    // 把keyup事件绑定到document中 
    isInit:boolean;
    init() {
        if(this.isInit){
            return;
        }
        this.isInit=true;
        if (document.addEventListener) {
            document.addEventListener("keydown", this.onKeyDown.bind(this), false);
            document.addEventListener("keyup", this.onKeyUp.bind(this), false);
        } else {
            document.onkeydown = this.onKeyDown.bind(this);
            document.onkeyup = this.onKeyUp.bind(this);
        }
    }
    private keyDownMap: { [key: number]: boolean } = {};
    get altKey():boolean{
        return this.keyDownMap[KeyBoardCtrl.KEY_ALT];
    }
    get ctrlKey():boolean{
        return this.keyDownMap[KeyBoardCtrl.KEY_CTRL];
    }
    get shiftKey():boolean{
        return this.keyDownMap[KeyBoardCtrl.KEY_SHIFT];
    }
    isKeyDown(keyCode:number):boolean{
        return this.keyDownMap[keyCode];
    }
    onKeyDown(e) {
        e = e || window.event;
        var keycode:number = e.which ? e.which : e.keyCode;
        // console.log("[debug]",e.keyCode,"`e.keyCode`","onKeyDown");
        if (!this.keyDownMap[keycode]) {
            this.keyDownMap[keycode] = true;
            MsgMgr.si.send(KeyBoardCtrl.KeyDown,keycode,this);
        }
    }
    onKeyUp(e) {
        e = e || window.event;
        var keycode:number = e.which ? e.which : e.keyCode;
        // console.log("[debug]",e.keyCode,"`e.keyCode`","onKeyUp");
        // if (keycode == 13 || keycode == 108) { //如果按下ENTER键 
        //在这里设置你想绑定的事件 
        // }
        if (this.keyDownMap[keycode]) {
            this.keyDownMap[keycode] = false;
            MsgMgr.si.send(KeyBoardCtrl.KeyUp,keycode,this);
        }
    }

}