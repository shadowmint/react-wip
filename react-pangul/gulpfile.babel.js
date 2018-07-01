import run from 'run-sequence';
import nodeunit from 'gulp-nodeunit';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import intercept from 'gulp-intercept';
import gulp from 'gulp';

// Explicitly run items in order
gulp.task('default', (callback) => {
  run('scripts', 'style-scripts', 'tests', callback);
});

// Run tests
gulp.task('tests', () => gulp.src('./build/**/*.tests.js')
  .pipe(plumber())
  .pipe(nodeunit()));

// Compile ES6 scripts using babel
gulp.task('scripts', () => gulp.src(['./src/**/*.jsx', './src/**/*.js'])
  .pipe(plumber())
  .pipe(babel())
  .pipe(gulp.dest('./build')));

// Generate fake css files
gulp.task('style-scripts', () => gulp.src(['./src/**/*.scss'])
  .pipe(plumber())
  .pipe(intercept((fp) => {
    fp.contents = new Buffer('');
    return fp;
  }))
  .pipe(gulp.dest('./build')));
