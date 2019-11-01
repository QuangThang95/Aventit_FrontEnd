import 'devextreme-intl';
import { locale } from 'devextreme/localization';
import { Component, OnInit, OnDestroy, AfterViewInit, Injector, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';
import { UtilService } from '@shared/utilites/utility.service';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { AhvBeitrageSandbox } from '../../ahv-beitrage.sandbox';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { isNullOrUndefined } from 'util';
import { DxValidationGroupComponent, DxValidatorComponent, DxDropDownBoxComponent, DxDateBoxComponent, DxSelectBoxComponent } from 'devextreme-angular';
import { AppEnums } from '@shared/AppEnum';
@Component({
  selector: 'kiss-ahv-beitrage-detail-edit',
  templateUrl: './ahv-beitrage-detail-edit-component.html',
  styleUrls: ['./ahv-beitrage-detail-edit-component.scss']
})
@SetClassRight('CtlAhvBeitrage')
export class FormDetailEditComponent  extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() ahvBetrageDetailEmit: any;
  @Input() listSqlQueryShPositionTypEmit: any;
  @Input() sizeQualifier: number;
  @Input() numberFormat: string;
  @Input() valueMaxValidateBetrag: any;
  @Input() valueMinValidateBetrag: any;
  @Input() maxDate: any;
  @Input() minDate: any;
  @Input() showDateVon: any;
  @Input() msgValidateDateErr: any;
  @Input() handleKeyboardEventEmit: any;
  @Input() isShow: any;

  @Output() focusIn = new EventEmitter();
  @Output() focusOut = new EventEmitter();
  @Output() keyDownSelectOption = new EventEmitter();
  @Output() closedSelectBox = new EventEmitter();
  @Output() itemDropdownClick = new EventEmitter();
  @Output() changeData = new EventEmitter();
  @Output() keyDownAdd = new EventEmitter();
  @Output() dataGridInstitutionClick = new EventEmitter();

  @ViewChild('validationAhvBeitrage') validationAhvBeitrage: DxValidationGroupComponent;
  @ViewChild('datumVon') datumVon: DxDateBoxComponent;
  @ViewChild('datumBis') datumBis: DxDateBoxComponent;
  @ViewChild('la') la: DxSelectBoxComponent;
  @ViewChild('person') person: DxSelectBoxComponent;
  @ViewChild('institution') institution: DxDropDownBoxComponent;
  @ViewChild('validatorBis') validatorBis: DxValidatorComponent;


  ahvBeitragPositionDetail: any;
  listSqlQueryShPositionTyp: any = [];
  isgridInstitution: false;
  nameFocus: string;
  maxDateValue: any;
  minDateValue: any;
  isShowStatus: boolean;

  constructor(injector: Injector, public translateService: TranslateService,
    public ahvBeitragesSandbox: AhvBeitrageSandbox, public utilService: UtilService,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox, private datePipe: DatePipe, public router: Router,
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(changes.listSqlQueryShPositionTypEmit) && !isNullOrUndefined(changes.listSqlQueryShPositionTypEmit.currentValue)) {
      this.listSqlQueryShPositionTyp = changes.listSqlQueryShPositionTypEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.ahvBetrageDetailEmit) && !isNullOrUndefined(changes.ahvBetrageDetailEmit.currentValue)) {
      this.ahvBeitragPositionDetail = changes.ahvBetrageDetailEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.maxDate) && !isNullOrUndefined(changes.maxDate.currentValue)) {
      this.maxDateValue = changes.maxDate.currentValue;
    }
    if (!isNullOrUndefined(changes.minDate) && !isNullOrUndefined(changes.minDate.currentValue)) {
      this.minDateValue = changes.minDate.currentValue;
    }
    if (!isNullOrUndefined(changes.isShow) && !isNullOrUndefined(changes.isShow.currentValue)) {
      if(changes.isShow.currentValue) {
        setTimeout(() => this.person.instance.focus(), 300);
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(e: any) {
    if ((e.keyCode === AppEnums.KeyCode.KeyF4)) {
      if (isNullOrUndefined(this.nameFocus)) {
        this.nameFocus = 'person';
      }
      if (this[this.nameFocus].opened) {
        this[this.nameFocus].instance.close();
      } else {
        this[this.nameFocus].instance.open();
      }
      return;
    }
  }

  validationBisDate(data) {
    if (!data.value) {
      return true;
    } else if (new Date(data.rule.min) >= new Date(data.value)) {
      return false;
    }
    return true;
  }

  onFocusIn($e, field) {
    this.nameFocus = field;
    this.focusIn.emit({$e, field});
  }

  onKeyDownAdd (e) {
  }

  onFocusOut($e, field) {
    this.focusOut.emit({$e, field});
  }

  onChangeData($e, field) {
    this.changeData.emit({$e, field});
  }

  onKeyDownSelectOption($e, field) {
    this.keyDownSelectOption.emit({$e, field});
  }

  ondDataGridInstitutionClick($e) {
    this.dataGridInstitutionClick.emit($e);
    this.isgridInstitution = false;
  }

  onItemDropdownClick($e, field) {
    this.itemDropdownClick.emit({$e, field});
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }
}


