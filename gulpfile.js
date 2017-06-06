var gulp = require("gulp");
var htmlmin = require("gulp-htmlmin");
var less = require("gulp-less");
var cssnano = require("gulp-cssnano");
var uglify = require("gulp-uglify");
var browserSync = require("browser-sync").create();


gulp.task("html",function(){
	gulp.src("src/**/*.html")
	.pipe(htmlmin({
		removeComments:true,
		collapseWhitespace:true,
	}))
	.pipe(gulp.dest("dist/"))
	.pipe(browserSync.reload({stream:true}));
})

gulp.task("less",function(){
	gulp.src("src/less/**/*.less")
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest("dist/css"))
	.pipe(browserSync.reload({stream:true}));
})

gulp.task("js",function(){
	gulp.src("src/js/**/*.js")
	.pipe(uglify())
	.pipe(gulp.dest("dist/js"))
	.pipe(browserSync.reload({stream:true}));
})

gulp.task("watch",["html","less","js"],function(){
	gulp.watch("src/**/*.html",["html"]);
	gulp.watch("src/less**/*.less",["less"]);
	gulp.watch("src/js/**/*.js",["js"]);
})

gulp.task("server",function(){
	browserSync.init({
		server:{
			baseDir:"dist/"
		}
	})
})

gulp.task("default",["watch","server"]);