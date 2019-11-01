import {
  Component,
  Input,
  Renderer2,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { isArray } from 'util';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'kiss-left-sidebars',
  templateUrl: './left-sidebars.component.html',
  styleUrls: ['./left-sidebars.component.scss']
})
export class LeftSidebarsComponent implements AfterViewInit, OnDestroy {

  @Input() isNavbar: boolean;
  @Output() clickItem: EventEmitter<any> = new EventEmitter<any>();
  popoverVisible = false;
  popoverSelectedActionsData: Array<any> = [];
  allowDeleting: Boolean = true;
  deleteType: String = 'static';
  selectionMode: String = 'single';
  height: any = 'auto';
  iconUrl: any = 'assets/icon/';
  private subscriptions: Subscription[] = [];
  constructor(
    private renderer: Renderer2,
    public layoutSandbox: LayoutSandbox
  ) { }

  ngAfterViewInit(): void {
    if (!this.isNavbar) {
      const wrapperContainer = document.querySelectorAll('.wrapper-main').item(0);
      this.setEfToggleNav(wrapperContainer);
    }
    this.registerEvents();
  }
  ngOnDestroy() {
    this.unregisterEvents();
  }
  registerEvents() {
    this.subscriptions.push(this.layoutSandbox.selectedAction$.subscribe(datas => {
      this.getDataPopover(datas);
    }));
  }
  unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  /**
 * Detaches the change detector from the change detector tree.
 */
  toggleNavigator(isNavbar: boolean, el: any): void {
    this.isNavbar = !isNavbar;
    localStorage.setItem('settings:toogleNavbar', JSON.stringify(this.isNavbar));
    const path = el.path;
    let elWrapper: ElementRef;
    if (path !== undefined) {
      // for chorme
      elWrapper = path.find(item => item.classList.contains('wrapper-main'));
    } else {
      // fix for firefox
      const offsetParent = this.renderer.parentNode(el.target.offsetParent);
      elWrapper = this.getParentNodeWithLevel(offsetParent, 3);
    }
    this.setEfToggleNav(elWrapper);
  }

  private getParentNodeWithLevel(element, level: number = 1) {
    if (level === 1) { return this.renderer.parentNode(element); }
    const offsetParent = this.renderer.parentNode(element);
    level = level - 1;
    // n case
    return this.getParentNodeWithLevel(offsetParent, level);
  }

  private setEfToggleNav(el: any): void {
    if (el && this.isNavbar !== undefined) {
      if (this.isNavbar) {
        this.renderer.removeClass(el, 'toggle--sidebar');
      } else {
        this.renderer.addClass(el, 'toggle--sidebar');
      }
    }
  }
  /**
  * *****************************************************************
  * Functions for sticky area
  * Author:nvphuc
  * *****************************************************************
  */
  showPopover() {
    this.popoverVisible = !this.popoverVisible;
  }
  getDataPopover(datas) {
    if (isArray(datas) && datas.length > 6) {
      this.popoverSelectedActionsData = datas.slice(0, datas.length - 6).sort((a, b) => {
        if (new Date(a.time) > new Date(b.time)) {
          return -1;
        }
        return 1;
      });
    } else {
      this.popoverSelectedActionsData = [];
    }
  }
  onDeleteItem(itemData) {
    this.layoutSandbox.deleteSelectedActionItems(itemData);
  }
  onClickItem(itemData) {
    this.popoverVisible = false;
    if (itemData.data.type === 'flag_menu') {
      this.layoutSandbox.selectMenu(itemData.data);
    } else {
      this.layoutSandbox.selectAction(itemData.data, itemData.url);
    }
  }
}
