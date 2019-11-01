import { AfterViewInit, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CtlBfsDokumenteConstant } from '@shared/common/ctlbfsdokumente.common';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { UtilService } from '@shared/utilites/utility.service';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { CtlBfsDokumenteSandbox } from '../ctl-bfs-dokumente.sandbox';

@Component({
  selector: 'kiss-ctl-bfs-dokumente',
  templateUrl: './ctl-bfs-dokumente.component.html',
  styleUrls: ['./ctl-bfs-dokumente.component.scss']
})
@SetClassRight('CtlBfsDokumente')
export class CtlBfsDokumenteComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {
  isNavbar: boolean;
  private subscriptions: Subscription[] = [];
  messageErr: string;
  isErrorClosed = false;
  popUpModel: PopUpModel;
  constructor(injector: Injector, public CtlBfsDokumentesSandbox: CtlBfsDokumenteSandbox, public utilService: UtilService, public translateService: TranslateService, public layoutSandbox: LayoutSandbox) {
    super(injector);
  }
  ngOnInit() {
    this.isNavbar = JSON.parse(localStorage.getItem('settings:toogleNavbar'));
    this.registerEvents();
    this.initPopUpModel();
    this.setTitle(CtlBfsDokumenteConstant.PAGETITLE);
  }

  ngOnDestroy() {
    this.CtlBfsDokumentesSandbox.resetLeitfadenState();
    this.unregisterEvents();
  }

  ngAfterViewInit() {
    this.onFocusButton();
  }
  /**
     * Create function to un-register all subscribes
     */
  unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private registerEvents(): void {
    // Register subscribe load data Leitfaden
    this.subscriptions.push(this.CtlBfsDokumentesSandbox.LeitfadensData$.subscribe(leitfaden => {
      if (isNullOrUndefined(leitfaden)) {
        return;
      }

      if (leitfaden.length === 0) {
        const message = this.translateService.instant('CtlBfsDokumente.MessageError.LeitfadenError');
        message.replace('\r\n', '<br>');
        this.handleActionPopup(message);
        return;
      }

      if (leitfaden.length === 1) {
        this.isErrorClosed = false;
        window.open(leitfaden[0].hyperlink);
        return;
      }

      if (leitfaden && leitfaden.status) {
        const body = JSON.parse(leitfaden._body);
        const message = body.message.toString();
        this.handleActionPopup(message);
      }
    }));

  }

  openHyperlink() {
    this.CtlBfsDokumentesSandbox.loadLeitfadenData();
  }

  onFocusButton() {
    const foo = document.getElementById('o013_dokumente_leitfaden');
    setTimeout(() => {
      foo.focus();
    }, 100);
  }

  onCloseError() {
    this.isErrorClosed = false;
  }

  handleActionPopup(message) {
    this.popUpModel.isVisible = true;
    this.popUpModel.isVisibleYes = false;
    this.popUpModel.isVisibleNo = false;
    this.popUpModel.message = message;
    this.popUpModel.title = this.translateService.instant('CtlBfsDokumente.Title');
  }
  initPopUpModel() {
    this.popUpModel = new PopUpModel(
      {
        title: '',
        isVisibleTitle: true,
        isVisible: false,
        message: '',
        textYes: '',
        isVisibleYes: true,
        textNo: '',
        isVisibleNo: true,
        funcYes: null,
        funcNo: null,
      }
    );
  }
  screen(width) {
    return (width < 980) ? 'sm' : 'lg';
  }

  canDeactivate() {
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    return true;
  }

}
