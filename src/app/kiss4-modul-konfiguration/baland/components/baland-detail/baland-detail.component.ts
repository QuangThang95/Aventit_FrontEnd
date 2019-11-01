import { Component } from '@angular/core';
import { Baland } from '@app/kiss4-modul-konfiguration/baland/models';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';

@Component({
    selector: 'kiss-baland-detail',
    templateUrl: './baland-detail.component.html',
    styleUrls: ['./baland-detail.component.scss']
})
@SetClassRight('CtlBaland')
export class BalandDetailComponent {

    selectedBaland = new Baland();
    formatDate = CommonConstant.FORMAT_DATE;
    isExpand = true;

    constructor() { }

    // #region component CRUD functions
    setDataBaland(data: Baland) {
        this.selectedBaland = data;
    }
    // #endregion

    // #region utility functions
    screen(width) {
        return (width < CommonConstant.SCREEN_RESOLUTION_LARGE) ? AppEnums.ScreenResolution.SMALL : AppEnums.ScreenResolution.LARGE;
    }

    onCollapseDetailContainer(event) {
        event.stopPropagation();
        this.isExpand = !this.isExpand;
    }
    // #endregion

}
