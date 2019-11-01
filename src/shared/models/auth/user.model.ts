interface IUser {
    access_token?: string;
    expires_in?: any;
    isLoggedIn?: boolean;
    token_type?: string;
}

export class User implements IUser {
    access_token?: string;
    expires_in?: any;
    isLoggedIn?: boolean;
    token_type?: string;
    constructor(user?: User) {
        this.access_token = user ? user.access_token : '';
        this.isLoggedIn = this.access_token ? true : false;
        this.token_type = user ? user.token_type : '';
        this.expires_in = user ? user.expires_in : null;
    }
    /**
     * Saves user into local storage
     * @param user
     */
    public save(user?: IUser): void {
        localStorage.setItem('user:logined', JSON.stringify(user));
        localStorage.setItem('user:token', user.access_token);
    }

    /**
     * Saves user into local storage
     */
    public remove(): void {
        localStorage.setItem('user:logined', JSON.stringify(new User()));
        localStorage.setItem('user:token', null);
        localStorage.setItem('user:userId', null);
        localStorage.setItem('user', null);
    }
}
