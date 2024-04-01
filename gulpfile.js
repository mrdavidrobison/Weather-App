var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync').create();

gulp.task('compile-jade', function() {
  return gulp.src('./src/**/*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('compile-stylus', function () {
  return gulp.src('./src/css/**/*.stylus')
    .pipe(stylus())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy-js', function () {
  return gulp.src('./src/scripts/**/*.js')
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('sync', function() {
  browserSync.init({
    server: { baseDir: "./dist" },
    injectChanges: false,
    files: ["./dist/**/*.{html,htm,css,js}"]
  });
});

gulp.task('default', gulp.series(['compile-jade', 'compile-stylus', 'copy-js', 'sync'], function(done) {
  // Watch for changes in source files and trigger corresponding tasks
  gulp.watch('./src/**/*.jade', gulp.series('compile-jade'));
  gulp.watch('./src/css/**/*.styl', gulp.series('compile-stylus'));
  gulp.watch('./src/scripts/**/*.js', gulp.series('copy-js'));
  done();
}));
