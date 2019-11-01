import {Component, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BaseComponent} from '@shared/components/base.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import {locale} from 'devextreme/localization';

@Component({
    selector: 'kiss-vermogen-detail-edit',
    templateUrl: './vermogen-detail-edit.component.html',
    styleUrls: ['./vermogen-detail-edit.component.scss']
})
export class VermogenDetailEditComponent extends BaseComponent implements OnInit, OnDestroy {

    @Input() dataSource: any;
    @Input() addMode: boolean;
    @Input() dataSelectBoxPerson: any;
    @Input() dataSelectBoxArtDesVermogen: any;

    constructor(injector: Injector, public translateService: TranslateService, ) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    }

    ngOnInit() {
        if (this.addMode) {
            this.dataSource = {};
        }
    }

    ngOnDestroy() {

    }


}
