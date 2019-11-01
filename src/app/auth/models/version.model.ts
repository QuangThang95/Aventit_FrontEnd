interface IVersion {
    xdbVersionID: number
    majorVersion: number
    minorVersion: number
    build: number
    revision: number
    versionDate?: Date
    sqlServerVersionInfo: string
    changesSinceLastVersion: string
    backwardCompatibleDownToClientVersion: string
    description: string
    creator: string
    created?: Date
    modifier:string
    modified?: Date
    xdbVersionTS: number[]
}

export class Version implements IVersion {
    xdbVersionID: number
    majorVersion: number
    minorVersion: number
    build: number
    revision: number
    versionDate?: Date
    sqlServerVersionInfo: string
    changesSinceLastVersion: string
    backwardCompatibleDownToClientVersion: string
    description: string
    creator: string
    created?: Date
    modifier:string
    modified?: Date
    xdbVersionTS: number[]
    constructor(version?: Version) {
    }
}