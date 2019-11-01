import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, Path, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { CtlBfsDokumenteService } from './ctl-bfs-dokumente.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class CtlBfsDokumenteApiClient extends HttpService {

    // Load Leitfaden
    @GET('api/v1/Sostat/BfsDokumente')
    @ViewCatcher()
    @Adapter(CtlBfsDokumenteService.getHyperlink)
    public getHyperlink(): Observable<any> {
        return null;
    }
}
