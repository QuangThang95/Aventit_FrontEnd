'use strict';

var fs = require('fs');

module.exports = (name, obj) => {
    fs.exists(name, function (exists) {
        var json = JSON.stringify(obj);
        fs.writeFileSync(name, json, 'utf8', function (res) {
            console.log('Writed and save file into ' + name);
        });
    })
}