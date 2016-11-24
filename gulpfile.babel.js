'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';


const dirs = {
  src: 'src',
  dest: 'build'
};

const sassPaths = {
  src: `${dirs.src}/app.scss`,
  dest: `${dirs.dest}/styles/`
};

gulp.task('styles', () => {
  return gulp.src(sassPaths.src)
    .pipe(sass.sync())
    .pipe(gulp.dest(sassPaths.dest));
});
