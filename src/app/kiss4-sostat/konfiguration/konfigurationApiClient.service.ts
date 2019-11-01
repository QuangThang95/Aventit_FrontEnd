import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { KonfigurationService } from './konfiguration.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class KonfigurationApiClient extends HttpService {

    // Load Konfiguration detail
    @GET('api/v1/Sostat/CtlBfsKonfiguration/MasterData')
    @ViewCatcher()
    @Adapter(KonfigurationService.detailAdapter)
    public getKonfigurations(): Observable<any> {
        return null;
    }

    // Load Konfiguration grid
    @GET('api/v1/Sostat/CtlBfsKonfiguration')
    @ViewCatcher()
    @Adapter(KonfigurationService.gridAdapter)
    public getKonfigurationsGrid(): Observable<any> {
        return null;
    }
}
