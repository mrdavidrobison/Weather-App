var gulp = require('gulp');
var jade = require('gulp-jade');
var browserSync = require('browser-sync').create();

gulp.task('jade', function(){
  gulp.src('./src/*.jade')
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest('./dist'))
})

gulp.task('watch', function(){
  gulp.watch('./src/*.jade', ['jade'])
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});

gulp.task('default', ['jade', 'watch', 'browser-sync'])

gulp.task('sass-watch', ['sass'], browserSync.reload);