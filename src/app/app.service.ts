import { Injectable } from '@angular/core';
@Injectable()
export class AppService {
    /**
     * Transforms grid data RIGHTS recieved from the API into array of 'api/me/rights' instances
     *
     * @param trees
     */
    static getRolesAdapter(roles: any): Array<any> {
        return roles;
    }
}
