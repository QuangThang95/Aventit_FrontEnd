interface IUserRight {
    llassName: string
    rightName: string
    ins: number
    upd: number
    del: number
}

export class UserRight implements IUserRight {
    llassName: string
    rightName: string
    ins: number
    upd: number
    del: number
    constructor(userRight?: UserRight) {
    }
}