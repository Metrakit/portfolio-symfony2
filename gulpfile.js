var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    browserSync     = require('browser-sync'),
    sourcemaps      = require('gulp-sourcemaps'),
    minimist        = require('minimist'),
    gulpif          = require('gulp-if');
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
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('main.min.css'))
        .pipe(gulpif(options.env != "prod", sourcemaps.write('maps')))
        //.pipe(uncss({
        //    html: ['**/*.html.twig', 'http://www.projec.dev']
        //}))
        .pipe(gulp.dest('web/css')) 
        .pipe(reload({stream:true}));
});

gulp.task('js', function() {
    return gulp.src(['bower_components/**/*.min.js', 'assets/js/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
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