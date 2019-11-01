var fs = require('fs-extra');
function copyFile(src, dest) {
    fs.copyFile(src, dest, (err) => {
        if (err) throw err;
        console.log('ngsw-worker was copied to dist folder');
    });
}
// copy file ngsw-worker.js to ./dist
var fileToCopy = { src: './node_modules/@angular/service-worker/ngsw-worker.js', dest: './dist/ngsw-worker.js' };
copyFile(fileToCopy.src, fileToCopy.dest);
