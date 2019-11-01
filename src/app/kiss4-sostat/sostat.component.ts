import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { Subscription } from 'rxjs';

@Component({
    selector: 'kiss-sostat',
    templateUrl: './sostat.component.html',
    styleUrls: ['./sostat.component.css']
})
export class SostatComponent extends BaseComponent implements OnInit, OnDestroy {

    isNavbar = true;
    currentUrl: string;

    private subscriptions = new Subscription();

    constructor(private moduleConfigSandbox: ModuleConfigSandbox, public layoutSandbox: LayoutSandbox, injector: Injector, private router: Router) {
        super(injector);
    }

    ngOnInit() {
        this.moduleConfigSandbox.updateInitialParameters({
            moduleClassName: 'FrmSostat'
        });
        this.setTitle(CommonConstant.TITLE_SOSTAT);
        this.registerEvents();
    }

    ngOnDestroy() {
        this.unregisterEvents();
    }

    private registerEvents() {
        this.subscriptions.add(this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl = event.url;
            }
        }));
    }

    private unregisterEvents() {
        this.subscriptions.unsubscribe();
    }

    scrollChanged(e) {
        this.layoutSandbox.scrollChanged.next(e);
    }

}
