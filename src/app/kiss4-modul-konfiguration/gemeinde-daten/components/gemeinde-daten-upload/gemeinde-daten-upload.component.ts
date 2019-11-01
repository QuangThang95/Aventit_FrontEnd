import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxFileUploaderComponent } from 'devextreme-angular';

@Component({
    selector: 'kiss-gemeinde-daten-upload',
    templateUrl: './gemeinde-daten-upload.component.html',
    styleUrls: ['./gemeinde-daten-upload.component.scss']
})
@SetClassRight('CtlGemeindeDaten')
export class GemeindeDatenUploadComponent {

    @ViewChild('uploader') uploader: DxFileUploaderComponent;

    @Output() uploadSuccess = new EventEmitter<boolean>();
    @Output() showProgressBar = new EventEmitter<boolean>();

    @Input() remainingMessage: RemainingMessageComponent;

    uploadUrl = UtilityHelper.getUploadUrl('api/v1/Basis/GemeindeImportFile');
    requestHeader = UtilityHelper.getRequestHeaderFromLocalStorage();
    popupTitle = this.translateService.instant('GemeindeDaten.Message.Information');
    maxFileSize = CommonConstant.MAX_FILE_SIZE;

    constructor(private translateService: TranslateService) {
    }

    // #region component CRUD functions
    onUploadError(event) {
        this.uploader.instance.option('value', []);
        this.showProgressBar.emit(false);
        this.remainingMessage.showMessage(event.request.response ? JSON.parse(event.request.response).message : event.request.statusText);
    }

    onUploaded(event) {
        this.uploader.instance.option('value', []);
        if (event.request.response) {
            const response = JSON.parse(event.request.response);
            if (!response.isSuccess) {
                this.showProgressBar.emit(false);
                this.remainingMessage.showMessage(response.errorMessage);
            } else {
                this.showProgressBar.emit(true);
                this.uploadSuccess.emit(true);
            }
        }
    }

    onUploadStarted(e) {
        this.showProgressBar.emit(true);
    }

    onValueChanged(event) {
        if (event.value[0] && event.value[0].size > this.maxFileSize) {
            this.remainingMessage.showMessage(this.translateService.instant('GemeindeDaten.Message.MaxFileSizeMessage'));
        }
    }
    // #endregion

}
