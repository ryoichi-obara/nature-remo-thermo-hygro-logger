const gulp = require('gulp');
const clean = require('gulp-clean');
const install = require('gulp-install');
const zip = require('gulp-zip');

gulp.task('clean', () => {
  return gulp.src('./build/*', { read: false })
    .pipe(clean());
});

gulp.task('install-dependancies', () => {
  return gulp.src('./package.json')
    .pipe(gulp.dest('./build'))
    .pipe(install({ production: true }));
});

gulp.task('build-zip', () => {
  return gulp.src('./build/**/*')
    .pipe(zip('payload.zip'))
    .pipe(gulp.dest('./build'));
});
