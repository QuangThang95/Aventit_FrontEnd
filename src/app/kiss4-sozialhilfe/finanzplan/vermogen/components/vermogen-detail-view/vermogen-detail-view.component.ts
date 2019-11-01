import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@shared/components/base.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';

@Component({
    selector: 'kiss-vermogen-detail-view',
    templateUrl: './vermogen-detail-view.component.html',
    styleUrls: ['./vermogen-detail-view.component.scss']
})
export class VermogenDetailViewComponent extends BaseComponent implements OnInit, OnDestroy {

    @Input() dataSource: any;

    constructor(injector: Injector, public translateService: TranslateService, ) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

}
