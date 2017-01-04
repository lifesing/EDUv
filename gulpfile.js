var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(['*.html','script/*.js','style/*.css']).on("change", browserSync.reload);
});

gulp.task('default',['browser-sync']);