"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var SrcParsers;
(function (SrcParsers) {
    var SrcParser = /** @class */ (function () {
        function SrcParser() {
        }
        SrcParser.prototype.exec = function () {
            var srtBuffer = fs.readFileSync('raw/Zootopia.srt');
            var srt = srtBuffer.toString();
            srt = srt.replace(Words.CRLF, Words.LF);
            var lexical = new Lexical();
            lexical.parse(srt);
            //
            new JsonWritor().parse(lexical);
        };
        return SrcParser;
    }());
    SrcParsers.SrcParser = SrcParser;
    var JsonWritor = /** @class */ (function () {
        function JsonWritor() {
        }
        JsonWritor.prototype.parse = function (lexical) {
            this.lexical = lexical;
            // this.writeRaw();
            this.writeJson();
        };
        JsonWritor.prototype.writeJson = function () {
            var srtItems = [];
            var srtItem = null;
            var len = this.lexical.results.length;
            for (var i = 0; i < len; i++) {
                var item = this.lexical.results[i];
                switch (item.state) {
                    case LexicalStateEnum.LineNumber:
                        srtItem = {};
                        srtItem.lineNumber = parseInt(item.chars.join(''));
                        srtItems.push(srtItem);
                        break;
                    case LexicalStateEnum.StartTime:
                        srtItem.startTime = item.chars.join('');
                        break;
                    case LexicalStateEnum.EndTime:
                        srtItem.endTime = item.chars.join('');
                        break;
                    case LexicalStateEnum.Content:
                        srtItem.content = item.chars.join('');
                        break;
                }
            }
            fs.writeFileSync('raw/Zootopia.srt.json', JSON.stringify(srtItems));
        };
        JsonWritor.prototype.writeRaw = function () {
            var rs = '';
            var len = this.lexical.results.length;
            for (var i = 0; i < len; i++) {
                var item = this.lexical.results[i];
                rs = rs + item.chars.join('') + Words.LF;
            }
            fs.writeFileSync('raw/Zootopia.srt.txt', rs);
        };
        return JsonWritor;
    }());
    var Lexical = /** @class */ (function () {
        function Lexical() {
            this.results = [];
            this.prevItem = null;
            this.currItem = new LexicalResultItem(LexicalStateEnum.None);
        }
        Lexical.prototype.parse = function (srt) {
            var len = srt.length;
            for (var i = 0; i < len; i++) {
                this.parseChar(srt.charAt(i));
            }
            console.log("[info]", this.results.length);
        };
        Lexical.prototype.parseChar = function (char) {
            var newState = LexicalStateEnum.None;
            switch (this.currItem.state) {
                case LexicalStateEnum.None:
                    if (RegExpLib.Uint.test(char)) {
                        var item = new LexicalResultItem(LexicalStateEnum.LineNumber, [char]);
                        this.results.push(item);
                        this.currItem = item;
                    }
                    break;
                case LexicalStateEnum.LineNumber:
                    if (RegExpLib.Uint.test(char)) {
                        this.currItem.chars.push(char);
                    }
                    else if (char == Words.LF) {
                        var item = new LexicalResultItem(LexicalStateEnum.StartTime);
                        this.results.push(item);
                        this.currItem = item;
                    }
                    break;
                case LexicalStateEnum.StartTime:
                    if (char == ' ' || char == '-') {
                        var item = new LexicalResultItem(LexicalStateEnum.EndTime);
                        this.results.push(item);
                        this.currItem = item;
                    }
                    else {
                        this.currItem.chars.push(char);
                    }
                    break;
                case LexicalStateEnum.EndTime:
                    if (char == ' ' || char == '-' || char == '>') {
                        //wait
                    }
                    else if (char == Words.LF) {
                        var item = new LexicalResultItem(LexicalStateEnum.Content);
                        this.results.push(item);
                        this.currItem = item;
                    }
                    else {
                        this.currItem.chars.push(char);
                    }
                    break;
                case LexicalStateEnum.Content:
                    if (char == Words.LeftBracket) {
                        var item = new LexicalResultItem(LexicalStateEnum.Tag);
                        // this.resultList.push(item) //tag不加入进去
                        this.currItem = item;
                    }
                    else if (char == Words.LF) {
                        if (this.currItem.chars[this.currItem.chars.length - 1] == Words.LF) {
                            //连续两个LF
                            this.currItem = new LexicalResultItem(LexicalStateEnum.None);
                        }
                        else {
                            this.currItem.chars.push(char);
                        }
                    }
                    else {
                        this.currItem.chars.push(char);
                    }
                    break;
                case LexicalStateEnum.Tag:
                    if (char == Words.RightBracket) {
                        //大括号结束回到上一级
                        this.currItem = this.results[this.results.length - 1];
                    }
                    else {
                        // this.currItem.chars.push(char)//用不上不保存了
                    }
                    break;
            }
        };
        return Lexical;
    }());
    var Words = /** @class */ (function () {
        function Words() {
        }
        Words.CRLF = "\r\n";
        Words.LF = "\n";
        Words.LeftBracket = "{";
        Words.RightBracket = "}";
        return Words;
    }());
    var RegExpLib = /** @class */ (function () {
        function RegExpLib() {
        }
        /**匹配一个数字字符。等价于[0-9]。 */
        RegExpLib.Uint = /\d/;
        return RegExpLib;
    }());
    var LexicalResultItem = /** @class */ (function () {
        function LexicalResultItem(state, chars) {
            if (chars === void 0) { chars = null; }
            this.state = state;
            if (chars == null) {
                chars = [];
            }
            this.chars = chars;
        }
        return LexicalResultItem;
    }());
    var LexicalStateEnum;
    (function (LexicalStateEnum) {
        LexicalStateEnum[LexicalStateEnum["None"] = 0] = "None";
        LexicalStateEnum[LexicalStateEnum["LineNumber"] = 1] = "LineNumber";
        LexicalStateEnum[LexicalStateEnum["StartTime"] = 2] = "StartTime";
        LexicalStateEnum[LexicalStateEnum["EndTime"] = 3] = "EndTime";
        LexicalStateEnum[LexicalStateEnum["Content"] = 4] = "Content";
        LexicalStateEnum[LexicalStateEnum["Tag"] = 5] = "Tag";
    })(LexicalStateEnum || (LexicalStateEnum = {}));
})(SrcParsers || (SrcParsers = {}));
new SrcParsers.SrcParser().exec();
//# sourceMappingURL=SrtParser.js.map