var gulp   = require('gulp'); 
var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

var reload = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "www.project.dev"
    });
});

gulp.task('sass', function() {
    return gulp.src(['assets/scss/*.scss', 'bower_components/**/*.min.css'])
        .pipe(sass())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('web/css'))
        .pipe(reload({stream:true}));
});

gulp.task('js', function() {
    return gulp.src(['assets/js/*.js', 'bower_components/**/*.min.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('web/js'));
});

gulp.task('fonts', function() {
    return gulp.src(['bower_components/font-awesome/fonts/fontawesome-webfont.*'])
            .pipe(gulp.dest('web/fonts'));
});

gulp.task('watch', function() {
    gulp.watch('assets/js/*.js', ['js', browserSync.reload]);
    gulp.watch('assets/sass/*.scss', ['sass']);
    gulp.watch("**/*.html.twig").on("change", browserSync.reload);
});

gulp.task('default', ['sass', 'js', 'fonts', 'watch', 'browser-sync']);