import 'devextreme-intl';

import { Component, Injector, OnInit } from '@angular/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { Subject } from 'rxjs';



@Component({
    selector: 'kiss-kennzahlen',
    templateUrl: './kennzahlen.component.html',
    styleUrls: ['./kennzahlen.component.scss']
})
@SetClassRight('CtlBfsQueryKennzahlen')  // multi language
export class KennzahlenComponent extends BaseComponent implements OnInit, CanComponentDeactivate {

    constructor(
        injector: Injector,
        public layoutSandbox: LayoutSandbox
    ) {
        super(injector);
    }

    messageErr = '';
    listBtn;
    customizeBtn = [];
    tableAction$ = new Subject<string>();

    ngOnInit() {
    }

    toolBarOnItemClickTopGrd(event: string) {
        this.tableAction$.next(event);
    }

    onMessageChange(event) {
        this.messageErr = event;
    }
    isHideFilter(event) {
        const listBtnHideDelete = [
            CommonConstant.ToolbarButtons,
            UtilityHelper.getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn,CommonConstant.isFilterBuilder, CommonConstant.GridSettingBtn])
        ];
        const listBtnHideFilter =  [
            CommonConstant.ToolbarButtons,
            UtilityHelper.getConditionListBtn([...CommonConstant.AdditionalButtons], [ CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])
        ];
       this.listBtn = (event) ? listBtnHideDelete : listBtnHideFilter ;

    }

    canDeactivate() {
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
        return true;
    }

}
