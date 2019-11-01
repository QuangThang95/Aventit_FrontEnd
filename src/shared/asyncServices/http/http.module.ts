import {
  CommonModule
} from '@angular/common';
import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {
  HttpService
} from './http.service';
import {
  HttpResponseHandler
} from './httpResponseHandler.service';

@NgModule()
export class HttpServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HttpServiceModule,
      providers: [
        HttpService,
        HttpResponseHandler
      ]
    };
  }
}
