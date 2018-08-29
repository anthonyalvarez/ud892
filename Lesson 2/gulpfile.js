/*eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');


gulp.task('default', ['styles', 'lint'], function() {
  gulp.watch('sass/**/*.scss', ['styles'] );
  gulp.watch('js/**/*.js', ['lint']);
  console.log('hello world!');
  browserSync.init({
    server: './'
  });
  browserSync.stream();
});

gulp.task ('lint', function(){
  return gulp.src(['js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', function () {
  return gulp.src('test/spec/extraSpec.js')
    .pipe(jasmine ({
      integation: true,
      vendor: 'js/**/*.js'
    }));
});

gulp.task('styles', function() {
  gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./css'));
});
