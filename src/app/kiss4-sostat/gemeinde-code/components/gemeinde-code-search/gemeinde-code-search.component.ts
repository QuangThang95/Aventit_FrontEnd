import 'devextreme-intl';

import { ChangeDetectionStrategy, Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { GemeindeCode } from '@app/kiss4-sostat/gemeinde-code/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxFormComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'kiss-gemeinde-code-search',
    templateUrl: './gemeinde-code-search.component.html',
    styleUrls: ['./gemeinde-code-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@SetClassRight('CtlQueryBFSGemeinde')
export class GemeindeCodeSearchComponent extends BaseComponent implements OnInit {
    @ViewChild('gemeindeCodeSearchFormInstance') gemeindeCodeSearchFormInstance: DxFormComponent;
    @Output() searchEventEmitter = new EventEmitter();
    //#region "Declare variables to store data in search form"
    searchData = new GemeindeCode();
    minIntValue = AppEnums.Int.MIN_VALUE;
    maxIntValue = AppEnums.Int.MAX_VALUE;
    // expand panel
    isExpand = true;
    options = {
        type: 'default',
        text: this.translateService.instant('GemeindeCode.Ausführen'),
        icon: 'fa fa-search',
        onClick: () => {
          this.onSearchByButton();
      }
    };
    //#endregion
    constructor(injector: Injector, public translateService: TranslateService) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    }

    //#region component life cycle functions
    ngOnInit() { }

    //#endregion

    //#region common functions
    onSearch() {
        this.searchEventEmitter.emit({
            GemeindeName: this.searchData.Name ? this.searchData.Name : '',
            PLZ: !isNullOrUndefined(this.searchData.PLZ) ? this.searchData.PLZ : ''
        });
    }
    onSearchContainerClick(event) {
        if (event.currentTarget.getElementsByClassName('dx-state-focused').length <= 0) {
            this.onSearch();
        }
    }
    onCollapseSearchContainer(event) {
        event.stopPropagation();
        this.isExpand = !this.isExpand;
    }

    onSearchByButton() {
        this.onSearch();
    }
    // #endregion
}
