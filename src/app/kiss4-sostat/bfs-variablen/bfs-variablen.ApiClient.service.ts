import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, Path, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { VariablenService } from './bfs-variablen.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class VariablenApiClient extends HttpService {

    @GET('api/v1/Sostat/CtlBfsQueryVariablen{query}')
    @Adapter(VariablenService.variablenAdapter)
    @ViewCatcher()
    public getVariablens(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('/api/v1/Common/DlgAuswahl/Person{query}')
    @Adapter(VariablenService.personAdapter)
    @ViewCatcher()
    public getPersons(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/v1/Common/DlgAuswahl/Mitarbeiter{query}')
    @Adapter(VariablenService.mitarbeiterAdapter)
    @ViewCatcher()
    public getMitarbeiters(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/v1/Sostat/CtlBfsQueryVariablen/MasterData{query}')
    @ViewCatcher()
    public getInitialDataSearch(@Path('query') query: any): Observable<any> {
        return null;
    }
}
