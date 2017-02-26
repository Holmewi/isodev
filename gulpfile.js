// Include gulp and plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    util = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-clean-css'),
    browserify = require('gulp-browserify'),
    sourcemaps = require('gulp-sourcemaps');

var DevGulp = (function () {
	var srcAsset = function  (path) {
		return './assets' + path;
	};
	var destBuild = function (path) {
		return './www/build' + path;
	}
	return {
		srcAsset: srcAsset,
		destBuild: destBuild
	}
})();

/*	_________________________
	|	Helper for  development
*/	
gulp.task('lint', function() {
    return gulp.src(DevGulp.srcAsset('/js/**/*.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/*	_________________________
	|	Development tasks
*/	
gulp.task('sass', function () {
  return gulp.src(DevGulp.srcAsset('/scss/style.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(DevGulp.destBuild('/css')));
});

gulp.task('js', function () {
    return gulp.src(DevGulp.srcAsset('/js/**/*.js'))
        .pipe(concat('script.js'))
        .pipe(browserify())
        //.pipe(gulp.dest(DevGulp.destBuild('/js')))
        //.pipe(rename('script.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(DevGulp.destBuild('/js')));
});

/*	_________________________
	|	Production tasks
*/	
gulp.task('sass-prod', function () {
  return gulp.src(DevGulp.srcAsset('/scss/style.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(DevGulp.destBuild('/css')));
});

gulp.task('js-prod', function () {
    return gulp.src(DevGulp.srcAsset('/js/**/*.js'))
    	.pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(DevGulp.destBuild('/js')));
});

/*	_________________________
	|	Tasks
*/	
gulp.task('default', ['sass', 'js']);
gulp.task('prod', ['sass-prod', 'js-prod']);

/*	_________________________
	|	Watcher for development
*/
gulp.task('watch', ['default'], function () {
    var watch = {
        scss: [
            DevGulp.srcAsset('/scss/**/*.scss')
        ],
        js: [
            DevGulp.srcAsset('/js/**/*.js')
        ]
    };

    gulp.watch(watch.scss,['sass']).on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    gulp.watch(watch.js, ['js']).on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});