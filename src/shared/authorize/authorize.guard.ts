import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppSandbox } from '@app/app.sandbox';
import { switchMap } from 'rxjs/operators/switchMap';
import { of, Observable } from 'rxjs';
@Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(private router: Router, private appSandbox: AppSandbox) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkAuthorize(route.data.roles);
    }

    private checkAuthorize(roles: any): Observable<boolean> | Promise<boolean> | boolean {
        return this.appSandbox.availableRoles$.pipe(
            switchMap((rights: any) => {
                let allow = false;
                allow = this.isAllow(roles, rights);
                if (!allow) { this.router.navigate(['/exception/502', { roles: roles }]); }
                return of(allow);
            }));
    }

    private isAllow(roles: any, rights: any): boolean {
        if (!roles) { return false; }
        if (!rights) { return false; }
        let allow = false,
            i = 0;
        const length = roles.length;
        while (i < length && !allow) {
            try {
                const classRight = roles[i].split('.');
                const className = rights[classRight[0]];
                allow = className && className[classRight[1]] ? true : false;
                i++;
            } catch (e) { return false; }
        }
        return allow;
    }
}
