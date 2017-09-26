const gulp = require('gulp');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const babel = require("gulp-babel");
const livereload = require('gulp-livereload');

gulp.task('sass', function () {
	return gulp.src(['./node_modules/open-iconic/font/css/open-iconic-bootstrap.scss', './node_modules/bootstrap/scss/bootstrap.scss', './src/scss/*.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 4 versions'],
		cascade: false
		}))
	.pipe(concat('style.css'))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/css'))
	.pipe(livereload());
	});

gulp.task('html', function () {
	return gulp.src('./dist/*.html') 
	.pipe(gulp.dest('./dist/'));
	});

gulp.task('js', function () {
	gulp.src(['./node_modules/jquery/dist/jquery.min.js', './node_modules/popper.js/dist/popper.min.js', './node_modules/bootstrap/dist/js/bootstrap.min.js', './src/common.js'])
	.pipe(babel())
	.pipe(jsmin())
	.pipe(rename({
		basename: 'bundle',
		suffix: '.min'
		}))
	.pipe(gulp.dest('dist/js'));
	});

gulp.task('fonts', function(){
	return gulp.src(['./node_modules/open-iconic/font/fonts', './src/fonts'])
	.pipe(gulp.dest('./dist/fonts'));
	});

gulp.task('img', function(){
	return gulp.src('./src/img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/img'))
	});

gulp.task('watch', ['html', 'sass', 'js'], function () {
	livereload.listen();
	gulp.watch('./src/scss/*.scss', ['sass']);
	gulp.watch('./dist/*.html');
	gulp.watch('./src/common.js');
	browserSync.init({
		server: "./dist"
		});
	});

gulp.task('build', function () {
	gulp.start('sass', 'js', 'img', 'fonts');
	});

gulp.task('default', ['watch'], function() {
	gulp.start('sass', 'js', 'html');
	});