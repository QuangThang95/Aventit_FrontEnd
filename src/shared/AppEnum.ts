
export namespace AppEnums {
    export enum PageType {
        login,
        menu,
        dossier,
        persons,
        pendenzen,
        fallnavigator,
        fallbearbeitung,
        vorlagenverwaltung,
        personalstamp,
        berater,
        landesxindex,
        asvexport,
        uber,
        basistextmarken,
        moduleVorlagenNavigatorItems,
        personenstamm,
        fallfuhrung,
        sostat,
        beratungsphase,
        kurs,
        vorlagenKontext,
        baland,
        whleistung,
        vorlagenprofile,
        plausifehler,
        ctlbfsfragenkatalog,
        klientensystem,
        ahvBeitrage,
        kennzahlen,
        arbeit,
        demografie,
        gemeindeVariablen,
        gemeindecode,
        grundBedarf,
    }
    // define feature module
    export enum FeatureModule {
        dossier = 'dossier',
        persons = 'persons',
        pendenzen = 'pendenzen',
        fallnavigator = 'fallnavigator',
        student = 'student',
        personalstamp = 'personalstamp',
        berater = 'berater',
        vorlagenverwaltung = 'vorlagenverwaltung',
        gehezu = 'gehezu',
        landesxindex = 'landesxindex',
        asvexport = 'asvexport',
        fallfuhrungTree = 'fallfuhrungTree',
        uber = 'uber',
        ctlbfsdokumente = 'ctlbfsdokumente',
        fallfuhrung = 'fallfuhrung',
        gemeindedaten = 'gemeindedaten',
        sostat = 'sostat',
        moduleConfigNavigator = 'moduleConfigNavigator',
        beratungsphase = 'beratungsphase',
        konfiguration = 'konfiguration',
        basistextmarken = 'basistextmarken',
        moduleVorlagenNavigatorItems = 'moduleVorlagenNavigatorItems',
        kontakts = 'kontakts',
        kurs = 'kurs',
        baland = 'baland',
        vorlagenKontext = 'vorlagenKontext',
        whleistung = 'whleistung',
        postleitzahlenAktualisieren = 'postleitzahlenAktualisieren',
        faaktennotiz = 'faaktennotiz',
        gemeindecode = 'gemeindecode',
        plausifehler = 'plausifehler',
        ctlbfsfragenkatalog = 'ctlbfsfragenkatalog',
        popover = 'popover',
        klientensystem = 'klientensystem',
        vorlagenprofile = 'vorlagenProfile',
        ahvBeitrage = 'ahvBeitrage',
        kennzahlen = 'kennzahlen',
        arbeit = 'arbeit',
        demografie = 'demografie',
        gemeindeVariablen = 'gemeindeVariablen',
        personenimhaushalt = 'personenimhaushalt',
        grundBedarf = 'grundBedarf',
        vermogen = 'vermogen',
        inkassofall = 'inkassofall',
    }
    // define keycode
    export enum KeyCode {
        KeyEnter = 13,
        KeyNumber0 = 48,
        KeyNumber1 = 49,
        KeyNumber2 = 50,
        KeyNumber3 = 51,
        KeyNumber4 = 52,
        KeyNumber5 = 53,
        KeyNumber6 = 54,
        KeyNumber7 = 55,
        KeyNumber8 = 56,
        KeyNumber9 = 57,
        KeyG = 71,
        KeyD = 68,
        KeyS = 83,
        KeyZ = 90,
        KeyI = 73,
        KeyM = 77,
        KeyB = 66,
        KeyK = 75,
        KeyF = 70,
        KeyE = 69,
        LeftArrowKey = 37,
        UpArrowKey = 38,
        RightArrowKey = 39,
        DownArrowKey = 40,
        KeyF5 = 116,
        Space = 32,
        KeyV = 86,
        KeyA = 65,
        KeyTab = 9,
        KeyF4 = 115,
        Dot = 190,
        BackSpace = 8,
        KeyR = 82,
        KeyQ = 81,
        KeyF2 = 113,
        KeyShift = 16
    }

    export enum StatusCode {
        STATUS_OK = 200,
        STATUS_CODE_409 = 409,
        LIMIT_FILE_SIZE = 413,
        XML_FORMAT = 415,
        STATUS_CODE_421 = 421,
        UNPROCESSABLE_ENTITY = 422,
        STATUS_CODE_428 = 428,
        BAD_REQUEST = 400,
        STATUS_CODE_500 = 500,
        STATUS_CODE_404 = 404
    }

    export enum BusinessErrorCode {
        BUSINESS_ERROR_CODE_409001 = 409001,
        BUSINESS_ERROR_CODE_409002 = 409002,
        BUSINESS_ERROR_CODE_409003 = 409003,
        BUSINESS_ERROR_CODE_421001 = 421001,
        UNPROCESSABLE_ENTITY = 422002,
        BUSINESS_ERROR_CODE_428001 = 428001,
        BUSINESS_ERROR_CODE_404001 = 404001
    }

