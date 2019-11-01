import { NgModule, Component, enableProdMode, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxPopoverModule, DxTemplateModule, DxListComponent } from 'devextreme-angular';
import { LayoutSandbox } from '../layouts.sandbox';
import { Router } from '@angular/router';

import { PopoverData, Service } from './popoverList.service';
declare var $: any;
@Component({
    selector: 'app-popover-list',
    templateUrl: './popoverList.component.html',
    styleUrls: ['./poppverList.component.scss'],
    providers: [Service]
})

export class PopoverListComponent {
    @ViewChild('listPopoverData') listPopoverData: DxListComponent;
    popoverData: PopoverData[];
    popoverVisible: boolean;
    @Input() public targetId;
    @Input() public tabIndexHtml;
    @Output() selectItem = new EventEmitter<any>();
    constructor(service: Service,
        public layoutSandbox: LayoutSandbox,
        private router: Router
    ) {
        this.popoverData = service.getPopoverDatas();
        this.popoverVisible = false;
    }
    onClick(event) {
        event.preventDefault();
        this.popoverVisible = !this.popoverVisible;
    }
    onTabBlur(event) {
        event.preventDefault();
        this.popoverVisible = false;
    }
    keypress(event) {
        if (event.keyCode === 13 || event.key === 'Enter') {
            this.popoverVisible = !this.popoverVisible;
        }
    }

    keydown(event) {
        if (event.keyCode === 13 || event.key === 'Enter') { // 13:Enter
            this.popoverVisible = !this.popoverVisible;
        }
        if (this.popoverVisible === true && (event.keyCode === 38 || event.keyCode === 40)) { // 38:Up and 40:Down
            this.popoverVisible = true;
            event.preventDefault();
            this.listPopoverData.instance.focus();
        }
        if (this.popoverVisible === true && event.keyCode === 27) { // 27:Esc
            this.popoverVisible = false;
            $('#' + this.targetId).focus();
        }
        if (event.keyCode === 9) { // 9:Tab
            this.popoverVisible = false;
        }
    }
    dxListKeyDown(event) {
        if (this.popoverVisible === true && event.keyCode === 27) { // 27:Esc
            this.popoverVisible = false;
            $('#' + this.targetId).focus();
        }
    }
    selectDxList(event) {
        this.popoverVisible = false;
        $('#' + this.targetId).focus();
    }
    public selectMenu(menu: any): void {
        this.layoutSandbox.selectMenu(menu);
    }
}
