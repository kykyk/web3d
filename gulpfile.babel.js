'use strict';

// ================ import ================

import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import tsify from 'tsify';
import browserify from 'browserify';
import gutil from 'gulp-util';
import source from 'vinyl-source-stream';
import del from 'del';

// ================ main const ================

const dirs = {
    src: './source',
    dest: './build',
    bower: './bower_components',
};

const packageDirs = {
    bootstrap: `${dirs.bower}/bootstrap-sass`,
    fontawesome: `${dirs.bower}/font-awesome`,
};

const sassPaths = {
    src: `${dirs.src}/sass/**/*.scss`,
    dest: `${dirs.dest}/css`,
    include: [
        `${packageDirs.bootstrap}/assets/stylesheets`,
        `${packageDirs.fontawesome}/scss`
    ],

};

const fontsPaths = {
    src: [
        `${packageDirs.bootstrap}/assets/fonts/**/*.*`,
        `${packageDirs.fontawesome}/fonts/**/*.*`,
    ],
    dest: `${dirs.dest}/fonts`,
};

const htmlPaths = {
    src: `${dirs.src}/**/*.html`,
    dest: `${dirs.dest}`,
};


// ================ task ================


//compile sass file
gulp.task('styles',
    () => gulp.src(sassPaths.src)
        .pipe(sourcemaps.init())
        .pipe(sass.sync({includePaths: sassPaths.include}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(sassPaths.dest))
);

//copy fonts
gulp.task('fonts', () => gulp.src(fontsPaths.src)
    .pipe(gulp.dest(fontsPaths.dest))
);

//copy html
gulp.task('pages', () => gulp.src(htmlPaths.src)
    .pipe(gulp.dest(htmlPaths.dest))
);

gulp.task('tsconf', () => {
        return browserify({
            basedir: '.',
            debug: true,
            entries: ['src/main.ts'],
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(dirs.dest));
    }
);

//for command `gulp`
gulp.task('default', ['styles', 'fonts', 'pages'],function () {
    return browserify({
        // basedir: '.',
        debug: true,
        entries: ['source/bootstrap.ts'],
        // cache: {},
        // packageCache: {}
    })
        .plugin(tsify,{
            target: 'es5',
            experimentalDecorators: true,
        })
        .bundle()
        .on('error', function(err){
            gutil.log(gutil.colors.red.bold('[browserify error]'));
            gutil.log(err.message);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(dirs.dest));
});

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del(`${dirs.dest}/**/*`);
});


// ================ command ================


gulp.task('build',['clean', 'default']);


// ================ watch ================


gulp.task('watch', ()=>{
    gulp.watch(`${dirs.src}/**/*`,['build']);

});

