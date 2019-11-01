import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { DxFormComponent, DxDateBoxComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';

import { KennzahlenSandbox } from '../../kennzahlen.sandbox';
import { IModelKennzahlen } from '../../models';

@Component({
  selector: 'kiss-kennzahlen-search-box',
  templateUrl: './kennzahlen-search-box.component.html',
  styleUrls: ['./kennzahlen-search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @ViewChild('kennzahlenSearchFormInstance') kennzahlenSearchFormInstance: DxFormComponent;
  @ViewChild('dateboxauszahlung') dateboxauszahlung: DxDateBoxComponent;
  @ViewChild('dateboxauszahlungbis') dateboxauszahlungbis: DxDateBoxComponent;

  @Output() messageChange = new EventEmitter<string>(null);
  erhebungsjahr: number;
  dataSearch: any;
  fixWidth: any = CommonConstant.FIX_WIDTH;
  minDate: Date = new Date(1753, 0, 1);
  letzteAuszahlungVon: Date;
  letzteAuszahlungBis: Date;
  kennzahlenData: IModelKennzahlen;
  private subscription = new Subscription();
  // expand panel
  isExpand = true;
  options = {
    type: 'default',
    text: this.translateService.instant('Kennzahlen.Ausführen'),
    icon: 'fa fa-search',
    onClick: () => {
      this.onSearchByButton();
  }
  };

  constructor(
    private datePipe: DatePipe,
    private pennzahlenSandbox: KennzahlenSandbox,
    private translateService: TranslateService,
  ) { }
  // #region component life cycle functions
  ngOnInit() {
    this.pennzahlenSandbox.initKennzahlen();
    this.subscription.add(this.pennzahlenSandbox.KennzahlensInitSearch$.subscribe(dataExport => {
      if (dataExport) {
        this.kennzahlenData = dataExport;
        this.pennzahlenSandbox.getKennzahlen(this.kennzahlenData);
        this.erhebungsjahr = this.kennzahlenData.erhebungsjahr;
      }
    })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // #endregion

  // #region utility functions
  onkeypress(event) {
    if (event.event.keyCode === AppEnums.KeyCode.KeyEnter) {
      this.onSearch();
    }
    if (event.event.keyCode >= AppEnums.KeyCode.KeyNumber0 && event.event.keyCode <= AppEnums.KeyCode.KeyNumber9) {
      return;
    } else {
      event.event.preventDefault();
    }
  }

  onSearchByEnter() {
    this.onSearch();
  }

  onSearch() {
    if (!this.validateForm()) {
      return;
    }
    const dataSearch = { ...this.kennzahlenData };
    dataSearch.letzteAuszahlungBis = this.datePipe.transform(this.letzteAuszahlungBis, CommonConstant.DATE_FORMAT.MM_dd_yyyy);
    dataSearch.letzteAuszahlungVon = this.datePipe.transform(this.letzteAuszahlungVon, CommonConstant.DATE_FORMAT.MM_dd_yyyy);
    dataSearch.erhebungsjahr = (dataSearch.erhebungsjahr === null) ? this.erhebungsjahr : dataSearch.erhebungsjahr;
    this.pennzahlenSandbox.getKennzahlen(dataSearch);
  }
  validateForm() {
    if (this.isDate(this.kennzahlenData.erhebungsjahr)) {
      this.messageChange.next(this.translateService.instant('Kennzahlen.Message_001'));
      return false;
    }
    this.messageChange.next('');
    const isValidZahlung = this.dateboxauszahlungbis.instance.option('isValid');
    const isValid = this.dateboxauszahlung.instance.option('isValid');
    if (!isValidZahlung || !isValid) {
      return false;
    }
    return true;
  }

  onKeyDownSelectOption(event) {
    if (event.event.keyCode === AppEnums.KeyCode.KeyF4) {
      event.event.preventDefault();
      if (!event.component.option('opened')) {
        event.component.open();
      } else {
        event.component.close();
      }
    }
  }

  private isDate(date: number) {
    return !(date === null || !(date < 10 || (date > 99 && date < 1753) || date > 9999));
  }

  onSearchContainerClick(event) {
    if (event.currentTarget.getElementsByClassName('dx-state-focused').length <= 0) {
      this.onSearchByEnter();
    }
  }

  onCollapseSearchContainer(event) {
    event.stopPropagation();
    this.isExpand = !this.isExpand;
  }

  onSearchByButton() {
    this.onSearch();
  }
  // #endregion
}
