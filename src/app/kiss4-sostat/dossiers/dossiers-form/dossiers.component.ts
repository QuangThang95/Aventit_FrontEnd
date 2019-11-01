import { Component, Injector, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';

@Component({
  selector: 'kiss-dossiers',
  templateUrl: './dossiers.component.html',
  styleUrls: ['./dossiers.component.css']
})
@SetClassRight('CtlBfsDossiers')
export class DossiersComponent extends BaseComponent implements OnInit, CanComponentDeactivate {
  titleHeader: string;
  listBtn = [];
  customizeBtn = [];

  constructor(
    injector: Injector,
    public layoutSandbox: LayoutSandbox,
    public translateService: TranslateService,
    public moduleConfigSandbox: ModuleConfigSandbox
  ) {
    super(injector);
  }

  ngOnInit() {
    this.titleHeader = this.translateService.instant('O014Dossiers.TitleHeader');
    this.moduleConfigSandbox.selectNode({ attr: 1041 });
  }

  toolBarOnItemClickTopGrd($event) { }

  canDeactivate() {
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    return true;
  }

}
