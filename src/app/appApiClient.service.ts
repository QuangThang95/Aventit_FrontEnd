import {
    Injectable
} from '@angular/core';
import {
    HttpService,
    GET,
    Adapter,
    DefaultHeaders,
} from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';
import { AppService } from './app.service';

@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
})

@Injectable()
export class AppApiClient extends HttpService {

    /**
     * Retrieves all rights for user logined
     */
    @GET('api/me/rights')
    @Adapter(AppService.getRolesAdapter)
    public getRoles(): Observable<any> {
        return null;
    }
}
