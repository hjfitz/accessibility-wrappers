const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const jsdocConfig = require('./jsdoc.config.json');
/**
 * generate some JSDoc for every js file in src/
 * @type {Function}
 */
gulp.task('doc', cb => {
  gulp.src(['./js/**/*.js']).pipe(jsdoc(jsdocConfig, cb));
});

/**
 * Watch the files for changes. If they change, re-babel-ify the files in src/
 * Also regenerate the documentation.
 */
gulp.task('watch', () => {
  gulp.watch(['./js/*.js'], ['doc']);
});

/**
 * When Gulp is run, we want to transpile it and generate the docs
 * We then watch for any changes.
 */
gulp.task('default', ['doc']);
