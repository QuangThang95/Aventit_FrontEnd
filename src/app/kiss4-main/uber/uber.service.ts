import { Injectable } from '@angular/core';

import { CultureInfo, DatabaseInfo, DatabaseVersions, KissVersion } from './models';

@Injectable()
export class UberService {

    static GetCultureInfo(cultureInfo: any): CultureInfo {
        return cultureInfo.map(item => new CultureInfo(item))[0];
    }

    static GetDatabaseInfo(databaseInfo: any): DatabaseInfo {
        return new DatabaseInfo(databaseInfo);
    }

    static GetDatabaseVersions(databaseVersions: any): Array<DatabaseVersions> {
        return databaseVersions.map(item => new DatabaseVersions(item));
    }

    static GetKiss4WebVersion(kiss4WebVersion: any): KissVersion {
        return new KissVersion(kiss4WebVersion);
    }
}

