import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { Subscription } from 'rxjs';

@Component({
    selector: 'kiss-inkasso',
    templateUrl: './inkasso.component.html',
    styleUrls: ['./inkasso.component.scss']
})
export class InkassoComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {

    menuItemID: number;
    menuItemUrl: string;

    private subscriptions: Subscription[] = [];

    constructor(private moduleConfigSandbox: ModuleConfigSandbox, public layoutSandbox: LayoutSandbox, injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.moduleConfigSandbox.updateInitialParameters({
            moduleClassName: 'FrmFall'
        });

        this.setTitle('Fallbearbeitung');
    }

    ngOnDestroy() {
        this.unregisterEvents();
    }

    /**
   *  unregister subscription on destroy component
   */
    private unregisterEvents() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    canDeactivate() {
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
        return true;
    }

}
