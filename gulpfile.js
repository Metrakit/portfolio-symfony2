/**
 * CMD : gulp --env="prod"
 * OR : gulp
 */

var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    browserSync     = require('browser-sync'),
    sourcemaps      = require('gulp-sourcemaps'),
    minimist        = require('minimist'),
    gulpif          = require('gulp-if'),
    minifyCSS       = require('gulp-minify-css'),
    notify          = require("gulp-notify"),
    plumber         = require('gulp-plumber'),
    jshint          = require('gulp-jshint'),
    stylish         = require('jshint-stylish');
//uncss               = require('gulp-uncss');

var options         = minimist(process.argv.slice(2)),
    reload          = browserSync.reload;


gulp.task('browser-sync', function() {
    browserSync({
        proxy: "www.project.dev"
    });
});

gulp.task('sass', function() {

    return gulp.src(['bower_components/**/*.min.css', 'assets/sass/*.scss'])
        .pipe(gulpif(options.env != "prod", sourcemaps.init()))
        .pipe(sass({
            errLogToConsole: false,
            onError: function(err) {
                return notify().write(err);
            }
        }))
        .pipe(concat('main.min.css'))
        .pipe(minifyCSS())
        .pipe(gulpif(options.env != "prod", sourcemaps.write('maps')))
        //.pipe(gulpif(options.env != "prod", uncss({
        //    html: ['**/*.html.twig', 'http://www.projec.dev']
        //})))
        .pipe(gulp.dest('web/css')) 
        .pipe(reload({stream:true}));

});

gulp.task('js', function() {

    gulp.src(['assets/js/*.js'])
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .on('error', notify.onError({ message: 'JS hint fail'}));   

    return gulp.src(['bower_components/**/*.min.js', 'assets/js/*.js'])
        .pipe(gulpif(options.env != "prod", sourcemaps.init()))
        .pipe(concat('main.min.js'))
        .pipe(gulpif(options.env == "prod", uglify()))
        .pipe(gulpif(options.env != "prod", sourcemaps.write('maps')))
        .pipe(gulp.dest('web/js'));   

});

gulp.task('fonts', function() {
    return gulp.src(['bower_components/font-awesome/fonts/fontawesome-webfont.*'])
            .pipe(gulp.dest('web/fonts'));
});

gulp.task('watch', ['js', 'sass'], function() {
    gulp.watch('assets/js/*.js', ['js', browserSync.reload]);
    gulp.watch('assets/sass/*.scss', ['sass']);
    gulp.watch("**/*.html.twig").on("change", browserSync.reload);
});

gulp.task('default', ['sass', 'js', 'fonts', 'watch', 'browser-sync']);