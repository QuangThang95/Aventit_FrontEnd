export class CommonConstant {
    public static CurrentLangCulture = 'currentLang.Culture';
    public static DeCH = 'de-CH';
    public static institutionRequiredMessage = 'Das Feld \'Institution\' darf nicht leer bleiben !';
    public static nameRequiredMessage = 'Das Feld \'Name\' darf nicht leer bleiben !';
    public static vornameRequiredMessage = 'Das Feld \'Vorname\' darf nicht leer bleiben !';

    public static ToolbarButtons = [
        {
            name: 'printPdf',
            hint: 'Grid Drucken',
            icon: 'assets/icon/ic_printer.png',
            id: 'gridDruckenId'
        },
        {
            name: 'exportExcel',
            icon: 'assets/icon/ic_excel_export.png',
            hint: 'Excel Export',
            id: 'excelExportId'
        },
        {
            name: 'chooserColumn',
            hint: 'Spaltenauswahl',
            icon: 'assets/icon/ic_column_chooser.png',
            id: 'spaltenauswahlId'
        },
    ];
    public static ToolbarButtonsInvisible = [
        {
            visible: false,
            name: 'printPdf',
            hint: 'Grid Drucken',
            icon: 'assets/icon/ic_printer.png',
            id: 'gridDruckenId'
        },
        {
            visible: false,
            name: 'exportExcel',
            icon: 'assets/icon/ic_excel_export.png',
            hint: 'Excel Export',
            id: 'excelExportId'
        },
        {
            visible: false,
            name: 'chooserColumn',
            hint: 'Spaltenauswahl',
            icon: 'assets/icon/ic_column_chooser.png',
            id: 'spaltenauswahlId'
        },
    ];
    public static AdditionalButtons = [
        {
            locateInMenu: 'always',
            text: 'KissCommonBtn.Spaltenauswahl',
            name: 'chooserColumn'
        },
        {
            locateInMenu: 'always',
            text: 'KissCommonBtn.ExcelExport',
            name: 'exportExcel'
        },
        {
            locateInMenu: 'always',
            text: 'KissCommonBtn.GridDrucken',
            name: 'printPdf'
        },
        {
            locateInMenu: 'always',
            text: 'KissCommonBtn.Schnellfilterzeile',
            name: 'isSearch'
        },
        {
            locateInMenu: 'always',
            text: 'KissCommonBtn.Gruppierungsbereich',
            name: 'isGrouping'
        },
        {
            locateInMenu: 'always',
            text: 'KissCommonBtn.Suche',
            name: 'isSearchPanel'
        },
        {
            locateInMenu: 'always',
            text: 'KissCommonBtn.Filtereditor',
            name: 'isFilterBuilder'
        },
        {
            locateInMenu: 'always',
            text: 'KissCommonBtn.Loschen',
            name: 'deleteMenuItemTopGrd'
        },
        {
            locateInMenu: 'always',
            text: 'KissCommonBtn.GridEinstellungen',
            name: 'gridSetting'
        },
    ];

    public static DeleteBtn = 'deleteMenuItemTopGrd';
    public static GridSettingBtn = 'gridSetting';
    public static ListFullToolbarButtons = ['chooserColumn', 'exportExcel', 'printPdf'];
    public static isFilterBuilder = 'isFilterBuilder';
    public static LocalStorageUserId = 'user:userId';
    public static LocalStorageUserFirstName = 'user:firstName';
    public static LocalStorageUserLastName = 'user:lastName';
    public static LocalStorageToogleNavbar = 'settings:toogleNavbar';
    public static LocalStorageUser = 'user';
    public static FormatNumber = '#,###.00';
    public static FormatNumberAllowDelete = '#,###';
    public static FormatNumberLength = 20;
    public static FormatNumberDefault = {
        type: 'fixedPoint',
        precision: 0
    };

    public static ButtonExportExcel = 'exportExcel';
    public static ButtonPrintPdf = 'printPdf';
    public static ButtonColumnChooser = 'chooserColumn';
    public static ButtonGridSetting = 'gridSetting';
    public static ButtonGridDelete = 'deleteMenuItemTopGrd';
    public static ButtonDeleteSelectedRecord = 'delete';
    public static ButtonClosePopup = 'closePopup';

    // C005
    public static ButtonPlzDatenJetztAktualisieren = 'plz-daten-jetzt-aktualisieren';
    public static GridPostleitzahlen = 'c005_postleizahlen_data-grid';

    public static LocalStorageCurrentLang = 'currentLang.Culture';
    public static LocalStorageDefaltLang = 'de-CH';

    // set time out
    public static SetTimeOut = 100;
    public static SetTimeOut300 = 300;
    public static SetTimeOut400 = 400;
    public static SetTimeOut500 = 500;
    public static SetTimeOut900 = 900;
    public static SetTimeOut1000 = 1000;

    public static LanguageCode = 'languageCode';
    public static DefaltLanguageCode = 1;

    // key concurrency
    public static Concurrency = 'concurrency';

    // Kurs Form
    public static INT_MIN_VALUE = -2147483648;
    public static INT_MAX_VALUE = 2147483647;
    public static STRING_MAX_LENGTH = 100;
    public static FIX_WIDTH = 160;
    public static STRING_MAX_LENGTH_50 = 50;
    // number length
    public static DECIMA_SIZE = 3;
    public static MAX_LENGTH_NUMBER = 30;

    // date value
    public static DATE_MIN_FULLYEAR = 1753;
    public static DATE_MAX_FULLYEAR = 9999;
    public static DATE_MIN_MONTH = 1;
    public static DATE_MAX_MONTH = 12;
    // Grouping
    public static MenuGroupingHeaderGrid = ['Nach dieser Spalte gruppieren', 'Alle Gruppierung entfernen', 'Spalte ausblenden'];
    public static MenuGroupingContentGrid = ['Alle Gruppen erweitern', 'Alle Gruppen reduzieren'];

    // Icon for button C007
    public static IconAdd = 'assets/icon/ic_neue.png';
    public static IconEdit = 'assets/icon/ic_bearbeiten.png';
    public static IconSave = 'assets/icon/ic_speichern.png';
    public static IconCancel = 'assets/icon/ic_abbrechen.png';

    // Screen resolution
    public static SMALL_SCREEN_WIDTH = 960;
    public static SMALL_SCREEN_HEIGHT = 960;

    // Popup position
    public static POSITION_CENTER = 'center';
    public static POSITION_TOP = 'top';
    public static POSITION_BOTTOM = 'bottom';
    public static POSITION_COLLISION_FLIPFIT = 'flipfit';
    public static WidthNumberAndDateBox = '160px';
    public static FORMAT_DATE = 'dd.MM.yyyy';
    public static SCREEN_RESOLUTION_LARGE = 1300;
    public static FORMAT_DATE_MM_DD_YYYY = 'MM/DD/YYYY';

    public static KISS_MODULE = {
        B: { moduleID: 1, shortName: 'B', url: 'B/Basis/' },
        F: { moduleID: 2, shortName: 'F', url: 'F/Fallfuhrung/' },
        S: { moduleID: 3, shortName: 'S', url: 'S/Sozialhilfe/' },
        I: { moduleID: 4, shortName: 'I', url: 'I/Inkasso/' },
        M: { moduleID: 29, shortName: 'M', url: 'M/Kindes-undErwachsenenschutz/' },
        A: { moduleID: 6, shortName: 'A', url: 'A/Asyl/' },
        K: { moduleID: 7, shortName: 'K', url: 'K/Arbeit/' }
    };

    public static URLS_BY_ID = [
        { menuItemID: 858, url: 'modul-konfiguration/sozialhilfe/kostenarten' },
        { menuItemID: 859, url: '' },
        { menuItemID: 861, url: '' },
        { menuItemID: 919, url: '' },
        { menuItemID: 1222, url: '' },
        { menuItemID: 862, url: '' },
        { menuItemID: 863, url: '' },
        { menuItemID: 864, url: '' },
        { menuItemID: 866, url: '' },
        { menuItemID: 926, url: 'modul-konfiguration/inkasso/landesxindex' },
        { menuItemID: 1274, url: 'modul-konfiguration/stammdaten/gemeinde-aktualisieren' },
        { menuItemID: 1275, url: 'modul-konfiguration/stammdaten/lander-aktualisieren' },
        { menuItemID: 1276, url: 'modul-konfiguration/stammdaten/postleitzahlen-aktualisieren' },

        { menuItemID: 899, url: 'vorlagenverwaltung/vorlagen/vorlagen' },
        { menuItemID: 900, url: 'vorlagenverwaltung/vorlagen/kontext' },
        { menuItemID: 1230, url: 'vorlagenverwaltung/vorlagen/vorlagen-profile' },
        { menuItemID: 1231, url: '' },
        { menuItemID: 902, url: 'vorlagenverwaltung/textmarken/basis-textmarken' },
        { menuItemID: 903, url: '' },
        { menuItemID: 1200, url: '' },
        { menuItemID: 1041, url: 'sostat/dossiers' },
        { menuItemID: 1042, url: '' },
        { menuItemID: 1043, url: '' },
        { menuItemID: 1045, url: 'sostat/stammdaten/fragenkatalog' },
        { menuItemID: 1046, url: 'sostat/stammdaten/konfiguration' },
        { menuItemID: 1047, url: '' },
        { menuItemID: 1049, url: 'sostat/abfragen/gemeinde-code' },
        { menuItemID: 1196, url: 'sostat/abfragen/bfs-variablen' },
        { menuItemID: 1197, url: 'sostat/abfragen/plausifehler' },
        { menuItemID: 1256, url: 'sostat/abfragen/kennzahlen' },
        { menuItemID: 1224, url: 'sostat/hilfe/dokumente' }
    ];

    public static DATE_FORMAT = {
        MM_dd_yyyy: 'MM.dd.yyyy',
        dd_MM_yyyy: 'dd.MM.yyyy'
    };

    public static TITLE_SOSTAT = 'Sostat';
    public static TITLE_KONFIGURATION = 'Modul Konfiguration';
    public static TITLE_VORLAGENVERWALTUNG = 'Vorlagenverwaltung';

    public static MAX_FILE_SIZE = 20971520;

}
