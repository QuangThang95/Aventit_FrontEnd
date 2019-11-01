import 'rxjs/rx';
import { Injectable } from '@angular/core';
import { DocFormat } from './doc-format.enum';

/**
 * @example
 * var data = { x: 42, s: "hello, world", d: new Date() },
 * fileName = "my-download.json";
 * downloadFile(data, fileName);
 */
@Injectable()
export class DocumentsHelper {
    downloadFile(data: Response, type?: any, fileName?: any) {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const typeFile = this.getType(type);
        const blob = new Blob([data], { type: typeFile.type || 'octet/stream' });
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = `${fileName}.${typeFile.ext}` || 'download.doc';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    private getType(type: DocFormat): any {
        let typeFile = {
            ext: 'doc',
            type: 'octet/stream'
        };
        switch (type) {
            case DocFormat.Word:
                typeFile = {
                    ext: 'doc',
                    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                };
                break;
            case DocFormat.Excel:
                typeFile = {
                    ext: 'xls',
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                };
                break;
            case DocFormat.Pdf:
                typeFile = {
                    ext: 'pdf',
                    type: 'application/pdf'
                };
                break;
            default:
                break;
        }
        return typeFile;
    }
}
