export class LoginForm {
    public client_id: any;
    public client_secret: any;
    public grant_type: any;
    public scope: any;
    public username: string;
    public password: string;
    constructor(data?: ILoginForm) {
       return Object.assign({}, this, data);
    }
}

export interface ILoginForm {
    client_id: any;
    client_secret: any;
    grant_type: any;
    scope: any;
    username: string;
    password: string;
}
