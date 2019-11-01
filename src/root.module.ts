import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from './environments/environment';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Title, BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { HttpServiceModule } from '@shared/asyncServices/http';
import { UtilityModule } from '@shared/utilites';
// Register Router
import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';
import { AppModule } from '@app/app.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
// Register Store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers, AppCustomSerializer } from '@shared/store';
import {
  StoreRouterConnectingModule, RouterStateSerializer
} from '@ngrx/router-store';
// Register Effects Root
import { SettingsEffects } from './shared/store/effects/settings.effects';
import { LayoutEffects } from '@shared/store/effects/layout.effects';
import { AppEffects } from '@shared/store/effects/app.effects';
/**
 * Register Providers
 */
import { RootSandbox } from './root.sandbox';
import { AppConfigService as ConfigService } from './app-config.service';
/**
 * Register AppInsights
 */
import { AppInsights } from './environments/appInsight';
// Import the Application Insights module and the service provider
import { ApplicationInsightsModule, AppInsightsService } from '@markpieszak/ng-application-insights';
/**
 * Register NGSW
 */
import { ServiceWorkerModule } from '@angular/service-worker';
/**
 * Register event Boa
 */
import { EventModule } from './shared/events/event.module';
import { TimeagoModule, TimeagoFormatter, TimeagoCustomFormatter, TimeagoIntl } from 'ngx-timeago';
/**
 * Calling functions or calling new is not supported in metadata when using AoT.
 * The work-around is to introduce an exported function.
 *
 * The reason for this limitation is that the AoT compiler needs to generate the code that calls the factory
 * and there is no way to import a lambda from a module, you can only import an exported symbol.
 */
export function configServiceFactory(config: ConfigService) {
  return () => config.load();
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    RootRoutingModule,
    EventModule.forRoot(),
    AppModule.forRoot(),
    LayoutContainersModule.forRoot(),
    // Third party modules
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    }),
    SimpleNotificationsModule.forRoot(),
    // App custom dependencies
    HttpServiceModule.forRoot(),
    UtilityModule.forRoot(),
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * store, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/store/README.md
     */
    StoreModule.forRoot(reducers, { metaReducers }),
    /**
     * Register Router state connect
     */
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    /**
     * EffectsModule.forRoot() sets up the effects class to be initialized
     * immediately when the application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/README.md
     */
    EffectsModule.forRoot([SettingsEffects, LayoutEffects, AppEffects]),
    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension/
     * Instrumentation must be imported after importing StoreModule (config is optional)
     */
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    // register module ServiceWorker
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    // register AppInsights error handler
    ApplicationInsightsModule.forRoot({
      instrumentationKey: AppInsights.instrumentationKey
    }),
    TimeagoModule.forRoot({
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
      intl: { provide: TimeagoIntl, useClass: TimeagoIntl },
    }),
  ],
  declarations: [RootComponent],
  providers: [
    Title,
    RootSandbox,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true
    },
    // register AppInsightsService
    AppInsightsService,
    // register RouterStateSerializer custom
    { provide: RouterStateSerializer, useClass: AppCustomSerializer }
  ],
  bootstrap: [RootComponent]
})
export class RootModule { }
