const gulp = require('gulp');

// packages
const plumber = require('gulp-plumber');
const sourcemaps = require("gulp-sourcemaps");
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');

// Lint scripts
function lint() {
  return gulp
    .src([
      './src/assets/js/components/**/*',
      './src/assets/js/app.js',
      './gulpfile.js'
    ])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
function vendors() {
  return gulp
    .src([
      './src/assets/js/vendors/jquery.min.js',
      './src/assets/js/vendors/*.js'
    ])
    .pipe(plumber())
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js/'));
}

// Transpile, concatenate and minify scripts
function build() {
  return gulp
    .src('./src/assets/js/app.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./dist/assets/js/'));
}

// exports (Common JS)
module.exports = {
  lint: lint,
  vendors: vendors,
  build: build
};
