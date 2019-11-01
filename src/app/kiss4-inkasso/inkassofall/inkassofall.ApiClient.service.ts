import { Injectable } from '@angular/core';
import { InkassofallService } from '@app/kiss4-inkasso/inkassofall/inkassofall.service';
import {
    Adapter,
    Body,
    DefaultHeaders,
    DELETE,
    GET,
    HttpService,
    Path,
    POST,
    PUT,
    ViewCatcher,
} from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class InkassofallApiClient extends HttpService {

    @GET('api/v1/Inkasso/Inkassofall')
    @Adapter(InkassofallService.gridAdapter)
    public getInkassofall(): Observable<any> {
        return null;
    }

    @GET('api/v1/Inkasso/BfsFrage{query}')
    @Adapter(InkassofallService.getInkassofalls)
    public getListInkassofall(@Path('query') query: any): Observable<any> {
        return null;
    }

    @POST('api/v1/Inkasso/BfsFrage')
    @Adapter(InkassofallService.addInkassofallAdapter)
    public addInkassofall(@Body inkassofall: any): Observable<any> {
        return null;
    }

    @PUT('api/v1/Inkasso/BfsFrage/{ID}')
    @ViewCatcher()
    @Adapter(InkassofallService.updateInkassofalls)
    public updateInkassofall(@Path('ID') BFSFrageID: number, @Body inkassofall: any): Observable<any> {
        return null;
    }

    @DELETE('api/v1/Inkasso/BfsFrage/{BFSFrageID}')
    @Adapter(InkassofallService.deleteInkassofallAdapter)
    public deleteInkassofall(@Path('BFSFrageID') BFSFrageID: number): Observable<any> {
        return null;
    }

}
