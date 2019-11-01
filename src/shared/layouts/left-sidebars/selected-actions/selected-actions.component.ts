import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { DxListComponent } from 'devextreme-angular/ui/list';

import { ModuleConfigSandbox } from '../module-config/module-config.sandbox';

@Component({
  selector: 'kiss-selected-actions',
  templateUrl: './selected-actions.component.html',
  styleUrls: ['./selected-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedActionsComponent implements OnChanges {

  @ViewChild('listSelected') listSelected: DxListComponent;
  allowDeleting: Boolean = true;
  deleteType: String = 'static';
  selectionMode: String = 'single';
  height: any = 'auto';
  iconUrl: any = 'assets/icon/';
  limitedSelectedActions: Array<any> = [];

  @Input() selectedActions: Array<any> = [];
  @Input() currentUrl;
  @Output() clickItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router,
    public translateService: TranslateService,
    public moduleConfigSandbox: ModuleConfigSandbox,
    public layoutSandbox: LayoutSandbox
  ) { }

  ngOnChanges() {
    // get limit 6 item of selectedActions list
    const length = this.selectedActions.length;
    this.limitedSelectedActions = this.selectedActions.length > 6 ? this.selectedActions.slice(length - 6, length) : this.selectedActions;
    this.checkGoBack();
  }

  onClickItem(itemData: any): void {
    if (itemData.data.type === 'flag_menu') {
      this.layoutSandbox.selectMenu(itemData.data);
    } else {
      this.layoutSandbox.selectAction(itemData.data, itemData.url);
    }
  }

  onDeleteItem(e): void {
    if (this.currentUrl !== e.itemData.url) {
      this.layoutSandbox.deleteSelectedActionItems(e.itemData);
      this.goto(e);
    } else {
      e.cancel = true;
      this.layoutSandbox.setDeletingSticky(e.itemData);
      this.goto(e);
    }
  }

  goto(e) {
    if (this.limitedSelectedActions.length === 1) {
      this.router.navigate(['/']);
    } else if (this.limitedSelectedActions.length > 1 && e.itemData.url === this.currentUrl) {
      this.router.navigate([this.limitedSelectedActions[this.limitedSelectedActions.length - 2].url]);
    }
  }

  checkGoBack() {
    for (let index = 0; index < this.limitedSelectedActions.length; index++) {
      const element = this.limitedSelectedActions[index];
      if (element.url === this.currentUrl && (index + 1) !== this.limitedSelectedActions.length) {
        setTimeout(() => {
          this.layoutSandbox.updateSelectedAction(element);
        });
        break;
      }
    }
  }
}
