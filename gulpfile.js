const gulp = require('gulp');
const babel = require("gulp-babel");
const minify = require('gulp-minify');

/**
 * Compile ES6+ code to ES5.
 */
function compile() {

  return gulp.src('./src/script.js')
    .pipe(babel())
    .pipe(minify({
      ext: {
        src: '.source.js',
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest('./dist/'));
    
}

/**
 * Default GULP task
 */
gulp.task('default', function() {

  return compile();

});
