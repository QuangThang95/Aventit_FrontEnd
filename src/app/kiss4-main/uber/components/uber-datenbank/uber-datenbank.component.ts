import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxButtonComponent } from 'devextreme-angular';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'kiss-uber-datenbank',
  templateUrl: './uber-datenbank.component.html',
  styleUrls: ['./uber-datenbank.component.scss']
})
export class UberDatenbankComponent implements OnInit {
  isExpandTabDatenBank = true;
  isDatenBankVisible: boolean;
  emitMouseEvent = new Subject<boolean>();
  customizeBtn = [
    {
      text: this.translateService.instant('Uber.Buttons.Copy'),
      visible: true,
      name: 'uber-datenbank-copy',
      type: 'default'
    }
  ];
  @Input() databaseInfo: any;
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();
  @Output() mouseEnterUber: EventEmitter<any> = new EventEmitter();
  @Output() mouseLeaveUber: EventEmitter<any> = new EventEmitter();
  @ViewChild('btnDatabank') btnDatabank: DxButtonComponent;


  constructor(public translateService: TranslateService) { }

  ngOnInit() {
  }

  toolBarOnItemClick(e, text) {
    switch (e) {
      case 'uber-datenbank-copy':
        this.buttonClick.emit(text);
        break;
      default:
        break;
    }
  }
  changeCollapseFormContent(event) {
    if (event.target.textContent === this.translateService.instant('Uber.Title_Group.Database')) {
      this.isExpandTabDatenBank = !this.isExpandTabDatenBank;
    }
  }
}
