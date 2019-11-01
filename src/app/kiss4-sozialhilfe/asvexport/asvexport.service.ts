import { Injectable } from '@angular/core';
import { isArray, isNullOrUndefined } from 'util';

import {
    ASVDetenerfassung,
    ModelUpdateASVSExport,
    ModelUpdateTransaction,
    ModelXOrgUnit,
    ZuExportierendeEintrage,
} from './models';

@Injectable()
export class AsvexportService {

    static gridAdapter(Asvexport: any): Array<any> {
        return Asvexport.map(
            asvexport => new ASVDetenerfassung(asvexport)
        );
    }

    static getGridAsvEintrage(AsvEintrage: any): Array<any> {
        return AsvEintrage.map(
            (asveintrage, index) => new ZuExportierendeEintrage({...asveintrage, index: index})
        );
    }

    /**
    * *****************************************************************
    * Adapter map data File Binary
    * Author:DNDUC
    * *****************************************************************
    */
    static getFileBinary(FileBinary: any): any {
        if (!isNullOrUndefined(FileBinary)) {
            return FileBinary;
        } else {
            return null;
        }
    }

    /**
    * *****************************************************************
    * Adapter map data File Binary
    * Author:DNDUC
    * *****************************************************************
    */
    static gridXOrgUnit(XOrgUnit: any): Array<any> {
        return XOrgUnit.map(
            xOrgUnit => new ModelXOrgUnit(xOrgUnit)
        );
    }

    /**
    * *****************************************************************
    * Post new row in grid top
    * Author:DNDUC
    * *****************************************************************
    */
    static insertSstASVSExportAdapter(sstASVSExport: any): boolean {
        if (isArray(sstASVSExport) && sstASVSExport.length === 1) {
            return sstASVSExport[0];
        } else {
            return null;
        }

    }

    /**
    * *****************************************************************
    * Update row in grid top
    * Author:DNDUC
    * *****************************************************************
    */
    static updateSstASVSExport(SstASVSExports: any): ModelUpdateASVSExport {
        return SstASVSExports.map(sstASVSExport => new ModelUpdateASVSExport(sstASVSExport));
    }

    /**
    * *****************************************************************
    * Update ASVSExport Transaction
    * Author:DNDUC
    * *****************************************************************
    */
    static updateSstASVSExportTransaction(SstASVSExportTransaction: ModelUpdateTransaction): any {
        if (!isNullOrUndefined(SstASVSExportTransaction)) {
            return SstASVSExportTransaction[0];
        } else {
            return null;
        }
    }
}
