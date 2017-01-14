const through = require('through2');
const PluginError = require('gulp-util').PluginError;
const fs = require('fs');
const office2html = require('office2html');
const PLUGIN_NAME = 'gulp-example';
const gutil = require('gulp-util');

module.exports = function () {
    return through.obj(function (file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        }
        // else if (file.isBuffer()) {
        //     this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));
        // }

        let generateHtml = office2html.generateHtml;
        generateHtml(file.path, (err, result) => {
            let pathNewFile = file.path.substr(0, file.path.length - ('.docx').length) + '.html';
            let newFile = new gutil.File({
                base: file.base,
                cwd: file.cwd,
                path: pathNewFile,
                contents: fs.readFileSync(pathNewFile),
            });
            if (fs.existsSync(pathNewFile)) {
                file = newFile;
            }
            callback(null, file);
        });

    });
};