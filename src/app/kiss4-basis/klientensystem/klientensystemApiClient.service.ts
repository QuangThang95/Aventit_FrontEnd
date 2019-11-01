import { Injectable } from '@angular/core';
import { Adapter, Body, DefaultHeaders, GET, HttpService, Path, POST, PUT, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { KlientensystemService } from './klientensystem.service';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class KlientensystemApiClient extends HttpService {

  /**
   * Retrieves all Falltraeger
   */
  @GET('api/Basis/Falltraeger{query}')
  @ViewCatcher()
  @Adapter(KlientensystemService.getFalltraeger)
  public getFalltraeger(@Path('query') query: any): Observable<any> {
    return null;
  }

  /**
   * Retrieves all Mietvertrag
   */
  @GET('api/Basis/PersonMietvertrag{query}')
  @ViewCatcher()
  @Adapter(KlientensystemService.getMietvertrag)
  public getMietvertrag(@Path('query') query: any): Observable<any> {
    return null;
  }

  /**
   * Retrieves all GetRelation
   */
  @GET('api/Basis/PersonRelation{query}')
  @ViewCatcher()
  @Adapter(KlientensystemService.getRelation)
  public getRelation(@Path('query') query: any): Observable<any> {
    return null;
  }

  /**
   * Retrieves all VwInstitution
   */
  @GET('api/Basis/PersonInstitution{query}')
  @ViewCatcher()
  @Adapter(KlientensystemService.getVwInstitution)
  public getVwInstitution(@Path('query') query: any): Observable<any> {
    return null;
  }

  /**
   * Retrieves BeziehungRelationGeneric
   */
  @GET('api/Basis/BeziehungRelationGeneric{query}')
  @ViewCatcher()
  @Adapter(KlientensystemService.getBeziehungRelationGeneric)
  public getBeziehungRelationGeneric(@Path('query') query: any): Observable<any> {
    return null;
  }

  /**
   * Retrieves BeziehungRelationMale
   */
  @GET('api/Basis/BeziehungRelationMale{query}')
  @ViewCatcher()
  @Adapter(KlientensystemService.getBeziehungRelationMale)
  public getBeziehungRelationMale(@Path('query') query: any): Observable<any> {
    return null;
  }
  /**
   * Retrieves BeziehungRelationMale
   */
  @GET('api/Basis/BeziehungRelationFemale{query}')
  @ViewCatcher()
  @Adapter(KlientensystemService.getBeziehungRelationFemale)
  public getBeziehungRelationFemale(@Path('query') query: any): Observable<any> {
    return null;
  }
  /**
   * Retrieves InFP => CheckValiditionHaushalt
   */
  @GET('api/Basis/HaushaltValidator{query}')
  @ViewCatcher()
  @Adapter(KlientensystemService.getInFP)
  public getInFP(@Path('query') query: any): Observable<any> {
    return null;
  }

  /**
   * Retrieves GleicheAdresse => SetGleicherHaushaltFlagValidator
   */
  @GET('api/Basis/SetGleicherHaushaltFlagValidator{query}')
  @ViewCatcher()
  @Adapter(KlientensystemService.getGleicheAdresse)
  public getGleicheAdresse(@Path('query') query: any): Observable<any> {
    return null;
  }

  /**
   * Retrieves HandleGleicherHaushaltFlagSet
   */
  @GET('api/Basis/HandleGleicherHaushaltFlagSet{query}')
  @ViewCatcher()
  @Adapter(KlientensystemService.getHandleGleicherHaushaltFlagSet)
  public getHandleGleicherHaushaltFlagSet(@Path('query') query: any): Observable<any> {
    return null;
  }

  /**
   * Update BaPerson Relation
   */
  @PUT('api/Basis/UpdateBaPerson_Relation')
  @ViewCatcher()
  @Adapter(KlientensystemService.updateBaPersonRelation)
  public updateBaPersonRelation(@Body baPersonRelation: any): Observable<any> {
    return null;
  }

  /**
   * Update BaMietvertrag
   */
  @PUT('api/Basis/PersonBaHaushalt')
  @ViewCatcher()
  @Adapter(KlientensystemService.updateBaMietvertrag)
  public updateBaMietvertrag(@Body baMietvertrag: any): Observable<any> {
    return null;
  }

  /**
   * Update BaPerson
   */
  @PUT('api/Basis/UpdateBaPerson')
  @ViewCatcher()
  @Adapter(KlientensystemService.updateBaPerson)
  public updateBaPerson(@Body baPerson: any): Observable<any> {
    return null;
  }

  /**
   * Create history version
   */
  @POST('api/Basis/InsertHistoryVersion')
  @ViewCatcher()
  @Adapter(KlientensystemService.insertHistoryVersion)
  public insertHistoryVersion(@Body historyVersion: any): Observable<any> {
    return null;
  }
}
