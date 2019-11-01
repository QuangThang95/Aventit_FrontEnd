import {Component, EventEmitter, Injector, OnDestroy, OnInit, Output} from '@angular/core';
import {CommonConstant} from '@shared/common/constant.common';
import {TranslateService} from '@ngx-translate/core';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import {BaseComponent} from '@shared/components/base.component';
import {locale} from 'devextreme/localization';
import {AfterViewInit, Input} from '@node_modules/@angular/core';

interface  IZulage {
  zulageId: number;
  zulage: string;
}
@Component({
  selector: 'kiss-zulagen-efb-view',
  templateUrl: './zulagen-efb-view.component.html',
  styleUrls: ['./zulagen-efb-view.component.scss']
})
export class ZulagenEfbViewComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(injector: Injector, public translateService: TranslateService, ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }
  //#region "Declare variables input and out put"
  @Output() action = new EventEmitter<string>();
  @Input() dataForm: any;
  @Input() zulageSelectBox: IZulage[] = [];
  @Input() anteilSelectBox: any[] = [];
  //#endregion

  CommonBtn = [...CommonConstant.AdditionalButtons];
  listBtn = [];
  isViewModel = true;
  zulageSelected: IZulage;
  anteilSelected: any;
  numberFormat = '#,###.00';

  // Fake data
  person: string[] = [
    'Perter',
    'Canh Hung',
    'AAAAA',
  ];

  customizeBtn = [
    {
      text: 'CtlBfsFragenkatalog.Bearbeiten',
      disabled: !this.isViewModel,
      name: 'bearbeiten',
      icon: 'edit',
      type: 'default'
    }
  ];

  ngOnInit() {


  }

  ngAfterViewInit() {
    this.zulageSelected = this.zulageSelectBox.find(zulageSelected => zulageSelected.zulageId==this.dataForm.zulageId);
    this.anteilSelected = this.anteilSelectBox.find(anteilSelected => anteilSelected.anteilId==this.dataForm.anteilId);
  }

  ngOnDestroy() {

  }

  //#region "toolbar event"
  toolBarOnItemClick(event) {
    this.action.next(event);
  }
}
