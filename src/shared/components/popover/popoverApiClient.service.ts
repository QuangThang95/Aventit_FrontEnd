import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, Path, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { Service } from './popover.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class PopOverApiClient extends HttpService {

    @GET('api/Common/RefreshIcons{query}')
    @Adapter(Service.modelWrapper)
    @ViewCatcher()
    public getButtons(@Path('query') query: any): Observable<any> {
        return null;
    }
}
