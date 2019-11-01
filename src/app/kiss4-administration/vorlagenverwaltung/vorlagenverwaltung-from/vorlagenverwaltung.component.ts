import { Component, Injector } from '@angular/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';

@Component({
  selector: 'app-vorlagenverwaltung',
  templateUrl: './vorlagenverwaltung.component.html',
  styleUrls: ['./vorlagenverwaltung.component.scss']
})
@SetClassRight('CtlVorlagenverwaltung')
export class VorlagenverwaltungComponent extends BaseComponent implements CanComponentDeactivate {

  constructor(
    injector: Injector,
    public layoutSandbox: LayoutSandbox,
    private moduleConfigSandbox: ModuleConfigSandbox
  ) {
    super(injector);
  }

  canDeactivate() {
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
    return true;
  }

}
