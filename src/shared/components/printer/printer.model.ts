export interface IOption {
    header_left?: string;
    header_center?: string;
    header_right?: string;
    footer_left?: string;
    footer_center?: string;
    footer_right?: string;
}

export class Option implements IOption {
    header_left: string;
    header_center: string;
    header_right: string;
    footer_left: string;
    footer_center: string;
    footer_right: string;
    constructor(value?: Option) {
        if (value) {
            this.header_left = value.header_left;
            this.header_center = value.header_center;
            this.header_right = value.header_right;
            this.footer_left = value.footer_left;
            this.footer_center = value.footer_center;
            this.footer_right = value.footer_right;
        }
    }
}
