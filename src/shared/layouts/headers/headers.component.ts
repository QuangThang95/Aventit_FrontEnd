import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { browserFunction } from '@shared/utilites/utilityHelpers';
import { LayoutSandbox } from '../layouts.sandbox';

@Component({
  selector: 'app-header',
  templateUrl: `./headers.component.html`,
  styleUrls: ['./headers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeadersComponent implements OnInit, OnDestroy {

  homePage = '/app/fall-navigator';
  isToggleNav: Boolean = false;

  @Input() selectedLanguage: any;
  @Input() availableLanguages: Array<any>;
  @Input() userImage: string;
  @Input() userEmail: string;
  @Output() selectLanguage: EventEmitter<any> = new EventEmitter();
  @Output() logout: EventEmitter<any> = new EventEmitter();
  @Output() clickToggleNav: EventEmitter<any> = new EventEmitter();

  // menu components
  @Input() itemMenus: Array<any>;
  @Output() selectMenu: EventEmitter<any> = new EventEmitter();

  // search box
  @Input() searchBoxsData: Array<any>;
  subscriptions: any;

  constructor(
    public layoutSandbox: LayoutSandbox,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.registerEvents();
  }

  public onToggleNav(isToggleNav, event) {
    this.isToggleNav = !isToggleNav;
    const el = browserFunction.getToggleSelector(event);
    this.handlerToggleNav(el);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private registerEvents() {
    // Subscribes to user changes
    this.subscriptions = this.layoutSandbox.loggedUser$.subscribe((user: any) => {
      if (user.isLoggedIn) {
        this.userEmail = localStorage.getItem('user');
      }
    });
  }

  private handlerToggleNav(el: ElementRef): void {
    if (!el || this.isToggleNav === undefined) {
      return;
    }
    if (!this.isToggleNav) {
      this.renderer.removeClass(el, 'hide-widgets-menu'); // toggle--nav
    } else {
      this.renderer.addClass(el, 'hide-widgets-menu'); // toggle--nav
    }
  }

}
