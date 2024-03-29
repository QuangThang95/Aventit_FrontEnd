var fs = require('fs-extra');
var foldersToCopy = [
  {src: './config', dest: './dist/config'},
  {src: './i18n/dist', dest: './dist/i18n'},
  {src: './src/assets', dest: './dist/assets'},
  {src: './src/favicon.ico', dest: './dist'}
];

// copies directory, even if it has subdirectories or files
function copyDir(src, dest) {
  fs.copy(src, dest, function (err) {
    if (err) return console.error(err)
    console.log(src + ' folder successfully copied')
  });
}

for (var i = foldersToCopy.length - 1; i >= 0; i--) {
  copyDir(foldersToCopy[i].src, foldersToCopy[i].dest);
}