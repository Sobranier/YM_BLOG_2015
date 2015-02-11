var gulp = require('gulp'),
    path = require('path');

/*
 *  引入组件
 * */
var jshint = require('gulp-jshint');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

/*
 *  配置项
 * */
// 检查脚本
gulp.task('lint', function() {
    gulp.src('./javascripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass,但是一般我使用compass,gulp compass 可以脱离config.rb
gulp.task('compass', function() {
    gulp.src('./sass/*.scss')
        .pipe(compass({
            sass: 'sass',
            css: 'stylesheets',
            image: 'images',
            force: true
        }))
        .pipe(gulp.dest('temp'));
});


// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./javascripts/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

/*
 *  组合拳
 * */
gulp.task('default', function(){
    gulp.run('lint', 'compass', 'scripts');

    // 监听文件变化
    gulp.watch('./js/*.js', function(){
        gulp.run('lint', 'compass', 'scripts');
    });
});
