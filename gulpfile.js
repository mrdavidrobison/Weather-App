var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync').create();

// Define tasks for compiling Jade, Stylus, and JavaScript files

gulp.task('compile-jade', function() {
  return gulp.src('./src/**/*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('compile-stylus', function () {
  return gulp.src('./css/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy-js', function () {
  return gulp.src('./scripts/**/*.js')
    .pipe(gulp.dest('./dist/scripts'));
});

// Define task for initializing BrowserSync

gulp.task('sync', function() {
  browserSync.init({
    server: { baseDir: "./dist" },
    injectChanges: false,
    files: ["./dist/**/*.{html,htm,css,js}"]
  });
});

// Define the 'default' task

gulp.task('default', gulp.series(['compile-jade', 'compile-stylus', 'copy-js', 'sync'], function() {
  // Watch for changes in source files and trigger corresponding tasks
  gulp.watch('./src/**/*.jade', gulp.series('compile-jade'));
  gulp.watch('./css/**/*.styl', gulp.series('compile-stylus'));
  gulp.watch('./scripts/**/*.js', gulp.series('copy-js'));
}));
