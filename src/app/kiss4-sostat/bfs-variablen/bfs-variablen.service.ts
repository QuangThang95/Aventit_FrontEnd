import { Injectable } from '@angular/core';
import { BfsVariablenConstant } from '@shared/common/bfsvariablen.common';
import { Mitarbeiter, Person } from './models';

@Injectable()
export class VariablenService {
    static variablenAdapter(variablens: any): any {
        if (variablens.data && variablens.captions) {
            const columnTypes = variablens.rowTypes;
            const variablenGridColumns = [];
            for (let i = 0; i < variablens.captions.length; i++) {
                if (BfsVariablenConstant.RESTRICTED_COLUMNS.includes(variablens.captions[i])) {
                    continue;
                }
                const columnOptions = {
                    dataField: 'col' + i,
                    caption: variablens.captions[i],
                    width: 'auto',
                    allowFiltering: true,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowSearch: true
                };
                switch (columnTypes[i]) {
                    case BfsVariablenConstant.COLUMN_TYPES.DECIMAL:
                        columnOptions['format'] = { type: 'fixedPoint', precision: 2 };
                        columnOptions['dataType'] = BfsVariablenConstant.DX_COLUMN_DATA_TYPE.NUMBER;
                        break;
                    case BfsVariablenConstant.COLUMN_TYPES.DATE_TIME:
                        columnOptions['dataType'] = BfsVariablenConstant.DX_COLUMN_DATA_TYPE.DATE;
                        columnOptions['format'] = BfsVariablenConstant.GRID_CELL_DATE_FORMAT;
                        break;
                    case BfsVariablenConstant.COLUMN_TYPES.STRING:
                        columnOptions['dataType'] = BfsVariablenConstant.DX_COLUMN_DATA_TYPE.STRING;
                        break;
                    case BfsVariablenConstant.COLUMN_TYPES.INT:
                        columnOptions['dataType'] = BfsVariablenConstant.DX_COLUMN_DATA_TYPE.NUMBER;
                        break;
                    case BfsVariablenConstant.COLUMN_TYPES.BOOLEAN:
                        columnOptions['dataType'] = BfsVariablenConstant.DX_COLUMN_DATA_TYPE.BOOLEAN;
                        break;
                    default:
                        columnOptions['dataType'] = BfsVariablenConstant.DX_COLUMN_DATA_TYPE.STRING;
                        break;
                }
                variablenGridColumns.push(columnOptions);
            }
            delete variablens.captions;
            variablens.caption = variablenGridColumns;
            variablens.data = variablens.data.map((rowData, index) => {
                let colIndex = 0;
                for (const column in rowData) {
                    if (rowData.hasOwnProperty(column)) {
                        rowData['col' + colIndex] = rowData[column];
                        delete rowData[column];
                        colIndex++;
                    }
                }
                rowData['rowID'] = index;
                return rowData;
            });
        }
        return variablens;
    }

    static personAdapter(persons: any): Array<any> {
        return persons.map(person => new Person(person));
    }

    static mitarbeiterAdapter(mitarbeiters: any): Array<any> {
        return mitarbeiters.map(mitarbeiter => new Mitarbeiter(mitarbeiter));
    }
}
