import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';

@Component({
  selector: 'kiss-sozialhilfe',
  templateUrl: './sozialhilfe.component.html',
  styleUrls: ['./sozialhilfe.component.css']
})
export class SozialhilfeComponent implements OnInit, CanComponentDeactivate {

  constructor(public layoutSandbox: LayoutSandbox, public moduleConfigSandbox: ModuleConfigSandbox) { }

  ngOnInit() {
    this.moduleConfigSandbox.selectNode({ attr: 858 });
  }

  canDeactivate() {
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    return true;
  }

}
