import { Component } from '@angular/core';
import { GemeindeDaten } from '@app/kiss4-modul-konfiguration/gemeinde-daten/models';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';

@Component({
    selector: 'kiss-gemeinde-daten-detail',
    templateUrl: './gemeinde-daten-detail.component.html',
    styleUrls: ['./gemeinde-daten-detail.component.scss']
})
@SetClassRight('CtlGemeindeDaten')
export class GemeindeDatenDetailComponent {

    selectedGemeindeDaten: GemeindeDaten = new GemeindeDaten();
    formatDate = CommonConstant.FORMAT_DATE;
    isExpand = true;

    constructor() { }

    // #region component CRUD functions
    setDataGemeindeDaten(data: GemeindeDaten) {
        this.selectedGemeindeDaten = data;
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
