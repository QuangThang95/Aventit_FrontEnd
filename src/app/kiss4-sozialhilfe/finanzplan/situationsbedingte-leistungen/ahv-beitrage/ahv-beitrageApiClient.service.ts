import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {
  Adapter, GET, HttpService, Body, DELETE, PUT, Path, DefaultHeaders, POST, ViewCatcher
} from '@shared/asyncServices/http';
import { AhvBeitrageService } from './ahv-beitrage.service';
import {
  BgSilAHVBeitrag,
  PersonenUnterstuetzt,
  SqlQueryShPositionTyp,
  AHVBeitragPosition,
  InstitutionSuchenWh
} from './models';
@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})

export class AhvBeitrageApiClient extends HttpService {

  @GET('api/v1/Sozialhilfe/AHVBeitrag/BgSilAHVBeitrag?bgBudgetID={query}')
  @Adapter(AhvBeitrageService.bgSilAHVBeitragAdapter)
  public getBgSilAHVBeitrag(@Path('query') query: any): Observable<any> {
    return null;
  }

  @GET('api/Sozialhilfe/GetPersonenUnterstuetzt?bgBudgetID={query}')
  @Adapter(AhvBeitrageService.personenUnterstuetztAdapter)
  public getPersonenUnterstuetzt(@Path('query') query: any): Observable<any> {
    return null;
  }

  @GET('api/Sozialhilfe/GetSqlQueryShPositionTyp{query}')
  @Adapter(AhvBeitrageService.sqlQueryShPositionTypAdapter)
  public getSqlQueryShPositionTyp(@Path('query') query: any): Observable<any> {
    return null;
  }

  @GET('api/v1/Sozialhilfe/AHVBeitrag/AHVBeitragPosition{query}')
  @Adapter(AhvBeitrageService.ahvBeitragPositionAdapter)
  public getAHVBeitragPosition(@Path('query') query: any): Observable<any> {
    return null;
  }
  @GET('api/v1/Common/DlgAuswahl/InstitutionWh')
  @Adapter(AhvBeitrageService.institutionSuchenWhAdapter)
  public getInstitutionSuchenWh(): Observable<any> {
    return null;
  }
  @DELETE('api/v1/Sozialhilfe/AHVBeitrag/AHVBeitragPosition')
  @ViewCatcher()
  @Adapter(AhvBeitrageService.deleteAHVBeitragPositionAdapter)
  public deleteAhvBeitrage(@Body ahvBeitrage: AHVBeitragPosition): Observable<any> {
    return null;
  }
  @PUT('api/Sozialhilfe/UpdateAHVBeitragPosition')
  @Adapter(AhvBeitrageService.updateAHVBeitragPositionAdapter)
  public updateAhvBeitrage(@Body ahvBeitrage: AHVBeitragPosition): Observable<any> {
    return null;
  }
  @POST('api/v1/Sozialhilfe/AHVBeitrag/AHVBeitragPosition')
  @ViewCatcher()
  @Adapter(AhvBeitrageService.createAHVBeitragPositionAdapter)
  public addAhvBeitrage(@Body ahvBeitrage: AHVBeitragPosition): Observable<any> {
    return null;
  }
  @GET('api/lookups/BgBewilligungStatus')
  @Adapter(AhvBeitrageService.getLookupsAdapter)
  public getLookUps(): Observable<any> {
    return null;
  }
  @GET('api/v1/Sozialhilfe/AHVBeitrag/Anpassung{query}')
  @ViewCatcher()
  @Adapter(AhvBeitrageService.getDropDownAnpassungAdapter)
  public getDropDownAnpassung(@Path('query') query: any): Observable<any> {
    return null;
  }
}
