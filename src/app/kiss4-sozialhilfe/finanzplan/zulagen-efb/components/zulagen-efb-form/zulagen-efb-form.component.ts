import {Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CommonConstant} from '@shared/common/constant.common';
import {TranslateService} from '@ngx-translate/core';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import {BaseComponent} from '@shared/components/base.component';
import {locale} from 'devextreme/localization';

@Component({
  selector: 'kiss-zulagen-efb-form',
  templateUrl: './zulagen-efb-form.component.html',
  styleUrls: ['./zulagen-efb-form.component.scss']
})
export class ZulagenEfbFormComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(injector: Injector, public translateService: TranslateService,) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }
  // #region "Declare variables input and out put"
  @Output() action = new EventEmitter<string>();
  @Input() zulageSelectBox: any[] = [];
  @Input() anteilSelectBox: any[] = [];
  @Input() dataForm: any;
  // #endregion

  CommonBtn = [...CommonConstant.AdditionalButtons];
  listBtn = [];
  isViewModel = true;

  numberFormat = '#,###.00';

  //#region "button"
  customizeBtn = [
    {
      text: 'CtlBfsFragenkatalog.Speichern',
      visible: this.isViewModel,
      name: 'speichern',
      disabled: false,
      icon: 'save',
      type: 'default'
    },
    {
      text: 'CtlBfsFragenkatalog.Abbrechen',
      visible: this.isViewModel,
      name: 'abbrechen',
      icon: 'close',
      type: 'default'
    }
  ];


  ngOnInit() {
  }

  ngOnDestroy() {
  }

  //#region "toolbar event"
  toolBarOnItemClick(event) {
    this.action.next(event);
  }

  onChangeZulage(event) {
    // console.log('event', event);
    this.dataForm['zulageId'] = event.value;
  }
  onChangeAnteil(event) {
    // console.log('event', event);
    this.dataForm['anteilId'] = event.value;
  }
}
