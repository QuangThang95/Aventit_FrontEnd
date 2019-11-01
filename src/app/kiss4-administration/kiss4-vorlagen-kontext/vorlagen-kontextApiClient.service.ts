import { Injectable } from '@angular/core';
import { Adapter, Body, DefaultHeaders, DELETE, GET, HttpService, Path, POST, PUT, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { InsertXDocContext, IXDocInsert, UpdateXDocContext, UpdateXDocContextTemplate } from './models';
import { VorlagenKontextService } from './vorlagen-kontext.service';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class VorlagenKontextApiClient extends HttpService {
  @GET('api/Administration/XDocContextAll')
  @ViewCatcher()
  @Adapter(VorlagenKontextService.getXDocContextAll)
  public getXDocContextAll(): Observable<any> {
    return null;
  }

  @GET('api/Administration/ZugeteiltByDocContextID?DocContextID={docContextID}')
  @ViewCatcher()
  @Adapter(VorlagenKontextService.getZugeteiltByDocContextID)
  public getZugeteiltByDocContextID(@Path('docContextID') docContextID: number): Observable<any> {
    return null;
  }

  @GET('api/Administration/VerfuegbarByDocContextID?DocContextID={docContextID}')
  @ViewCatcher()
  @Adapter(VorlagenKontextService.getVerfuegbarByDocContextID)
  public getVerfuegbarByDocContextID(@Path('docContextID') docContextID: number): Observable<any> {
    return null;
  }

  @POST('api/Administration/XDocContext')
  @ViewCatcher()
  @Adapter(VorlagenKontextService.insertXDocContext)
  public insertXDocContext(@Body insertXDocContext: InsertXDocContext): Observable<any> {
    return null;
  }

  @PUT('api/Administration/XDocContext')
  @ViewCatcher()
  @Adapter(VorlagenKontextService.updateXDocContext)
  public updateXDocContext(@Body updateXDocContext: UpdateXDocContext): Observable<any> {
    return null;
  }

  @DELETE('api/Administration/XDocContext')
  @ViewCatcher()
  @Adapter(VorlagenKontextService.deleteXDocContext)
  public deleteXDocContext(@Body query: any): Observable<any> {
    return null;
  }

  @GET('api/Administration/CountXDocContext_TemplateByDocContextID{query}')
  @Adapter(VorlagenKontextService.countXDocContext_TemplateByDocContextID)
  public countXDocContext_TemplateByDocContextID(@Path('query') query: any): Observable<any> {
    return null;
  }

  @POST('api/Administration/XDocContext_Template')
  @ViewCatcher()
  @Adapter(VorlagenKontextService.insertXDocContext_Template)
  public insertXDocContext_Template(@Body insertXDocContextTemplate: IXDocInsert): Observable<any> {
    return null;
  }

  @PUT('api/Administration/XDocContext_Template')
  @ViewCatcher()
  @Adapter(VorlagenKontextService.updateXDocContext_Template)
  public updateXDocContext_Template(@Body updateXDocContextTemplate: UpdateXDocContextTemplate[]): Observable<any> {
    return null;
  }
}
