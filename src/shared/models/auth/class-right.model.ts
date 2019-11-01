export class ClassRightModel {
    className: string;
    mayInsert: string;
    mayUpdate: string;
    mayDelete: string;
    constructor(className: string) {
        this.className = className;
        this.mayInsert = `${className}.mayInsert`;
        this.mayUpdate = `${className}.mayUpdate`;
        this.mayDelete = `${className}.mayDelete`;
    }
}
