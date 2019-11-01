import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';

/**
 * Load localization messages devextreme for controls
 */
import { locale, loadMessages } from '@node_modules/devextreme/localization';
import * as deMessages from '@node_modules/devextreme/localization/messages/de.json';
import * as enMessages from '@node_modules/devextreme/localization/messages/en.json';
import * as frMessages from '@node_modules/devextreme/localization/messages/fr.json';
import * as itMessages from '@node_modules/devextreme/localization/messages/it.json';
/**
 * register provider services
 */
import { AppSandbox } from '@app/app.sandbox';
import { AppApiClient } from '@app/appApiClient.service';
import { AppService } from '@app/app.service';

export function configLocalizationFactory() {
  const currentLang = localStorage.getItem('currentLang.Culture') || 'de-CH';
  const lang = currentLang.substring(0, 2);
  return () => {
    loadMessages(deMessages);
    loadMessages(enMessages);
    loadMessages(frMessages);
    loadMessages(itMessages);
    locale(lang);
  };
}

@NgModule({
  imports: [],
  declarations: []
})
export class AppModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: configLocalizationFactory,
          multi: true
        },
        AppSandbox,
        AppApiClient,
        AppService
      ],
    };
  }
}
