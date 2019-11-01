export class BfsVariablenConstant {
    public static LOCALSTORAGE_KOL_DEF_KEY = 'bfs-variablen-kol-def';

    public static BUTTON_SPEICHERE_KOL_DEF = 'speichere-kol-def';
    public static BUTTON_RESET_KOL_DEF = 'reset-kol-def';
    public static BUTTON_EXPORT_CSV = 'export-csv';

    public static COLUMN_PROPS = {
        VISIBLE_INDEX: 'visibleIndex',
        DATA_FIELD: 'dataField',
        DATA_TYPE: 'dataType',
        WIDTH: 'width',
        CAPTION: 'caption',
        VISIBLE: 'visible',
        SORT_ORDER: 'sortOrder',
        FILTER_VALUES: 'filterValues',
        FILTER_VALUE: 'filterValue',
        FILTER_TYPE: 'filterType'
    };
    public static COLUMN_PROP_INDEX = 'visibleIndex';
    public static COLUMN_PROP_DATA_FIELD = 'dataField';
    public static COLUMN_PROP_WIDTH = 'width';
    public static COLUMN_PROP_CAPTION = 'caption';
    public static COLUMN_PROP_VISIBLE = 'visible';

    public static EN_US = 'en-US';
    public static DATE_FORMAT = 'yyyy-MM-dd';
    public static GRID_CELL_DATE_FORMAT = 'dd.MM.yyyy';
    public static SUFFIX_CSV = '.csv';
    public static CSV_FILE_NAME = 'BFSVariablen_Export_';
    public static CHARACTER_WIDTH = 7;
    public static BUFFER_WIDTH = 100;

    public static DEFAULT_COLUMNS = [
        { dataField: 'jahr', width: 'auto', allowFiltering: true, allowSorting: true, alignment: 'left', allowHeaderFiltering: true, allowSearch: true, dataType: Number },
        { dataField: 'stichtag', width: 'auto', allowFiltering: true, allowSorting: true, alignment: 'left', allowHeaderFiltering: true, allowSearch: true, dataType: String },
        { dataField: 'dossier-Nr.', width: 'auto', allowFiltering: true, allowSorting: true, alignment: 'left', allowHeaderFiltering: true, allowSearch: true, dataType: Number },
        { dataField: 'fallNr', width: 'auto', allowFiltering: true, allowSorting: true, alignment: 'left', allowHeaderFiltering: true, allowSearch: true, dataType: Number },
        { dataField: 'personenTyp', width: 'auto', allowFiltering: true, allowSorting: true, alignment: 'left', allowHeaderFiltering: true, allowSearch: true, dataType: String },
        { dataField: 'person-Nr.', width: 'auto', allowFiltering: true, allowSorting: true, alignment: 'left', allowHeaderFiltering: true, allowSearch: true, dataType: Number },
        { dataField: 'person', width: 'auto', allowFiltering: true, allowSorting: true, alignment: 'left', allowHeaderFiltering: true, allowSearch: true, dataType: String },
        { dataField: 'ahvNummer', width: 'auto', allowFiltering: true, allowSorting: true, alignment: 'left', allowHeaderFiltering: true, allowSearch: true, dataType: String }
    ];

    public static COLUMN_TYPES = {
        DECIMAL: 'Decimal',
        DATE_TIME: 'DateTime',
        BOOLEAN: 'Boolean',
        STRING: 'String',
        INT: 'Int'
    };

    public static RESTRICTED_COLUMNS = [
        'BFSDossierID$',
        'BFSDossierPersonID$',
        'BFSPersonCode$',
        'PersonIndex$'
    ];

    public static DX_COLUMN_DATA_TYPE = {
        STRING: 'string',
        NUMBER: 'number',
        DATE: 'date',
        BOOLEAN: 'boolean',
        OBJECT: 'object',
        DATE_TIME: 'datetime'
    };
}
