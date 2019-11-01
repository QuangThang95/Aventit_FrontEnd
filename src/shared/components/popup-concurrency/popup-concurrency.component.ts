import { Component, Input, ViewChild } from '@angular/core';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { DxPopupComponent, DxButtonComponent } from 'devextreme-angular';

@Component({
  selector: 'app-popup-concurrency',
  templateUrl: './popup-concurrency.component.html',
  styleUrls: ['./popup-concurrency.component.scss']
})
export class PopupConcurrencyComponent {


  @ViewChild('popupComfirm') popupGridFunction: DxPopupComponent;
  @ViewChild('buttonYesconcurrency') buttonYesConcurrency: DxButtonComponent;
  // tslint:disable-next-line:no-input-rename
  @Input('popUpConcurrencyModel') popUpConcurrencyModel: PopUpModel;

  isHide = true;

  constructor() { }
  onShown(e) {
    if (this.popUpConcurrencyModel && this.popUpConcurrencyModel.isVisibleYes && this.buttonYesConcurrency) {
      this.buttonYesConcurrency.instance.focus();
    }
  }
  buttonClicked(result) {
    if (result === 'abbrechen' && this.chkYesFunction()) {
      this.popUpConcurrencyModel.funcYes();
      this.isHide = false;
    } else if (result === 'daten' && this.chkNoFunction()) {
      this.popUpConcurrencyModel.funcNo();
      this.isHide = false;
    } else {
      this.popUpConcurrencyModel.isVisible = false;
    }
  }

  onHiding(e) {
    if (this.chkHidingFunction()) {
      if (this.isHide) {
        this.popUpConcurrencyModel.funcHiding();
      }
      this.isHide = true;
    }
  }
  onHidden(e) {
    if (this.chkHiddenFunction()) {
      if (this.isHide) {
        this.popUpConcurrencyModel.funcHidden();
      }
      this.isHide = true;
    }
  }

  chkYesFunction() {
    return this.popUpConcurrencyModel && this.popUpConcurrencyModel.isVisibleYes
      && this.popUpConcurrencyModel.funcYes && typeof this.popUpConcurrencyModel.funcYes === 'function';
  }

  chkNoFunction() {
    return this.popUpConcurrencyModel && this.popUpConcurrencyModel.isVisibleNo
      && this.popUpConcurrencyModel.funcNo && typeof this.popUpConcurrencyModel.funcNo === 'function';
  }

  chkHidingFunction() {
    return this.popUpConcurrencyModel && this.popUpConcurrencyModel.funcHiding && typeof this.popUpConcurrencyModel.funcHiding === 'function';
  }

  chkHiddenFunction() {
    return this.popUpConcurrencyModel && this.popUpConcurrencyModel.funcHidden && typeof this.popUpConcurrencyModel.funcHidden === 'function';
  }

}
