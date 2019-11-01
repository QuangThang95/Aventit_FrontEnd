import 'devextreme-intl';
import { locale } from 'devextreme/localization';
import { Component, OnInit, OnDestroy, AfterViewInit, Injector, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
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
@Component({
  selector: 'kiss-ahv-beitrage-detail-view',
  templateUrl: './ahv-beitrage-detail-view-component.html',
  styleUrls: ['./ahv-beitrage-detail-view-component.scss']
})
@SetClassRight('CtlAhvBeitrage')
export class FormDetailViewComponent  extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() ahvBetrageDetailEmit: any;
  @Input() listSqlQueryShPositionTypEmit: any;

  ahvBeitragPositionDetail: any;
  ahvBeitragReadMode: any;
  listSqlQueryShPositionTyp: any = [];

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
    if (!isNullOrUndefined(changes.ahvBetrageDetailEmit) && !isNullOrUndefined(changes.ahvBetrageDetailEmit.currentValue)) {
      this.ahvBeitragPositionDetail = changes.ahvBetrageDetailEmit.currentValue;
      this.ahvBeitragReadMode = { ... this.ahvBeitragPositionDetail };
      if (this.listSqlQueryShPositionTyp.length > 0) {
        this.getReadModeData();
      }
    }
    if (!isNullOrUndefined(changes.listSqlQueryShPositionTypEmit) && !isNullOrUndefined(changes.listSqlQueryShPositionTypEmit.currentValue)) {
      this.listSqlQueryShPositionTyp = changes.listSqlQueryShPositionTypEmit.currentValue;
      this.getReadModeData();
    }
  }

  ngAfterViewInit() {
  }

  getSizeQualifier(width) {
    if (width < 1300) {
      return 'xs';
    }
    return 'lg';
  }

  private getReadModeData() {
    if (this.ahvBeitragPositionDetail.betrag || this.ahvBeitragPositionDetail.betrag === 0) {
      this.ahvBeitragReadMode.betrag = ( + this.ahvBeitragPositionDetail.betrag.toFixed(2))
        .toLocaleString(UtilityHelper.getLanguageCodeFromLocalStorage());
    } else {
      this.ahvBeitragReadMode.betrag = '';
    }
    if ((this.ahvBeitragReadMode.betrag || this.ahvBeitragReadMode.betrag === '0') && this.ahvBeitragReadMode.betrag.indexOf('.') === -1) {
      this.ahvBeitragReadMode.betrag += '.00';
    }
    if (this.listSqlQueryShPositionTyp.length) {
      const ReadModePositionSart = this.listSqlQueryShPositionTyp.find(el => el.bgPositionsartID === this.ahvBeitragPositionDetail.bgPositionsartID) || {};
      this.ahvBeitragReadMode.positionSart = ReadModePositionSart['text'] || '';
    }
  }

  ngOnDestroy() {
  }
}