    export enum Validation {
        MAX_INTEGER_VALUE = 2147483647,
        MAX_LENGTH_INPUT_VALIDATOR = 400,
        NUMBER_FORMAT = '#,###.##',
        C007_NUMBER_FORMAT = '#,##0.00',
        DATE_FORMAT = 'dd.MM.yyyy'
    }

    export enum Money {
        MAX_VALUE = 922337203685477.5807,
        MIN_VALUE = -922337203685477.5808
    }
    export enum Int {
        MAX_VALUE = 2147483647,
        MIN_VALUE = -2147483648
    }
    export enum GehezuKey {
        WhFinanzplan = 'WhFinanzplan',
        WhEinzelzahlung = 'WhEinzelzahlung',
        WhFinanzplanSIL = 'WhFinanzplanSIL',
        AyFinanzplan = 'AyFinanzplan',
        AyEinzelzahlung = 'AyEinzelzahlung',
        FaLeistung = 'FaLeistung'
    }
    export enum GeheZuEnum {
        WhFinanzplan = 1,
        WhEinzelzahlung = 2,
        WhFinanzplanSIL = 3,
        AyFinanzplan = 4,
        AyEinzelzahlung = 5,
        FaLeistung = 6,
    }
    export enum TemplateExcel {
        HeaderBackgroundColor = '#D2B48C',
    }
    export enum BgBewilligungStatusCode {
        InVorbereitung = 1,
        Abgelehnt = 2,
        Angefragt = 3,
        Erteilt = 5,
        Gesperrt = 9
    }
    export enum ScreenResolution {
        LARGE = 'lg',
        EXTRA_SMALL = 'xs',
        MEDIUM = 'md',
        SMALL = 'sm'
    }
}

export namespace LOV {

    export enum AbzahlungskontoAbschlussgrund {
        KontoWirdNichtAusgeglichen = 1,
        UebergabeAnInkasso = 2
    }

    export enum BFSFeldCode {
        Text = 2,
        Zahl = 4,
        Datum = 5,
        CheckBox = 7,
        Auswahl = 8
    }

    export enum BgGruppeCode {
        Erwerbseinkommen = 3101,
        Alimentenguthaben = 3102,
        Einkommen_aus_Versicherungsleistungen = 3103,
        Vermoegen_und_Vermoegensverbrauch = 3104,
        Med_Grundversorgung = 3202,
        Wohnkosten = 3206,
        Situationsbedingte_Leistungen = 3901,
        Krankheits_und_behinderunsbedingte_Leistungen = 3902,
        Leistungen_fuer_Therapie_und_Entzugsmassnahmen = 3903,
        Wiedereingliederung = 3904,
        AHV_Beitraege = 3905,
        EFB_Erwerbsaufnahme = 39100,
        EFB = 39120,
        IZU_Alleinerziehend = 39210
    }



    export enum BgKategorieCode {
        Einnahmen = 1,
        Ausgaben = 2,
        Abzahlung = 3,
        Kuerzungen = 4,
        Vermoegen = 5,
        Vorabzuege = 6,
        Zusaetzliche_Leistungen = 100,
        Einzelzahlungen = 101
    }

    export enum BgPositionsArt {
        Miete_Gem_Richtlinie = 62,
        Vermoegensverbrauch = 31050,
        KVG_Krankenkassenpraemien = 32020,
        VVG = 32021,
        VVG_Praemie_SIL = 32022,
        KVG_GBL = 32023,
        KVG_Uebernahme_durch_SD = 32024,
        Eff_Erwerbsunkosten = 32030,
        Allg_Erwerbsunkosten = 32031,
        KVG_Erwachsene_Region_1 = 32121,
        KVG_Erwachsene_Region_2 = 32122,
        KVG_Erwachsene_Region_3 = 32123,
        KVG_Junge_Erwachsene_Region_1 = 32124,
        KVG_Junge_Erwachsene_Region_2 = 32125,
        KVG_Junge_Erwachsene_Region_3 = 32126,
        KVG_Kinder_Region_1 = 32127,
        KVG_Kinder_Region_2 = 32128,
        KVG_Kinder_Region_3 = 32129,
        KVG_EL = 32130
    }

    export enum KaAnweisung {
        Zuweisung = 1,
        Anweisung = 2,
        Verlaengerung = 3,
        EinsatzOhneAnweisung = 4,
    }

    export enum WhHilfeTypCode {
        Ueberbrueckungshilfe = 1,
        Regulaerer_Finanzplan = 2,
        Admin_Fallfuehrung = 3
    }
}
