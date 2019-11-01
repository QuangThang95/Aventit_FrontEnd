var fs = require('fs-extra');
var jsonConcat = require('json-concat');
var writeJson = require('./write-json');

var ctlFallNavigatorDe = JSON.parse(
  fs.readFileSync('./i18n/CtlFallNavigator.de-CH.json', 'UTF-8')
);
var ctlFallNavigatorFr = JSON.parse(
  fs.readFileSync('./i18n/CtlFallNavigator.fr-CH.json', 'UTF-8')
);
var ctlFallNavigatorIt = JSON.parse(
  fs.readFileSync('./i18n/CtlFallNavigator.it-CH.json', 'UTF-8')
);

// map language local
const arrayToObject = arr =>
  Object.assign(
    {},
    ...arr.map(item => ({ [item['ControlName']]: item['Text'] }))
  );

// write file json
writeJson('./i18n/kiss/CtlFallNavigator.de.json', {
  'ctlFallNavigator': arrayToObject(ctlFallNavigatorDe)
});
writeJson('./i18n/kiss/CtlFallNavigator.fr.json', {
  'ctlFallNavigator': arrayToObject(ctlFallNavigatorFr)
});
writeJson('./i18n/kiss/CtlFallNavigator.it.json', {
  'ctlFallNavigator': arrayToObject(ctlFallNavigatorIt)
});

var localizationSourceFilesEN = [
  './i18n/general.en.json',
  './i18n/auth.en.json',
  './i18n/components.en.json',
  './i18n/persons.en.json',
  './i18n/kiss/CtlPendenzenVerwaltung.en.json',
  './i18n/kiss/Ctlh005fallnavigator.en.json',
  './i18n/kiss/Ctlvorlagenverwaltung.en.json',
  './i18n/kiss/CtlLandesxindex.en.json',
  './i18n/kiss/CtlAsvexport.en.json',
  './i18n/kiss/Ctlexterne-berater.en.json',
  './i18n/kiss/CtlGemeindeDaten.en.json',
  './i18n/kiss/Ctluber.en.json',
  './i18n/kiss/CtlGehezu.en.json',
  './i18n/kiss/CtlModuleConfig.en.json',
  './i18n/kiss/CtlBfsDokumente.en.json',
  './i18n/kiss/CtlFallfuhrung.en.json',
  './i18n/kiss/CtlBfsDossiers.en.json',
  './i18n/kiss/CtlBeratungsphase.en.json',
  './i18n/kiss/CtlBasis-textmarken.en.json',
  './i18n/kiss/CtlKurs.en.json',
  './i18n/kiss/CtlBaland.en.json',
  './i18n/kiss/CtlVorlagenKontext.en.json',
  './i18n/kiss/Ctlfa-aktennotiz.en.json',
  './i18n/kiss/CtlGemeindeCode.en.json',
  './i18n/kiss/CtlPostleitzahlen.en.json',
  './i18n/kiss/CtlvorlagenProfile.en.json',
  './i18n/kiss/CtlBfsFragenkatalog.en.json',
  './i18n/kiss/CtlWhLeistung.en.json',
  './i18n/kiss/CtlBfsKonfiguration.en.json',
  './i18n/kiss/CtlPlausifehler.en.json',
  './i18n/kiss/CtlKennzahlen.en.json',
  './i18n/kiss/CtlDemografie-history.en.json',
  './i18n/kiss/CtlKlientensystem.en.json',
  './i18n/kiss/CtlDemografie-history.en.json',
  './i18n/kiss/CtlAhvBeitrage.en.json',
  './i18n/kiss/CtlGemeindeVariablen.en.json',
  './i18n/kiss/CtlArbeit.en.json',
  './i18n/kiss/CtlFallbearbeitung.en.json',
  './i18n/kiss/Ctlpersonen-im-haushalt.en.json',
  './i18n/kiss/CtlTitleComponent.en.json',
  './i18n/kiss/CtlProgressBarComponent.en.json',
  './i18n/kiss/CtlGrundBedarf.en.json',
  './i18n/kiss/CtlZulagen-efb.en.json',
  './i18n/kiss/Inkassofall.en.json',
  './i18n/kiss/CtlVermogen.en.json'
];

