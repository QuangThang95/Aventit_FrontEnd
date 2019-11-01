import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, Path, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { GemeindeCodeService } from './gemeinde-code.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class GemeindeCodeApiClient extends HttpService {

    @GET('api/v1/Sostat/CtlQueryBFSGemeinde{query}')
    @Adapter(GemeindeCodeService.gridAdapter)
    @ViewCatcher()
    public getGemeindeCodes(@Path('query') query: string): Observable<any> {
        return null;
    }
}
