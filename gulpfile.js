"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp = require("gulp");
var child_process = require("child_process");
gulp.task('AutoReferencePath src', function (cb) {
    var free = child_process.spawn('node', ['C:/fox/projects/tools/NodeJsTools/bin/js/AutoReferencePath.js',
        '-d', 'src', '-e', 'GameMain.ts', 'Main.ts']);
    free.stdout.on('data', function (data) {
        console.log('' + data);
    });
    free.stderr.on('data', function (data) {
        console.log('standard error output:\n' + data);
    });
    free.on('exit', function (code, signal) {
        console.log('child process eixt ,exit:' + code);
        cb();
    });
});
gulp.task('AutoReferencePath tb_cs_common', function (cb) {
    child_process.exec("node C:/fox/projects/tools/NodeJsTools/bin/js/AutoReferencePath.js -d tb_cs_common -o GameMain.ts Main.ts", function (err) {
        if (err)
            return cb(err);
        cb();
    });
});
// gulp.task('default', ['AutoReferencePath src', 'AutoReferencePath tb_cs_common'], function () {
gulp.task('default', ['AutoReferencePath src'], function () {
});
//# sourceMappingURL=gulpfile.js.map