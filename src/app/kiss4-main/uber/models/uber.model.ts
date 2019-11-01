export interface ICultureInfo {
    value2: string;
}

export class CultureInfo implements ICultureInfo {
    public value2: string;
    constructor(data?: ICultureInfo) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IDatabaseInfo {
    databaseActiveConn: number;
    databaseCollation: string;
    databaseDateCreated: any;
    databaseLastBackup: any;
    databaseLastLogBackup: any;
    databaseName: string;          // Name
    databaseNumberOfUsers: number;
    databaseOwner: string;
    databasePageVerify: string;
    databasePrimaryFile: string;
    databaseReadOnly: boolean;
    databaseRecoveryModel: string;
    databaseRestrictAccess: string;
    databaseSize: string;
    databaseSpaceAvailable: string;
    databaseStatus: string;
    databasseCompatibility: any;
    serverCollation: string;
    serverDateTime: any;
    serverEdition: string;          // Edition
    serverIsClustered: boolean;
    serverLanguage: string;
    serverMemory: string;
    serverName: string;
    serverOperatingSystem: string;
    serverPlatform: string;
    serverProcessors: number;
    serverProduct: string;              // Product
    serverProductLevel: string;
    serverRootDirectory: string;
    serverVersion: string;
    sessionAppNameInterf: string;
    sessionCPUTime: number;
    sessionDatabase: string;
    sessionDateFirst: number;
    sessionDateformat: string;
    sessionHostNamePID: string;
    sessionID: number;
    sessionLanguage: string;
    sessionLogicalReads: number;
    sessionLoginName: string;
    sessionLoginTime: any;
    sessionMemoryUsage: number;
    sessionPreviousError: number;
    sessionReads: number;
    sessionUserName: string;
    sessionWrites: number;
}

export class DatabaseInfo implements IDatabaseInfo {
    public databaseActiveConn: number;
    public databaseCollation: string;
    public databaseDateCreated: any;
    public databaseLastBackup: any;
    public databaseLastLogBackup: any;
    public databaseName: string;
    public databaseNumberOfUsers: number;
    public databaseOwner: string;
    public databasePageVerify: string;
    public databasePrimaryFile: string;
    public databaseReadOnly = false;
    public databaseRecoveryModel: string;
    public databaseRestrictAccess: string;
    public databaseSize: string;
    public databaseSpaceAvailable: string;
    public databaseStatus: string;
    public databasseCompatibility: any;
    public serverCollation: string;
    public serverDateTime: any;
    public serverEdition: string;
    public serverIsClustered = false;
    public serverLanguage: string;
    public serverMemory: string;
    public serverName: string;
    public serverOperatingSystem: string;   // Operating System
    public serverPlatform: string;          // Platform
    public serverProcessors: number;
    public serverProduct: string;
    public serverProductLevel: string;
    public serverRootDirectory: string;
    public serverVersion: string;
    public sessionAppNameInterf: string;
    public sessionCPUTime: number;
    public sessionDatabase: string;
    public sessionDateFirst: number;
    public sessionDateformat: string;
    public sessionHostNamePID: string;
    public sessionID: number;
    public sessionLanguage: string;
    public sessionLogicalReads: number;
    public sessionLoginName: string;
    public sessionLoginTime: any;
    public sessionMemoryUsage: number;
    public sessionPreviousError: number;
    public sessionReads: number;
    public sessionUserName: string;
    public sessionWrites: number;
    constructor(data?: IDatabaseInfo) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IDatabaseVersions {
    active: number;
    backwardCompatibleToClient: string;
    changesSinceLastVersion: string;
    dateCreated: Date;
    dateModified: Date;
    description: string;
    id: number;
    version: string;
    versionDate: Date;
}

export class DatabaseVersions implements IDatabaseVersions {
    public active = 0;
    public backwardCompatibleToClient: string;
    public changesSinceLastVersion: string;
    public dateCreated: Date;
    public dateModified: Date;
    public description: string;
    public id: number;
    public version: string;
    public versionDate: Date;
    constructor(data?: IDatabaseVersions) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IBrowserVersions {
    name: string;
    version: any;
}

export class BrowserVersions implements IBrowserVersions {
    public name: string;
    public version: any;
    constructor(data?: IDatabaseVersions) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IKiss4WebVersion {
    name: string;
    version: string;
}
export class Kiss4WebVersion implements IKiss4WebVersion {
    public name: string;
    public version: string;
    constructor(data?: IKiss4WebVersion) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IKissVersion {
    version: string;
}
export class KissVersion implements IKissVersion {
    public version: string;
    constructor(data?: IKissVersion) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

