import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'kiss-uber-detail',
  templateUrl: './uber-detail.component.html',
  styleUrls: ['./uber-detail.component.scss']
})
export class UberDetailComponent implements OnInit {
  isExpandTabUber = true;
  isUberVisible = false;
  emitMouseEvent = new Subject<boolean>();
  customizeBtn = [
    {
      text: this.translateService.instant('Uber.Buttons.Copy'),
      visible: true,
      name: 'uber-detail-copy',
      type: 'default'
    }
  ];
  @Input() cultureInfo: any;
  @Input() userInfo: any;
  @Input() xUser: any;

  @Output() clicked: EventEmitter<any> = new EventEmitter();
  @Output() clickTitle: EventEmitter<any> = new EventEmitter();
  constructor(public translateService: TranslateService) { }

  ngOnInit() {
  }
  toolBarOnItemClick(e) {
    switch (e) {
      case 'uber-detail-copy':
        this.clicked.emit();
        break;
      default:
        break;
    }
  }
  changeCollapseFormContent(event) {
    if (event.target.textContent === this.translateService.instant('Uber.Title_Group.Title')) {
      this.isExpandTabUber = !this.isExpandTabUber;
    }
  }
}
