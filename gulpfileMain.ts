// ================ import ================
import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators'

const gulp = require("gulp");
const gutil = require("gulp-util");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const tslint = require('gulp-tslint');
const tsProject = tsc.createProject("tsconfig.json");

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
@Gulpclass()
export class Gulpfile {
    /**
     *  clean the contents in build folder
     */
    @Task()
    clean(cb: Function) {
        gutil.log('OK!!!');
        return del(`${dirs.dest}/**/*`, cb);
    }

    /**
     * compile sass file
     */
    @Task()
    styles() {
        return gulp.src(sassPaths.src)
            .pipe(sourcemaps.init())
            .pipe(sass.sync({includePaths: sassPaths.include}).on('error', sass.logError))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(sassPaths.dest));
    }

    /**
     * copy fonts
     */
    @Task()
    fonts() {
        return gulp.src(fontsPaths.src)
            .pipe(gulp.dest(fontsPaths.dest));
    }

    /**
     * copy html
     */
    @Task()
    pages() {
        return gulp.src(htmlPaths.src)
            .pipe(gulp.dest(htmlPaths.dest))
    }

    /**
     * Lint all custom TypeScript files.
     */
    @Task()
    tslint() {
        return gulp.src(`${dirs.src}/**/*.ts`)
            .pipe(tslint({
                formatter: 'prose'
            }))
            .pipe(tslint.report());
    }

    /**
     * Compile TypeScript sources and create sourcemaps in build directory.
     */
    @Task()
    compile() {
        let tsResult = gulp.src(`${dirs.src}/**/*.ts`)
            .pipe(sourcemaps.init())
            // .pipe(tsc(tsProject))
            .pipe(tsProject())
            ;
        return tsResult.js
            .pipe(sourcemaps.write(".", {sourceRoot: dirs.src}))
            .pipe(gulp.dest(dirs.dest));
    }

    /**
     * Copy all resources that are not TypeScript files into build directory.
     */
    @Task()
    resources() {
        return gulp.src([`${dirs.src}/**/*`, "!**/*.ts"])
            .pipe(gulp.dest(dirs.dest));
    }

    /**
     * Copy all required libraries into build directory.
     */
    @Task()
    libs() {
        return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**/*.js',
            'zone.js/dist/**',
            '@angular/**/bundles/**'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
            .pipe(gulp.dest(`${dirs.dest}/lib`));
    }

    @Task()
    jsfiles(){
        return gulp.src([`${dirs.src}/systemjs.config.js`])
            .pipe(gulp.dest(dirs.dest));
    }

    @SequenceTask()
    default() {
        return ['clean','libs', 'jsfiles','pages','fonts','styles','tslint', 'compile']
    }
}


// ================ command ================


gulp.task('build', ['clean', 'default']);


// ================ watch ================


gulp.task('watch', () => {
    gulp.watch(`${dirs.src}/**/*`, ['build']);

});

