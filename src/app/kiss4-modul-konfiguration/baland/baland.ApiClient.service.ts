import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { BalandService } from './baland.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class BalandApiClient extends HttpService {

    @GET('api/v1/Basis/Lander')
    @Adapter(BalandService.gridAdapter)
    public getBaland(): Observable<any> {
        return null;
    }

    @GET('api/v1/Basis/Lander/Sync')
    @ViewCatcher()
    @Adapter(BalandService.syncDataAdapter)
    public syncData(): Observable<any> {
        return null;
    }

}