var localizationSourceFilesDE = [
  './i18n/general.de.json',
  './i18n/auth.de.json',
  './i18n/components.de.json',
  './i18n/persons.de.json',
  './i18n/kiss/CtlFallNavigator.de.json',
  './i18n/kiss/CtlPendenzenVerwaltung.de.json',
  './i18n/kiss/Ctlh005fallnavigator.de.json',
  './i18n/kiss/Ctlvorlagenverwaltung.de.json',
  './i18n/kiss/CtlLandesxindex.de.json',
  './i18n/kiss/CtlAsvexport.de.json',
  './i18n/kiss/Ctlexterne-berater.de.json',
  './i18n/kiss/CtlGemeindeDaten.de.json',
  './i18n/kiss/Ctluber.de.json',
  './i18n/kiss/CtlGehezu.de.json',
  './i18n/kiss/CtlModuleConfig.de.json',
  './i18n/kiss/CtlBfsDokumente.de.json',
  './i18n/kiss/CtlFallfuhrung.de.json',
  './i18n/kiss/CtlBfsDossiers.de.json',
  './i18n/kiss/CtlBeratungsphase.de.json',
  './i18n/kiss/CtlBasis-textmarken.de.json',
  './i18n/kiss/CtlKurs.de.json',
  './i18n/kiss/CtlVorlagenKontext.de.json',
  './i18n/kiss/CtlBaland.de.json',
  './i18n/kiss/Ctlfa-aktennotiz.de.json',
  './i18n/kiss/CtlGemeindeCode.de.json',
  './i18n/kiss/CtlPostleitzahlen.de.json',
  './i18n/kiss/CtlvorlagenProfile.de.json',
  './i18n/kiss/CtlBfsFragenkatalog.de.json',
  './i18n/kiss/CtlWhLeistung.de.json',
  './i18n/kiss/CtlDemografie-history.de.json',
  './i18n/kiss/CtlBfsKonfiguration.de.json',
  './i18n/kiss/CtlKlientensystem.de.json',
  './i18n/kiss/CtlPlausifehler.de.json',
  './i18n/kiss/CtlDemografie-history.de.json',
  './i18n/kiss/CtlAhvBeitrage.de.json',
  './i18n/kiss/CtlKennzahlen.de.json',
  './i18n/kiss/CtlDemografie-history.de.json',
  './i18n/kiss/CtlGemeindeVariablen.de.json',
  './i18n/kiss/CtlArbeit.de.json',
  './i18n/kiss/CtlFallbearbeitung.de.json',
  './i18n/kiss/Ctlpersonen-im-haushalt.de.json',
  './i18n/kiss/CtlTitleComponent.de.json',
  './i18n/kiss/CtlProgressBarComponent.de.json',
  './i18n/kiss/CtlGrundBedarf.de.json',
  './i18n/kiss/CtlZulagen-efb.de.json',
  './i18n/kiss/Inkassofall.de.json',
  './i18n/kiss/CtlVermogen.de.json'
];

var localizationSourceFilesFr = [
  './i18n/general.fr.json',
  './i18n/kiss/CtlFallNavigator.fr.json',
  './i18n/kiss/CtlPendenzenVerwaltung.fr.json',
  './i18n/kiss/Ctlh005fallnavigator.fr.json',
  './i18n/kiss/CtlLandesxindex.fr.json',
  './i18n/kiss/Ctlvorlagenverwaltung.fr.json',
  './i18n/kiss/CtlAsvexport.fr.json',
  './i18n/kiss/Ctlexterne-berater.fr.json',
  './i18n/kiss/CtlGemeindeDaten.fr.json',
  './i18n/kiss/Ctluber.fr.json',
  './i18n/kiss/CtlAsvexport.fr.json',
  './i18n/kiss/Ctlexterne-berater.fr.json',
  './i18n/kiss/CtlGehezu.fr.json',
  './i18n/kiss/CtlModuleConfig.fr.json',
  './i18n/kiss/CtlBfsDokumente.fr.json',
  './i18n/kiss/CtlFallfuhrung.fr.json',
  './i18n/kiss/CtlBfsDossiers.fr.json',
  './i18n/kiss/CtlBeratungsphase.fr.json',
  './i18n/kiss/CtlBasis-textmarken.fr.json',
  './i18n/kiss/CtlKurs.fr.json',
  './i18n/kiss/CtlVorlagenKontext.fr.json',
  './i18n/kiss/CtlBaland.fr.json',
  './i18n/kiss/Ctlfa-aktennotiz.fr.json',
  './i18n/kiss/CtlGemeindeCode.fr.json',
  './i18n/kiss/CtlPostleitzahlen.fr.json',
  './i18n/kiss/CtlvorlagenProfile.fr.json',
  './i18n/kiss/CtlBfsFragenkatalog.fr.json',
  './i18n/kiss/CtlWhLeistung.fr.json',
  './i18n/kiss/CtlDemografie-history.fr.json',
  './i18n/kiss/CtlBfsKonfiguration.fr.json',
  './i18n/kiss/CtlKlientensystem.fr.json',
  './i18n/kiss/CtlPlausifehler.fr.json',
  './i18n/kiss/CtlDemografie-history.fr.json',
  './i18n/kiss/CtlAhvBeitrage.fr.json',
  './i18n/kiss/CtlKennzahlen.fr.json',
  './i18n/kiss/CtlDemografie-history.fr.json',
  './i18n/kiss/CtlArbeit.fr.json',
  './i18n/kiss/CtlGemeindeVariablen.fr.json',
  './i18n/kiss/CtlArbeit.fr.json',
  './i18n/kiss/CtlFallbearbeitung.fr.json',
  './i18n/kiss/Ctlpersonen-im-haushalt.fr.json',
  './i18n/kiss/CtlTitleComponent.fr.json',
  './i18n/kiss/CtlProgressBarComponent.fr.json',
  './i18n/kiss/CtlGrundBedarf.fr.json',
  './i18n/kiss/CtlZulagen-efb.fr.json',
  './i18n/kiss/Inkassofall.fr.json',
  './i18n/kiss/CtlVermogen.fr.json'
];

