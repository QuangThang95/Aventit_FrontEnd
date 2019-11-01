const UglifyJS = require("uglify-es");
const fs = require('fs-extra');
const glob = require("glob")

glob("./dist/*.**.chunk.js", function (er, files) {
    console.log('chunks: ', files);
    
    files.forEach(file => {
        var options = {
            mangle: {
                properties: true,
            },
        };

        fs.writeFileSync(file, UglifyJS.minify({
            file: fs.readFileSync(file, "utf8")
        }, options).code, "utf8");

    });
})

glob("./dist/vendor.**.js", function(er, files) {
    console.log('vendor: ', files);

    files.forEach(file => {
        var options = {
            mangle: {
                properties: true
            },
        };

        fs.writeFileSync(file, UglifyJS.minify({
            file: fs.readFileSync(file, "utf8")
        }, options).code, "utf8");

    });
})
