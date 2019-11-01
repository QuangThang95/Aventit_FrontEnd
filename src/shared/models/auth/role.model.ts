export class Role {
    className?: string;
    rightName?: string;
    mayInsert?: boolean;
    mayUpdate?: boolean;
    mayDelete?: boolean;
    constructor(data?: IRole) {
        Object.assign({}, data);
    }
}

export interface IRole {
    className?: string;
    rightName?: string;
    mayInsert?: boolean;
    mayUpdate?: boolean;
    mayDelete?: boolean;
}
