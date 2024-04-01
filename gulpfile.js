const gulp = require('gulp');
const jade = require('gulp-jade');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();

// Task to compile Jade files
gulp.task('compile-jade', function() {
  return gulp.src('./src/**/*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./dist'));
});

// Task to compile Stylus files
gulp.task('compile-stylus', function () {
  return gulp.src('./src/css/**/*.stylus')
    .pipe(stylus())
    .pipe(gulp.dest('./dist/css'));
});

// Task to copy JavaScript files
gulp.task('copy-js', function () {
  return gulp.src('./src/scripts/**/*.js')
    .pipe(gulp.dest('./dist/scripts'));
});

// Task to initialize BrowserSync
gulp.task('sync', function() {
  browserSync.init({
    server: { baseDir: "./dist" },
    injectChanges: false,
    files: ["./dist/**/*.{html,htm,css,js}"]
  });
});

// Default task to compile all assets and start BrowserSync
gulp.task('default', gulp.series(['compile-jade', 'compile-stylus', 'copy-js', 'sync'], function(done) {
  // Watch for changes in source files and trigger corresponding tasks
  watch('./src/**/*.jade', gulp.series('compile-jade'));
  watch('./src/css/**/*.styl', gulp.series('compile-stylus'));
  watch('./src/scripts/**/*.js', gulp.series('copy-js'));
  done();
}));
