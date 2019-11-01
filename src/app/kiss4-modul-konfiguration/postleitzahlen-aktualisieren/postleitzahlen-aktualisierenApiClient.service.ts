import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { PostleitzahlenAktualisierenService } from './postleitzahlen-aktualisieren.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class PostleitzahlenAktualisierenApiClient extends HttpService {

    @GET('api/Basis/GetBaPlz')
    @Adapter(PostleitzahlenAktualisierenService.gridAdapter)
    public getPostleitzahlenAktualisierens(): Observable<any> {
        return null;
    }

    @GET('api/Basis/SyncBaPlz')
    @ViewCatcher()
    @Adapter(PostleitzahlenAktualisierenService.syncDataAdapter)
    public syncData(): Observable<any> {
        return null;
    }

}
