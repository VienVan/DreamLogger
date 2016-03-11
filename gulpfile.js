var gulp     = require('gulp'),
    sass     = require('gulp-sass');

gulp.task('default', ['styles', 'watch']);

gulp.task('styles', function() {
  gulp.src('src/sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css/'));
})

gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.scss', ['styles']);
})
