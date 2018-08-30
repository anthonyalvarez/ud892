/*eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');

gulp.task('default', ['copy-html', 'image-min','styles', 'lint'], function() {
  gulp.watch('sass/**/*.scss', ['styles'] );
  gulp.watch('js/**/*.js', ['lint']);
  gulp.watch('/index.html', ['copy-html']);
  gulp.watch('./dist/index.html').on('change', browserSync.reload);
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

gulp.task('scripts', function(){
  gulp.src('js/**/*.js')
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function(){
  gulp.src('js/**/*.js')
    .pipe(babel())
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('dist', [
  'copy-html',
  'image-min',
  'styles',
  'lint',
  'scripts-dist'
]);

gulp.task('image-min', function() {
  return gulp.src('img/*')
    .pipe(imagemin({
      progressive: true,
      use: [imageminPngquant()]
    }))
    .pipe(gulp.dest('dist/img'));
});
