import {
    Injectable, QueryList
} from '@angular/core';
import {
    HttpService,
    GET,
    Path,
    Adapter,
    DefaultHeaders,
    Body,
    ViewCatcher,
} from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';
import { FallNavService } from './fall-navigator.service';

@Injectable()
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
})

export class FallNavApiClient extends HttpService {

    /**
     * Retrieves all TreesModel
     */
    @GET('api/v1/Main/FallNavigator/TreeFallNavigator{query}')
    @ViewCatcher()
    @Adapter(FallNavService.gridAdapter)
    public getTrees(@Path('query') query: any): Observable<any> {
        return null;
    }

    /**
     * Retrieves Kategorie config value
     */
    @GET('api/Common/GetConfigBool{query}')
    @ViewCatcher()
    @Adapter(FallNavService.configBoolAdapter)
    public getConfigBool(@Path('query') query: any): Observable<any> {
        return null;
    }

    /**
     * Retrieves all Headers
     */
    @GET('api/v1/Main/FallNavigator/Module')
    @ViewCatcher()
    @Adapter(FallNavService.fallHeaderAdapter)
    public getHeaders(): Observable<any> {
        return null;
    }
}
