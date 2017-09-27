var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var babel = require("gulp-babel");

gulp.task('sass', function () {
	return gulp.src([
		'./node_modules/open-iconic/font/css/open-iconic-bootstrap.scss', 
		'./node_modules/bootstrap/scss/bootstrap.scss', 
		'./src/scss/*.scss'
		])
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 4 versions'],
		cascade: false
		}))
	.pipe(concat('style.css'))
	//.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/css'))
	});

gulp.task('html', function () {
	return gulp.src('./dist/*.html') 
	.pipe(gulp.dest('./dist/'));
	});

gulp.task('js', function () {
	gulp.src([
		'./node_modules/jquery/dist/jquery.min.js', 
		'./node_modules/popper.js/dist/popper.min.js', 
		'./node_modules/bootstrap/dist/js/bootstrap.min.js', 
		'./src/js/*.js'
	])
	.pipe(concat('bundle.js'))
	.pipe(babel({
		presets: ['env', 'es2015']
		}))
	//.pipe(jsmin())
	.pipe(rename({
		suffix: '.min'
		}))
	.pipe(gulp.dest('./dist/js'));
	});

gulp.task('fonts', function(){
	return gulp.src([
		'./node_modules/open-iconic/font/fonts', 
		'./src/fonts'
		])
	.pipe(gulp.dest('./dist/fonts'));
	});

gulp.task('img', function(){
	return gulp.src('./src/img/*')
	//.pipe(imagemin())
	.pipe(gulp.dest('./dist/img'))
	});

gulp.task('watch', ['html', 'sass', 'js'], function () {
	gulp.watch('./src/scss/*.scss', ['sass']);
	gulp.watch('./dist/*.html');
	gulp.watch('./src/js/*.js');
	gulp.watch('./dist/js/*.js');
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