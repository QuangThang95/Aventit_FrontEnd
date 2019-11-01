import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';
import { TranslateService } from '@ngx-translate/core';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'demographie-form',
    templateUrl: './demographie.component.html',
    styleUrls: ['./demographie.component.scss'],
})

export class DemographieComponent extends BaseComponent implements OnInit, CanComponentDeactivate {
    customizeBtn = [
        {
            text: 'History',
            visible: true,
            name: 'history'
        },
    ];
    pageTitle: string;
    isPopupVisible: boolean;

    constructor(injector: Injector,
        public layoutSandbox: LayoutSandbox,
        public translateService: TranslateService) {
        super(injector);
    }
    ngOnInit() {
        this.pageTitle = 'Demographie';
    }
    toolBarOnItemClick($event) {
        switch ($event) {
            case 'history': {
                this.onClickHistory();
                return;
            }
            default:
                break;
        }
    }
    onClickHistory() {
        this.isPopupVisible = true;
    }

    canDeactivate() {
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
        return true;
    }
}
