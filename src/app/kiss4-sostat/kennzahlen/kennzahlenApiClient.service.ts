import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, Path, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { KennzahlenService } from './kennzahlen.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class KennzahlenApiClient extends HttpService {

    @GET('api/v1/Sostat/CtlBfsKennzahlen{query}')
    @ViewCatcher()
    @Adapter(KennzahlenService.gridAdapter)
    public getKennzahlens(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/v1/Sostat/CtlBfsKennzahlen/MasterData')
    @ViewCatcher()
    @Adapter(KennzahlenService.initSearch)
    public initSearch(): Observable<any> {
        return null;
    }
}
