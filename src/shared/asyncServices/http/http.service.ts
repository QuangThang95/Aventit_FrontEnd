import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Http,
  Request
} from '@angular/http';
import {
  Observable
} from 'rxjs/Observable';
import {
  HttpResponseHandler
} from './httpResponseHandler.service';
import {
  HttpAdapter
} from './http.adapter';

import { AppConfigService as ConfigService } from './../../../app-config.service';

/**
 * Supported @Produces media types
 */
export enum MediaType {
  JSON,
  FORM_DATA
}

@Injectable()
export class HttpService {

  public constructor(
    protected http: Http,
    protected httpCLient: HttpClient,
    protected configService: ConfigService,
    protected responseHandler: HttpResponseHandler) {
  }

  protected getBaseUrl(): string {
    return this.configService.getConfig().api.baseUrl;
  }

  protected getConfigsApi() {
    return this.configService.getConfig().api;
  }

  protected getDefaultHeaders(): Object {
    return null;
  }

  protected getTokens() {
    return localStorage.getItem('user:token');
  }

  protected getLangCulture() {
    return localStorage.getItem('currentLang.Culture') || 'de-CH';
  }

  /**
  * Request Interceptor
  *
  * @method requestInterceptor
  * @param {Request} req - request object
  */
  protected requestInterceptor(req: Request) {
    req.headers.append('Authorization', `Bearer ${this.getTokens()}`);
    req.headers.append('Accept-Language', this.getLangCulture());
    req.headers.append('Accept-Language', this.getLangCulture().slice(0, 2));
  }

  /**
  * Response Interceptor
  *
  * @method responseInterceptor
  * @param {Response} observableRes - response object
  * @returns {Response} res - transformed response object
  */
  protected responseInterceptor(observableRes: Observable<any>, adapterFn?: Function): Observable<any> {
    return observableRes
      .map(res => HttpAdapter.baseAdapter(res, adapterFn))
      .catch((err, source) => this.responseHandler.onCatch(err, source));
  }
  protected responseInterceptorLoginError(observableRes: Observable<any>, adapterFn?: Function): Observable<any> {
    return observableRes
      .map(res => HttpAdapter.baseAdapter(res, adapterFn))
      .catch((err, source) => this.responseHandler.LoginError(err, source));
  }

  protected responseInterceptorViewCatcher(observableRes: Observable<any>, adapterFn?: Function): Observable<any> {
    return observableRes
      .map(res => HttpAdapter.baseAdapter(res, adapterFn))
      .catch((err, source) => this.responseHandler.onCatchInView(err, source));
  }
}
