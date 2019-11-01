import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kiss-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class ProfileBarComponent {
  isLogout = false;
  @Input() userImage = '';
  @Input() userEmail = '';
  @Input() selectedLanguage: any;
  @Input() availableLanguages: Array<any>;
  @Output() logout: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();

  itemOptions: any;
  checkIsShowMenu: Boolean = false;

  constructor(
    public translateService: TranslateService,
    private elementRef: ElementRef
  ) { }

  public onDocumentClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isLogout = false;
    }
  }

  toggleLogout() {
    this.checkIsShowMenu = !this.checkIsShowMenu;
    this.itemOptions = [
      {
        name: this.translateService.instant('ProfileActionBar.SignOut'),
        action: ($event) => {
          this.logout.emit($event);
        }
      },
      {
        name: this.translateService.instant('ProfileActionBar.ChangePwd')
      },
      {
        items: this.availableLanguages,
        name: this.translateService.instant('ProfileActionBar.Language')
      }
    ];
  }

  public selectMenu(e) {
    if (e.itemData.flag) {
      this.select.emit(e.itemData);
      this.checkIsShowMenu = false;
    } else if (e.itemData.items && e.itemData.items.length > 0) {
      return;
    } else {
      e.itemData.action(e);
    }
  }

  onShowHeaderMenu(event) {
    event.preventDefault();
    this.checkIsShowMenu = !this.checkIsShowMenu;
  }
}
