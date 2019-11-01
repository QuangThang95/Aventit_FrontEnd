import { RootSandbox } from './root.sandbox';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-root',
  templateUrl: `./root.component.html`,
  host: { '[class.body-loginPage]': 'isLoginPage' }
})
export class RootComponent implements OnDestroy, OnInit {
  public isLoginPage: boolean;
  private subscriptions: Subscription[] = [];
  constructor(
    public rootSandbox: RootSandbox) { }

  ngOnInit() {
    this.registerEvents();
    this.rootSandbox.setupToggleNav();
    this.rootSandbox.loadUser();
    this.rootSandbox.setupLanguage();
    this.rootSandbox.saveCurrentCultureToLocalStorage();
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }

  /**
   * Registers events needed for the application
   */
  private registerEvents(): void {
    // Subscribes to route change event and sets "isLoginPage" variable in order to set correct CSS class on body tag.
    this.subscriptions.push(
      this.rootSandbox.routerController().events.subscribe((route) => {
        if (route && route['url'] !== undefined) {
          // console.log('--route[url]:-', route['url']);
          this.isLoginPage = route['url'] === '/login' ? true : false;
        }
      }));
  }

  /**
   * Unsubscribes from events
   */
  private unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
