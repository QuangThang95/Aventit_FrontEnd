import { Router, NavigationEnd } from '@angular/router';
import { LayoutSandbox } from './layouts.sandbox';
import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from '@shared/models';
import { AppSandbox } from '@app/app.sandbox';
import { AppEnums } from '@shared/AppEnum';
import { PopupPendencyComponent } from '@shared/components/popup-pendency/popup-pendency.component';
import { SearchBoxDatas } from '@shared/mocks/search-boxs.mock';
import { strings as deStrings } from 'ngx-timeago/language-strings/de';
import { strings as englishStrings } from 'ngx-timeago/language-strings/en';
import { TimeagoIntl } from 'ngx-timeago';

@Component({
  host: { '(window:keydown)': 'hotkeys($event)' },
  selector: 'kiss-layouts',
  templateUrl: './layouts.component.html',
})
export class LayoutsComponent implements OnInit, OnDestroy {
  @ViewChild('popupPendency') popupPendency: PopupPendencyComponent;

  private userImageFolder = '/assets/images/users/';
  public userImage = `${this.userImageFolder}/user.jpg`;
  public userEmail = '';
  public copyRightName: number;
  searchBoxDatas = SearchBoxDatas;
  isFallbearbeitung: boolean;
  moduleConfigUrls = [
    'modul-konfiguration',
    'landesxindex',
    'gemeinde-daten',
    'lander-aktualisieren',
    'postleitzahlen-aktualisieren',
    'sostat',
    'vorlagenverwaltung',
    'vorlagenverwaltungs',
    'vorlagen-profile',
    'basis-textmarken',
  ];

  @Input() isNavbar: boolean;
  @ViewChild('wrapperContainer', { read: ElementRef }) mainWrapperContainer: ElementRef;
  private subscriptions = new Subscription();
  lang = 'de';
  constructor(
    private router: Router,
    private intl: TimeagoIntl,
    public layoutSandbox: LayoutSandbox,
    private appSandbox: AppSandbox) {}

  ngOnInit() {
    this.appSandbox.setupRoles();
    this.appSandbox.registerEvents();
    this.copyRightName = new Date().getFullYear();
    this.registerEvents();
    this.setLang(this.lang);
    this.subscriptions.add(this.layoutSandbox.selectedLang$.subscribe(lang => {
      this.setLang(lang);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private registerEvents() {
    // Subscribes to user changes
    this.subscriptions.add(this.layoutSandbox.loggedUser$.subscribe((user: User) => {
      if (user.isLoggedIn) {
        this.userEmail = localStorage.getItem('user');
      }
    }));
  }

  setLang(lang: string) {
    this.lang = lang;
    switch (lang) {
      case 'en': this.intl.strings = englishStrings; break;
      case 'de': this.intl.strings = deStrings; break;
      default: break;
    }
    this.intl.changes.next();
  }

  selectMenu(menu): void {
    if (!menu || menu.url === '' || menu.url === undefined || menu.items.length > 0) { return; }
    if (menu.id === 403) {
      // TODO Gehezu H002
      return;
    }
    if (menu.id === 1297) {
      this.popupPendency.showPopup();
      return;
    }
    this.layoutSandbox.selectMenu(menu);
  }
  hotkeys(event) {
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyNumber1) {
      // Navigate to Fall-Navigator
      this.router.navigate(['/app/fall-navigator']);
      event.preventDefault();
    }
    // if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyNumber2) {
    //   // Navigate to  Daten - Explorer
    //   this.router.navigate(['/app/daten-explorer']);
    //   event.preventDefault();
    // }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyNumber3) {
      //  Navigate to  Pendenz erfassen
      this.router.navigate(['/app/pendenz-erfassen']);
      event.preventDefault();
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyNumber4) {
      // Navigate to  Pendenzenverwaltung
      this.router.navigate(['/app/pendenzenverwaltung']);
      event.preventDefault();
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyNumber5) {
      // Navigate to  Mandatsbuchhaltung
      this.router.navigate(['/app/mandatsbuchhaltung']);
      event.preventDefault();
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyNumber6) {
      // Navigate to  Klientenbuchhaltung
      this.router.navigate(['/app/klientenbuchhaltung']);
      event.preventDefault();
      // alert('Navigate to  Klientenbuchhaltung');
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyNumber7) {
      // Navigate to  Personen - Stamm
      this.router.navigate(['/app/personen-stamm']);
      event.preventDefault();
      // alert('Navigate to  Personen - Stamm');
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyNumber8) {
      // Navigate to Institutionen - Stamm
      this.router.navigate(['/app/institutionen-stamm']);
      event.preventDefault();
      // alert('Navigate to Institutionen - Stamm');
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyNumber9) {
      // Navigate to Zeiterfassung
      this.router.navigate(['/app/zeiterfassung']);
      event.preventDefault();
      // alert('Navigate to Zeiterfassung');
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyG) {
      // Navigate to Gehezu
      event.preventDefault();
      // alert('Navigate to Gehezu');
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyD) {
      // Navigate to Business Designer
      this.router.navigate(['/app/business-designer']);
      event.preventDefault();
      // alert(' Business Designer');
    }
  }

}
