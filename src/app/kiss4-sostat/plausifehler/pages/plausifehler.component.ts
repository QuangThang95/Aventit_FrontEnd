import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
    PlausifehlerListComponent,
} from '@app/kiss4-sostat/plausifehler/containers/plausifehler-list/plausifehler-list.component';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { ModelSearch } from '../models/plausifehler-search.model';
import { PlausifehlerSandbox } from '../plausifehler.sandbox';

@Component({
    selector: 'kiss-plausifehler',
    templateUrl: './plausifehler.component.html',
    styleUrls: ['./plausifehler.component.scss']
})
@SetClassRight('CtlBfsQueryPlausiFehler')  // multi language
export class PlausifehlerComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {
    @ViewChild('plausifehlerList') plausifehlerComponentList: PlausifehlerListComponent;
    //#region "Declare variables Global"
    plausifehlerJahr: number;
    persons: any;
    mitarbeiters: any;
    objectSearch: any;
    listBtn = [CommonConstant.ToolbarButtons, UtilityHelper.getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    customizeBtn = [];
    isErrorClosed = false;
    messageErr: any;
    private subscriptions: Subscription = new Subscription();
    //#endregion
    //#region "component life cycle functions"
    constructor(injector: Injector, public plausifehlerSandbox: PlausifehlerSandbox, public utilService: UtilService,
        public translateService: TranslateService, public layoutSandbox: LayoutSandbox) {
        super(injector);
    }

    ngOnInit() {
        this.loadDataInitSearch();
        this.registerEvents();
    }

    ngOnDestroy(): void {
    }
    //#endregion
    //#region "Innit data"
    loadDataInitSearch() {
        this.plausifehlerSandbox.searchPlausifehler();
        this.plausifehlerSandbox.getPersonSuchen();
        this.plausifehlerSandbox.getMitarbeiterInSuchen();
    }

    private registerEvents(): void {
        this.subscriptions.add(
            this.plausifehlerSandbox.PlausifehlersSearchData$.subscribe(state => {
                if (!isNullOrUndefined(state)) {
                    this.plausifehlerJahr = state.jahr;
                    this.plausifehlerSandbox.getPlausifehler(new ModelSearch({
                        Jahr: this.plausifehlerJahr
                    }));
                }
            }));
        this.subscriptions.add(this.plausifehlerSandbox.PlausifehlersPersonData$.subscribe(person => {
            this.persons = person;
        })
        );
        this.subscriptions.add(this.plausifehlerSandbox.PlausifehlersMitarbeiterData$.subscribe(mitarbeiter => {
            if (!isNullOrUndefined(mitarbeiter)) {
                this.mitarbeiters = mitarbeiter;
            }
        })
        );
    }
    //#endregion
    toolBarOnItemClickTopGrd(e) {
        this.plausifehlerComponentList.toolBarOnItemClickTopGrd(e);
    }
    //#region "utility functions"
    doSearch(objectSearch: any) {
        this.objectSearch = objectSearch;
        this.plausifehlerSandbox.getPlausifehler(objectSearch);
    }
    handleMessageError(remainingMessage) {
        this.messageErr = remainingMessage.messageError;
        this.isErrorClosed = remainingMessage.isClose;
    }
    onCloseError() {
        this.isErrorClosed = false;
        this.messageErr = '';
    }

    canDeactivate() {
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
        return true;
    }
    //#endregion
}
