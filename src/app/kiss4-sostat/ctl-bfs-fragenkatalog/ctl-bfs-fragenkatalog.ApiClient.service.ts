import {Adapter, Body, DefaultHeaders, DELETE, GET, HttpService, Path, POST, PUT, ViewCatcher} from '@shared/asyncServices/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CtlBfsFragenkatalogService} from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/ctl-bfs-fragenkatalog.service';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class CtlBfsFragenkatalogApiClient extends HttpService {

  @GET('api/v1/Sostat/CtlBfsFragenkatalog')
  @Adapter(CtlBfsFragenkatalogService.gridAdapter)
  public getCtlBfsFragenkatalog(): Observable<any> {
    return null;
  }

  @GET('api/v1/Sostat/BfsFrage{query}')
  @Adapter(CtlBfsFragenkatalogService.getCtlBfsFragenkatalogs)
  public getListCtlBfsFragenkatalog(@Path('query') query: any): Observable<any> {
    return null;
  }

  @POST('api/v1/Sostat/BfsFrage')
  @Adapter(CtlBfsFragenkatalogService.addCtlBfsFragenkatalogAdapter)
  public addCtlBfsFragenkatalog(@Body ctlBfsFragenkatalog: any): Observable<any> {
    return null;
  }

  @PUT('api/v1/Sostat/BfsFrage/{ID}')
  @ViewCatcher()
  @Adapter(CtlBfsFragenkatalogService.updateCtlBfsFragenkatalogs)
  public updateCtlBfsFragenkatalog(@Path('ID') BFSFrageID: number, @Body ctlBfsFragenkatalog: any): Observable<any> {
    return null;
  }

  @DELETE('api/v1/Sostat/BfsFrage/{BFSFrageID}')
  @Adapter(CtlBfsFragenkatalogService.deleteCtlBfsFragenkatalogAdapter)
  public deleteCtlBfsFragenkatalog(@Path('BFSFrageID') BFSFrageID: number): Observable<any> {
    return null;
  }

}
