/*eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');


gulp.task('default', ['copy-html', 'copy-images','styles', 'lint'], function() {
  gulp.watch('sass/**/*.scss', ['styles'] );
  gulp.watch('js/**/*.js', ['lint']);
  gulp.watch('/index.html', ['copy-html']);
  gulp.watch('./dist/index.html').on('change', browserSync.reload);
  console.log('hello world!');
  browserSync.init({
    server: './dist'
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
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('copy-html', function() {
  gulp.src('./index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function(){
  gulp.src('img/*')
    .pipe(gulp.dest('dist/img'));
});

