import { Injectable } from '@angular/core';
import { Adapter, Body, DefaultHeaders, GET, HttpService, POST, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { GemeindeDatenService } from './gemeinde-daten.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class GemeindeDatenApiClient extends HttpService {

    @GET('api/v1/Basis/Gemeinde')
    @Adapter(GemeindeDatenService.gridAdapter)
    public getGemeindeDatens(): Observable<any> {
        return null;
    }

    @GET('api/v1/Basis/Gemeinde/Sync')
    @ViewCatcher()
    @Adapter(GemeindeDatenService.syncDataAdapter)
    public syncData(): Observable<any> {
        return null;
    }

    @POST('api/v1/Basis/GemeindeImportFile')
    @Adapter(GemeindeDatenService.importDataAdapter)
    public importData(@Body file: any): Observable<any> {
        return null;
    }

}
