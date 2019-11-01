import { Injectable } from '@angular/core';
import { Adapter, Body, DefaultHeaders, DELETE, GET, HttpService, Path, POST, PUT, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { BeratungsphaseService } from './beratungsphase.service';
import {
    CheckDatumVonQuery,
    InsertFaPhaseQueryModel,
    ListGetConfigIntQuery,
    UpdateFaLeistungQueryModel,
    UpdateFormDataQueryModel,
} from './models';



@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class BeratungsphaseApiClient extends HttpService {

    // Load SAR select box data
    @GET('api/v1/Common/DlgAuswahl/Mitarbeiter')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getSARSelcectboxDataAdapter)
    public getSARSelectboxDatas(): Observable<any> {
        return null;
    }
    // Load DPL zugewiesen select box data
    @GET('api/v1/Fallfuehrung/FaPhase/DPLData')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getDPLSelcectboxDataAdapter)
    public getDPLzugewiesenSelectboxDatas(): Observable<any> {
        return null;
    }
    // Load Grund select box data
    @GET('api/lookups/{query}')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getGrundSelcectboxDataAdapter)
    public getGrundSelectboxDatas(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Load Form data
    @GET('api/v1/Fallfuehrung/FaPhase/{query}')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.loadFormDataAdapter)
    public loadBeratungsphaseFormData(@Path('query') query: number): Observable<any> {
        return null;
    }
    // Update from data updateFormDataAdapter
    @PUT('api/v1/Fallfuehrung/FaPhase/{ID}')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.updateFormDataAdapter)
    public updateFormData(
        @Body data: UpdateFormDataQueryModel, @Path('ID') faPhaseId: number): Observable<any> {
        return null;
    }
    // updateFaLeistungDataAdapter
    @PUT('api/Fallfuehrung/UpdateFaLeistung')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.updateFaLeistungDataAdapter)
    public updateFaleistungData(
        @Body data: UpdateFaLeistungQueryModel): Observable<any> {
        return null;
    }
    // Get DatumVon and FaLeistungID by FaPhaseID
    @GET('api/Fallfuehrung/GetDateAndFasleistungByFaPhaseId{query}')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getFaLeistungIDAndDatumVonAdapter)
    public getFaLeistungIDAndDatumVon(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Get duplicate count datumVon
    @POST('api/Fallfuehrung/CheckDatumVonValid')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getDuplicateCountDatumVonAdapter)
    public getDuplicateCountDatumVon(
        @Body data: CheckDatumVonQuery): Observable<any> {
        return null;
    }
    //  Get Mandatory Field
    @GET('api/Fallfuehrung/GetMandatoryField{query}')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getGetMandatoryFieldAdapter)
    public getGetMandatoryField(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Get Check minimal all targets
    @GET('api/Fallfuehrung/CheckMinimalAllTargets{query}')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getCheckMinimalAllTargetsAdapter)
    public checkMinimalAllTargets(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Get FaLeistung By BaPersonID
    @GET('api/Fallfuehrung/GetFaLeistungByBaPersonID{query}')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getFaLeistungByBaPersonIDAdapter)
    public getFaLeistungByBaPersonID(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Get CountFa Phase
    @GET('api/Fallfuehrung/GetCountFaPhase{query}')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getCountFaPhaseAdapter)
    public getCountFaPhase(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Get NewDate By FaLeistungID
    @GET('api/Fallfuehrung/GetFaPhaseByFaLeistungID{query}')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getNewDateByFaLeistungIDAdapter)
    public getNewDateByFaLeistungID(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Insert FaPhase
    @POST('api/Fallfuehrung/InsertFaPhase')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.insertFaPhaseAdapter)
    public insertFaPhase(
        @Body data: InsertFaPhaseQueryModel): Observable<any> {
        return null;
    }
    // Get Config Int
    @POST('api/Common/GetConfigInt')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getConfigIntAdapter)
    public geConfigIntData(
        @Body data: ListGetConfigIntQuery): Observable<any> {
        return null;
    }
    // Get Config Bool
    @GET('api/Fallfuehrung/GetConfigBool{query}')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getConfigBoolAdapter)
    public geConfigBoolData(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Get Delete FaPhase
    @DELETE('api/Fallfuehrung/DeletePhase{query}')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getDeleteFaPhaseAdapter)
    public deleteFaPhase(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Get Intake and Beratungsphase count By FaLeistungID
    @GET('api/Fallfuehrung/GetIntakeAndBeratungCount{query}')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getNewDateByFaLeistungIDAdapter)
    public getIntakeAndBeratungsphaseByFaLeistungID(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Get Licensed Module
    @GET('api/modules')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getLicensedModuleAdapter)
    public getLicensedModule(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Load FallRights
    @GET('api/Fallfuehrung/GetFallRights?FaLeistungID={query}')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getFallRightsAdapter)
    public getDataFallRights(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Get Reopen Phase
    @GET('api/v1/Fallfuehrung/FaPhase/Reopenable{query}')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getReopenPhaseAdapter)
    public getReopenPhaseData(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Load Fallfuhrung
    @GET('api/Fallfuehrung/GetFaLeistungByFaLeistungID?FaLeistungID={query}')
    @ViewCatcher()
    @Adapter(BeratungsphaseService.getDataFallfuhrung)
    public getDataFallfuhrung(@Path('query') query: any): Observable<any> {
        return null;
    }
}