var localizationSourceFilesIt = [
  './i18n/general.it.json',
  './i18n/kiss/CtlFallNavigator.it.json',
  './i18n/kiss/CtlBfsDokumente.it.json',
  './i18n/kiss/CtlLandesxindex.it.json',
  './i18n/kiss/Ctlexterne-berater.it.json',
  './i18n/kiss/CtlAsvexport.it.json',
  './i18n/kiss/Ctluber.it.json',
  './i18n/kiss/CtlBasis-textmarken.it.json',
  './i18n/kiss/CtlFallfuhrung.it.json',
  './i18n/kiss/CtlBfsDossiers.it.json',
  './i18n/kiss/CtlModuleConfig.it.json',
  './i18n/kiss/Ctlfa-aktennotiz.it.json',
  './i18n/kiss/CtlWhLeistung.it.json',
  './i18n/kiss/CtlBfsKonfiguration.it.json',
  './i18n/kiss/Ctllandesxindex.it.json',
  './i18n/kiss/CtlAsvexport.it.json',
  './i18n/kiss/Ctluber.it.json',
  './i18n/kiss/CtlGehezu.it.json',
  './i18n/kiss/CtlPlausifehler.it.json',
  './i18n/kiss/CtlKennzahlen.it.json',
  './i18n/kiss/CtlFallbearbeitung.it.json',
  './i18n/kiss/Ctlpersonen-im-haushalt.it.json',
  './i18n/kiss/CtlDemografie-history.it.json',
  './i18n/kiss/CtlAhvBeitrage.it.json',
  './i18n/kiss/Ctlvorlagenverwaltung.it.json',
  './i18n/kiss/CtlVorlagenKontext.it.json',
  './i18n/kiss/CtlKlientensystem.it.json',
  './i18n/kiss/CtlvorlagenProfile.it.json',
  './i18n/kiss/CtlBeratungsphase.it.json',
  './i18n/kiss/Ctlh005fallnavigator.it.json',
  './i18n/kiss/CtlTitleComponent.it.json',
  './i18n/kiss/CtlArbeit.it.json',
  './i18n/kiss/CtlGemeindeDaten.it.json',
  './i18n/kiss/CtlBaland.it.json',
  './i18n/kiss/CtlPostleitzahlen.it.json',
  './i18n/kiss/CtlBfsFragenkatalog.it.json',
  './i18n/kiss/CtlGemeindeCode.it.json',
  './i18n/kiss/CtlGemeindeVariablen.it.json',
  './i18n/kiss/CtlKurs.it.json',
  './i18n/kiss/CtlProgressBarComponent.it.json',
  './i18n/kiss/CtlGrundBedarf.it.json',
  './i18n/kiss/CtlZulagen-efb.it.json',
  './i18n/kiss/CtlVermogen.it.json'
];

function mergeAndSaveJsonFiles(src, dest) {
  jsonConcat({ src: src, dest: dest }, function (res) {
    console.log('Localization files successfully merged!');
  });
}

// Merge all localization files into one
mergeAndSaveJsonFiles(localizationSourceFilesEN, "./i18n/dist/en.json");
mergeAndSaveJsonFiles(localizationSourceFilesDE, "./i18n/dist/de.json");
mergeAndSaveJsonFiles(localizationSourceFilesFr, "./i18n/dist/fr.json");
mergeAndSaveJsonFiles(localizationSourceFilesIt, "./i18n/dist/it.json");
