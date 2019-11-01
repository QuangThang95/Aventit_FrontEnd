import {
    Adapter,
    Body,
    DefaultHeaders,
    GET,
    HttpService,
    Path,
    POST,
    PUT,
    DELETE,
    ViewCatcher
} from '@shared/asyncServices/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FaAktennotizService } from './fa-aktennotiz.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class FaAktennotizApiClient extends HttpService {
    /**
     * Retrieves all FaAktennotiz
     */
    @POST('api/Fallfuehrung/GetFaAktennotizen')
    @Adapter(FaAktennotizService.gridAdapter)
    public getFaAktennotiz(@Body queryBody: any): Observable<any> {
        return null;
    }

    @GET('api/fa-aktennotiz/LoadNavBarItems')
    @Adapter(FaAktennotizService.getTreeNavigatorAdapter)
    public getTreeNavigators(): Observable<any> {
        // mock data
        return null;
    }
    @GET('api/lookups/FaKontaktart')
    @Adapter(FaAktennotizService.kontaktartAdapter)
    public getKontaktart(): Observable<any> {
        return null;
    }
    @GET('api/Fallfuehrung/GetMitarbeiter')
    @Adapter(FaAktennotizService.mitarbeiterAdapter)
    public getMitarbeiter(): Observable<any> {
        return null;
    }
    @GET('api/lookups/FaThema')
    @Adapter(FaAktennotizService.theMenAdapter)
    public getTheMen(): Observable<any> {
        return null;
    }
    @POST('api/Fallfuehrung/InsertFaAktennotizen')
    @ViewCatcher()
    @Adapter(FaAktennotizService.addFaAktennotiz)
    public addFaAktennotiz(@Body addBody: any): Observable<any> {
        return null;
    }

    @DELETE('api/Fallfuehrung/DeleteFaAktennotizen{query}')
    @ViewCatcher()
    @Adapter(FaAktennotizService.deleteFaAktennotiz)
    public deleteFaAktennotiz(@Path('query') query: any): Observable<any> {
        return null;
    }
    @PUT('api/Fallfuehrung/UpdateFaAktennotizen')
    @ViewCatcher()
    @Adapter(FaAktennotizService.updateFaAktennotiz)
    public updateFaAktennotiz(@Body bodyUpdate: any): Observable<any> {
        return null;
    }
    @GET('api/Common/GetConfigBool{query}')
    @Adapter(FaAktennotizService.configAdapter)
    public getConfigBool(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/lookups/FaDauer')
    @Adapter(FaAktennotizService.dauerAdapter)
    public getDauer(): Observable<any> {
        return null;
    }

    @GET('api/Fallfuehrung/GetDokumentAktennotizen?docContextName=FaDokBesprBericht&xProfileID=Null&docTypeFilter=0')
    @Adapter(FaAktennotizService.dokumentAktennotizenAdapter)
    public getDokumentAktennotizen(): Observable<any> {
        return null;
    }
    @GET('api/Fallfuehrung/DefaultKontartPartner?baPersonID={baPersonID}')
    @Adapter(FaAktennotizService.getDefaultKontartPartner)
    public getDefaultKontartPartner(@Path('baPersonID') baPersonID: any): Observable<any> {
        return null;
    }
}
