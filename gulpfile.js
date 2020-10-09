const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const minifyCSS = require("gulp-minify-css");



gulp.task("scss", function() {
    return gulp.src("stylesheet/index.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCSS())
        .pipe(rename("index.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})


// // 2. 创建一个 css 的任务
// //   gulp.task() 是用来创建任务的
// //   参数一： 任务名称
// //   参数二： 一个函数（这个任务要做什么事情）
// //gulp.task('css', function () {

// //})
// /*• gulp.src() 是指找到那些文件对其操作
// • gulp.pipe() 是指要做什么
// • gulp.dest() 是指输出到哪个目录下，如果没有这个目录存在会自动创建这个目录
// • 所以上面哪个 css 任务的意思就是
// • 把 ./src/css/ 目录下的所有文件
// • 进行压缩
// • 压缩完毕后放在 ./dist/ 下的 css/ 文件夹下
// • 接下来，就是执行一下这个叫做 css 的任务就行了
// • 直接在控制台使用指令*/


gulp.task("scssAll", function() {
    return gulp.src("stylesheet/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());


})
gulp.task("scripts", function() {
    return gulp.src(["*.js", "!gulpfile.js"])
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
})
gulp.task("copy-html", function() {
    return gulp.src("*.html")
        .pipe(gulp.dest("dist/"))
        .pipe(connect.reload());

})
gulp.task("data", function() {
    return gulp.src(["*.json", "!package.json"])
        .pipe(gulp.dest("dist/data"))
        .pipe(connect.reload());


})
gulp.task("build", ["scripts", "copy-html", "data", "scssAll"], function() {
        console.log("项目建立成功")
    })
    //建立监听
gulp.task("watch", function() {
    gulp.watch(["*.js", "!gulpfile.js"], ['scripts']);
    gulp.watch("*.html", ['copy-html']);
    gulp.watch(["*.json", "!package.json"], ['data']);
    gulp.watch(["stylesheet/*.scss"], ["scssAll"]);
})
const connect = require("gulp-connect");
//启动临时服务器
gulp.task("server", function() {
    connect.server({
        root: "dist",
        port: 3000,
        livereload: true

    })
})
gulp.task("default", ['server', 'watch'])