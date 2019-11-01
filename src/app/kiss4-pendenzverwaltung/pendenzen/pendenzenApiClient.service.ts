import {
    Adapter,
    Body,
    DefaultHeaders,
    GET,
    HttpService,
    Path,
    POST,
    PUT
} from '@shared/asyncServices/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PendenzenService } from './pendenzen.service';
import { PendenzenVerwaltung } from './models/pendenzen.model';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class PendenzenApiClient extends HttpService {
    /**
     * Retrieves all pendenzenVerwaltungs
     */
    @GET('api/pendenzen/pendenzenverwaltung{query}')
    @Adapter(PendenzenService.gridAdapter)
    public getPendenzenVerwaltungs(@Path('query') query: any): Observable<any> {
        return null;
    }

    @POST('api/pendenzen/pendenzenverwaltung')
    @Adapter(PendenzenService.insertPendenzenVerwaltungAdapter)
    public insertPendenzenVerwaltung(
        @Body pendenzenVerwaltung: PendenzenVerwaltung
    ): Observable<any> {
        return null;
    }

    @PUT('api/pendenzen/pendenzenverwaltung/done')
    @Adapter(PendenzenService.updatePendenzenVerwaltungAdapter)
    public updatePendenzenVerwaltung(
        @Body pendenzenVerwaltung: PendenzenVerwaltung
    ): Observable<any> {
        return null;
    }

    @GET('api/pendenzen/pendenzenverwaltung/edit?taskId={query}')
    @Adapter(PendenzenService.getStatusEditButtonAdapter)
    public getStatusEditButton(@Path('query') taskId: any): Observable<any> {
        // mock data
        return null;
    }

    @GET('api/pendenzen/lookup/modulenstatus?personId={query}')
    @Adapter(PendenzenService.getModulenStatusAdapter)
    public getModulenStatus(@Path('query') baPersonId: any): Observable<any> {
        // mock data
        return null;
    }

    @GET('api/pendenzen/lookup/xlovcode{query}')
    @Adapter(PendenzenService.getStatusAdapter)
    public getStatus(@Path('query') query: any): Observable<any> {
        // mock data
        return null;
    }

    @GET('api/pendenzen/lookup/xlovcode?lovName={query}')
    @Adapter(PendenzenService.getTypeAdapter)
    public getTypes(@Path('query') lovName: any): Observable<any> {
        // mock data
        return null;
    }

    @GET('api/pendenzen/lookup/xorgunit')
    @Adapter(PendenzenService.getOrgUnitAdapter)
    public getOrganisations(): Observable<any> {
        // mock data
        return null;
    }

    @GET('api/pendenzen/lookup/xuser?suchBegriff={query}')
    @Adapter(PendenzenService.getLeistungsverantAdapter)
    public getLeistungsverants(@Path('query') keyword: any): Observable<any> {
        return null;
    }

    @GET('api/pendenzen/lookup/leistungsverantw?leistungId={query}')
    @Adapter(PendenzenService.getLeistungsverantwAdapter)
    public getLeistungsverantw(@Path('query') keyword: any): Observable<any> {
        return null;
    }

    @GET('api/pendenzen/lookup/leistung?faFallId={query}')
    @Adapter(PendenzenService.getLeistungAdapter)
    public getLeistungs(@Path('query') faFallId: any): Observable<any> {
        // mock data
        return null;
    }

    @GET(
        'api/pendenzen/lookup/erstellerempfaenger?searchString={query}&ifEmptySearchAll=true'
    )
    @Adapter(PendenzenService.getErstellerEmpfaengerAdapter)
    public getErstellerEmpfaengers(@Path('query') keyword: any): Observable<any> {
        // mock data
        return null;
    }

    @GET(
        'api/pendenzen/lookup/falltraeger?searchString={query}&ifEmptySearchAll=true'
    )
    @Adapter(PendenzenService.getFalltraegerAdapter)
    public getFalltraegers(@Path('query') keyword: any): Observable<any> {
        // mock data
        return null;
    }

    @GET('api/pendenzen/lookup/personen?faFallId={query}')
    @Adapter(PendenzenService.getBetriffPersonAdapter)
    public getBetriffPersons(@Path('query') faFallId: any): Observable<any> {
        // mock data
        return null;
    }

    @GET('api/pendenzen/lookup/betreffbeschreibung?code={query}')
    @Adapter(PendenzenService.getBetreffBeschreibungAdapter)
    public getBetreffBeschreibungs(
        @Path('query') taskTypeCode: any
    ): Observable<any> {
        // mock data
        return null;
    }

    @GET('api/pendenzen/pendenzenverwaltung/init?fallId={query}')
    @Adapter(PendenzenService.getInitItemAdapter)
    public getInitDatas(@Path('query') fallId?: any): Observable<any> {
        // mock data
        return null;
    }

    @GET('api/pendenzen/lookup/erfassungmutation{query}')
    @Adapter(PendenzenService.getErfassungMutationAdapter)
    public getErfassungMutations(@Path('query') query: any): Observable<any> {
        // mock data
        return null;
    }

    @GET('api/pendenzen/treenavigator')
    @Adapter(PendenzenService.getTreeNavigatorAdapter)
    public getTreeNavigators(): Observable<any> {
        // mock data
        return null;
    }

    @GET('api/GetMasterData')
    @Adapter(PendenzenService.getMastereAdapter)
    public getMasterData(): Observable<any> {
        return null;
    }
}
