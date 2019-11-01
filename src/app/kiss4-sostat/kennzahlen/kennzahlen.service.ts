import { Injectable } from '@angular/core';

@Injectable()
export class KennzahlenService {

    static defaultValue = {
        width: 'auto',
        allowFiltering: false,
        allowSorting: false,
        alignment: 'left',
        allowHeaderFiltering: false,
        allowSearch: false,
        cellTemplate: 'cellTemplate'
    };
    static columndefault = ['Bezeichnung', 'id'];
    static columnFix = ['Jahr', 'Stichtag', 'DossierID', 'FallNr', 'LeistungsNr', 'AntragstellerID'];

    static validValue = {
        width: 'auto',
        allowFiltering: true,
        alignment: 'right',
        allowSorting: true,
        allowHeaderFiltering: true,
        allowSearch: true,
    };


    static gridAdapter(responsData: any): any {
        // check models 1 or 2
        responsData.models = 2;
        for (const column in responsData.data[0]) {
            if (column === KennzahlenService.columndefault[0]) {
                responsData.models = 1;
                break;
            }
        }
        // Adding unique id
        responsData.data.forEach((element, index) => {
            element.id = index;
        });
        const variablenGridColumns = [];
        let count = 1;
        if (responsData.models === 2) {
            for (const column in responsData.data[0]) {
                if (responsData.data[0].hasOwnProperty(column) && column !== KennzahlenService.columndefault[1]) {
                    // fomat data type number
                    if (typeof (responsData.data[0])[column] === 'number') {
                        const columnProperty = {
                        ...KennzahlenService.validValue,
                        dataField: 'col' + count,
                        caption: (column.charAt(0).toUpperCase() + column.slice(1)),
                        dataType: 'number'
                    };
                    if ( !KennzahlenService.columnFix.includes(column)) {
                        columnProperty['format'] = {
                            type: 'fixedPoint',
                            precision: 2
                        };
                    }
                        variablenGridColumns.push(columnProperty);
                    } else {
                        // fomat data type string
                        variablenGridColumns.push({
                            ...KennzahlenService.validValue,
                            dataField: 'col' + count,
                            caption: (column.charAt(0).toUpperCase() + column.slice(1)),
                            dataType: 'string',
                            alignment: 'left'
                        });
                    }
                    count++;
                }
            }

            // push column confix (nut ....) + fomat click
                variablenGridColumns.push({...KennzahlenService.defaultValue});
            responsData.caption = variablenGridColumns;
            responsData.data = KennzahlenService.changeColumnTilte(responsData.data);
        }
        return responsData;
    }
    static initSearch(initsearch: any): any {
        return initsearch;
    }

    static changeColumnTilte (data) {
        return data.map((rowData) => {
            let colIndex = 1;
            for (const column in rowData) {
                if (rowData.hasOwnProperty(column) && column !== KennzahlenService.columndefault[1]) {
                    rowData['col' + colIndex] = rowData[column];
                    delete rowData[column];
                    colIndex++;
                }
            }
            return rowData;
        });
    }
}
