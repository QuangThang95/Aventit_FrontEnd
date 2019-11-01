import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, Path, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs';

import { DemografieService } from './demografie-history.service';

@Injectable()
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
})

export class DemografieApiClient extends HttpService {
    @GET('api/Basis/XUser_History{query}')
    @ViewCatcher()
    @Adapter(DemografieService.gridXUserHistoryAdapter)
    public getXUserHistory(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/Basis/Personalien?baPersonID={baPersonID}&verID={verID}')
    @ViewCatcher()
    @Adapter(DemografieService.gridPersonalienAdapter)
    public getPersonalien(@Path('baPersonID') baPersonID: any, @Path('verID') verID: any): Observable<any> {
        return null;
    }

    @GET('api/Basis/Wohnsitz?baPersonID={baPersonID}&verID={verID}')
    @ViewCatcher()
    @Adapter(DemografieService.gridWohnsitzAdapter)
    public getWohnsitz(@Path('baPersonID') baPersonID: any, @Path('verID') verID: any): Observable<any> {
        return null;
    }

    @GET('api/Basis/Aufenthaltsort?baPersonID={baPersonID}&verID={verID}')
    @ViewCatcher()
    @Adapter(DemografieService.gridAufenthaltsortAdapter)
    public getAufenthaltsort(@Path('baPersonID') baPersonID: any, @Path('verID') verID: any): Observable<any> {
        return null;
    }
}
