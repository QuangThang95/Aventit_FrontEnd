var fs = require('fs-extra');
var jsonConcat = require("json-concat");
var writeJson = require('./write-json');

var ctlFallNavigatorDe = JSON.parse(fs.readFileSync('./i18n/CtlFallNavigator.de-CH.json', 'UTF-8'));
var ctlFallNavigatorFr = JSON.parse(fs.readFileSync('./i18n/CtlFallNavigator.fr-CH.json', 'UTF-8'));
var ctlFallNavigatorIt = JSON.parse(fs.readFileSync('./i18n/CtlFallNavigator.it-CH.json', 'UTF-8'));

// map language local
const arrayToObject = (arr) => Object.assign({}, ...arr.map(item => ({ [item['ControlName']] : item['Text'] })));

// write file json
writeJson('./i18n/kiss/CtlFallNavigator.de.json', {'ctlFallNavigator': arrayToObject(ctlFallNavigatorDe)});
writeJson('./i18n/kiss/CtlFallNavigator.fr.json', {'ctlFallNavigator': arrayToObject(ctlFallNavigatorFr)});
writeJson('./i18n/kiss/CtlFallNavigator.it.json', {'ctlFallNavigator': arrayToObject(ctlFallNavigatorIt)});


var localizationSourceFilesEN = [
  "./i18n/general.en.json",
  "./i18n/auth.en.json",
  "./i18n/components.en.json",
  "./i18n/persons.en.json",
  "./i18n/kiss/CtlPendenzenVerwaltung.en.json"
];

var localizationSourceFilesDE = [
  "./i18n/general.de.json",
  "./i18n/auth.de.json",
  "./i18n/components.de.json",
  "./i18n/persons.de.json",
  "./i18n/kiss/CtlFallNavigator.de.json",
  "./i18n/kiss/CtlPendenzenVerwaltung.de.json"
];

var localizationSourceFilesFr = [
  "./i18n/kiss/CtlFallNavigator.fr.json",
  "./i18n/kiss/CtlPendenzenVerwaltung.fr.json"
];

var localizationSourceFilesIt = [
  "./i18n/kiss/CtlFallNavigator.it.json"
];

function mergeAndSaveJsonFiles(src, dest) {
  jsonConcat({ src: src, dest: dest },
    function (res) {
      console.log('Localization files successfully merged!');
    }
  );
}

// Merge all localization files into one
mergeAndSaveJsonFiles(localizationSourceFilesEN, "./i18n/dist/en.json");
mergeAndSaveJsonFiles(localizationSourceFilesDE, "./i18n/dist/de.json");
mergeAndSaveJsonFiles(localizationSourceFilesFr, "./i18n/dist/fr.json");
mergeAndSaveJsonFiles(localizationSourceFilesIt, "./i18n/dist/it.json");
