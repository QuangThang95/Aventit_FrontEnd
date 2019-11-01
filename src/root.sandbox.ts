import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import * as settingsActions from '@shared/store/actions/settings.actions';
import { UtilService } from '@shared/utilites/utility.service';
@Injectable()
export class RootSandbox extends Sandbox {
    constructor(
        protected appState$: Store<store.State>,
        private utilService: UtilService,
        private router: Router
    ) {
        super(appState$);
    }

    /**
   * Sets up default language for the application. Uses browser default language.
   */
    public setupLanguage(): void {
        const localization: any = this.utilService.getConfig('localization');
        const languages: Array<string> = localization.languages.map(lang => lang.code);
        let selectedLang = localization.defaultLanguage;

        this.utilService.addLangs(languages);
        this.utilService.setDefaultLang(selectedLang);

        const currentLang = localStorage.getItem('currentLang.Culture') || 'de-CH';
        selectedLang = localization.languages.filter(lang => lang.culture === currentLang)[0].code;
        // const selectedCulture = localization.languages.filter(lang => lang.code === selectedLang)[0].culture;
        this.appState$.dispatch(new settingsActions.SetLanguageAction(selectedLang));
        this.appState$.dispatch(new settingsActions.SetCultureAction(currentLang));
        this.utilService.usesLang(selectedLang);
    }

    /**
     * save current culture to localStorage
     */
    public saveCurrentCultureToLocalStorage() {
        this.culture$.subscribe((currentCulture) => {
            if (currentCulture) {
                this.culture = currentCulture;
                localStorage.setItem('currentLang.Culture', currentCulture);
            }
        });
    }

    /**
     * Returns global notification options
     */
    public getNotificationOptions(): any {
        return this.utilService.getConfig('notifications').options;
    }

    public routerController() {
        return this.router;
    }

    public setupToggleNav() {
        localStorage.setItem('settings:toogleNavbar', localStorage.getItem('settings:toogleNavbar') || JSON.stringify(true));
    }
}
