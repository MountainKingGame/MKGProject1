import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import * as child_process from 'child_process';

gulp.task('AutoReferencePath src', function (cb) {
    child_process.exec("node C:/fox/projects/tools/NodeJsTools/bin/js/AutoReferencePath.js -d src -o GameMain.ts Main.ts", function (err) {
        if (err) return cb(err);
        cb();
    });
});

gulp.task('AutoReferencePath tb_cs_common', function (cb) {
    child_process.exec("node C:/fox/projects/tools/NodeJsTools/bin/js/AutoReferencePath.js -d tb_cs_common -o GameMain.ts Main.ts", function (err) {
        if (err) return cb(err);
        cb();
    });
});

// gulp.task('default', ['AutoReferencePath src', 'AutoReferencePath tb_cs_common'], function () {
gulp.task('default', ['AutoReferencePath src'], function () {
});