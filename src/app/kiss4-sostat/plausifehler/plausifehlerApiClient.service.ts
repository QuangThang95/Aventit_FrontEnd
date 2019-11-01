import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, Path, POST } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { PlausifehlerService } from './plausifehler.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class PlausifehlerApiClient extends HttpService {

    @GET('api/v1/Sostat/CtlBfsPlausiFehler{query}')
    @Adapter(PlausifehlerService.gridAdapter)
    public getPlausifehlers(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/v1/Sostat/CtlBfsPlausiFehler/MasterData')
    @Adapter(PlausifehlerService.searchPlausifehlerAdapter)
    public searchPlausifehlers(): Observable<any> {
        return null;
    }

    @GET('api/v1/Common/DlgAuswahl/Person')
    @Adapter(PlausifehlerService.PersonInitAdapter)
    public getPerson(): Observable<any> {
        return null;
    }

    @GET('api/v1/Common/DlgAuswahl/Mitarbeiter')
    @Adapter(PlausifehlerService.MitarbeiterAdapter)
    public getMitarberter(): Observable<any> {
        return null;
    }
}
