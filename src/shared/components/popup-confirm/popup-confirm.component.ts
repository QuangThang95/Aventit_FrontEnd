import { Component, Input, ViewChild } from '@angular/core';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { DxButtonComponent, DxPopupComponent } from 'devextreme-angular';

@Component({
    selector: 'app-popup-confirm',
    templateUrl: './popup-confirm.component.html',
    styleUrls: ['./popup-confirm.component.scss']
})
export class PopupConfirmComponent {


    @ViewChild('popupComfirm') popupGridFunction: DxPopupComponent;
    @ViewChild('buttonYesConfirm') buttonYesConfirm: DxButtonComponent;
    // tslint:disable-next-line:no-input-rename
    @Input('popUpModel') popUpModel: PopUpModel;

    constructor() { }

    initPopUpModel() {
        this.popUpModel = new PopUpModel(
            {
                title: '',
                isVisibleTitle: true,
                isVisible: false,
                message: '',
                textYes: '',
                isVisibleYes: false,
                textNo: '',
                isVisibleNo: false,
                funcYes: null,
                funcNo: null,
                funcHiding: null
            }
        );
    }

    onShown(e) {
        if (this.popUpModel && this.popUpModel.isVisibleYes && this.buttonYesConfirm) {
            this.buttonYesConfirm.instance.focus();
        }
    }

    buttonClicked(result) {
        if (result === 'yes' && this.chkYesFunction()) {
            this.popUpModel.funcYes();
        } else if (result === 'no' && this.chkNoFunction()) {
            this.popUpModel.funcNo();
        } else {
            this.popUpModel.isVisible = false;
        }
    }

    onHiding(e) {
        if (this.chkHidingFunction()) {
            this.popUpModel.funcHiding();
        }
    }

    onHidden(e) {
        if (this.chkHiddenFunction()) {
            this.popUpModel.funcHidden();
        }
    }

    chkYesFunction() {
        return this.popUpModel && this.popUpModel.isVisibleYes
            && this.popUpModel.funcYes && typeof this.popUpModel.funcYes === 'function';
    }

    chkNoFunction() {
        return this.popUpModel && this.popUpModel.isVisibleNo
            && this.popUpModel.funcNo && typeof this.popUpModel.funcNo === 'function';
    }

    chkHidingFunction() {
        return this.popUpModel && this.popUpModel.funcHiding && typeof this.popUpModel.funcHiding === 'function';
    }

    chkHiddenFunction() {
        return this.popUpModel && this.popUpModel.funcHidden && typeof this.popUpModel.funcHidden === 'function';
    }

    showPopupModel(title: string, message: string, funcHiding?, funcYes?, funcNo?) {
        this.popUpModel.title = title;
        this.popUpModel.message = message;
        this.popUpModel.funcHiding = funcHiding;
        if (funcYes) {
            this.popUpModel.funcYes = funcYes;
            this.popUpModel.isVisibleYes = true;
        }
        if (funcNo) {
            this.popUpModel.funcNo = funcNo;
            this.popUpModel.isVisibleNo = true;
        }
        this.popUpModel.isVisible = true;
    }

    hidePopupModel() {
        this.popUpModel.isVisible = false;
    }

}
