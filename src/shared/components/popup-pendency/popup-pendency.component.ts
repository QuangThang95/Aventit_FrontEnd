import { Component, OnInit, ViewChild } from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular';
import { DxSelectBoxModule } from 'devextreme-angular';

@Component({
  selector: 'app-popup-pendency',
  templateUrl: './popup-pendency.component.html',
  styleUrls: ['./popup-pendency.component.scss']
})
export class PopupPendencyComponent implements OnInit {
  @ViewChild('pendency') pendency: DxPopupComponent;
  @ViewChild('pendencySelectBox') pendencySelectBox: DxSelectBoxModule;
  pendencyData: any = {
    selectBox: 'Item 2'
  };
  pendencySelectData = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  constructor() { }

  ngOnInit() {
  }

  showPopup() {
    this.pendency.instance.show();
  }

  hidePopup() {
    this.pendency.instance.hide();
  }

}
