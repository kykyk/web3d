'use strict';

// ================ import ================

const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const sass = require('gulp-sass');
const tslint = require('gulp-tslint');

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

/**
 * compile sass file
 */
gulp.task('styles',
    () => gulp.src(sassPaths.src)
        .pipe(sourcemaps.init())
        .pipe(sass.sync({includePaths: sassPaths.include}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(sassPaths.dest))
);

/**
 * copy fonts
 */
gulp.task('fonts', () => gulp.src(fontsPaths.src)
    .pipe(gulp.dest(fontsPaths.dest))
);

/**
 * copy html
 */
gulp.task('pages', () => gulp.src(htmlPaths.src)
    .pipe(gulp.dest(htmlPaths.dest))
);

/**
 *  clean the contents of the distribution directory
*/
gulp.task('clean', function () {
    return del(`${dirs.dest}/**/*`);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", ["tslint"], () => {
    let tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write(".", {sourceRoot: '/src'}))
        .pipe(gulp.dest("build"));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
    return gulp.src(["src/**/*", "!**/*.ts"])
        .pipe(gulp.dest("build"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
        'core-js/client/shim.min.js',
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'reflect-metadata/Reflect.js',
        'rxjs/**/*.js',
        'zone.js/dist/**',
        '@angular/**/bundles/**'
    ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("build/lib"));
});


// ================ command ================


gulp.task('build', ['clean', 'default']);


// ================ watch ================


gulp.task('watch', () => {
    gulp.watch(`${dirs.src}/**/*`, ['build']);

});

