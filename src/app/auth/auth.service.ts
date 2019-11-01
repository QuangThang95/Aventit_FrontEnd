import { Injectable } from '@angular/core';
import { User } from '../../shared/models';
import { Version } from './models/version.model';
import { UserForm } from './models/xuser.model';
@Injectable()
export class AuthService {

  constructor() { }

  /**
 *  response keys
 *
 * @param user
 */
  // tslint:disable-next-line:member-ordering
  static authAdapter(user: User): any {
    return Object.assign({}, user, { access_token: user.access_token });
  }

  static logoutAdapter(user?: Pick<any, any>): any {
    return Object.assign({}, user);
  }
    /**
   *  load Multiple XUsers Adapter Service
   */
  static loaXUsersAdapter(logonName: any): UserForm {
    return logonName.map(item => new UserForm(item));
    // return Object.assign({}, user);
  }
  /**
   *  load Version Adapter Service
   */
  static loadVersionAdapter(version?: Version): any {
    return Object.assign({}, version);
  }

  /**
   *  load LinkIBan Adapter Service
   */
  static loadLinkIBanAdapter(version?: Version): any {
    return Object.assign({}, version);
  }
  /**
   *  load Multiple XUsers Adapter Service
   */
  static loadGetMultipleXUsersAdapter(user?: any): any {
    return Object.assign(user);
  }
  /**
   *  load User Righ Adapter Service
   */
  static loadGetUserRightAdapter(user?: any): any {
    return Object.assign(user);
  }
  
}
