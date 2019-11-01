import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonConstant } from '@shared/common/constant.common';
import { DxPopupComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { Button } from './models';
import { PopOverSandbox } from './popover.sandbox';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss']
})
export class PopOverComponent implements OnInit, OnDestroy {
    @ViewChild('popover') popover: DxPopupComponent;
    buttons: Button[] = [];
    DisplayModules: any[] = [];
    popupPosition: any;
    selectedBaPersonID: number;
    private assetPath = 'assets/icon/characters-and-numbers/png/';
    private imgSuffix = '.png';
    popupData = {
        visible: false,
        message: '',
        title: '',
        ok: ''
    };
    popoverHeight = '100%';
    private subscription = new Subscription();

    constructor(private sanbox: PopOverSandbox, private router: Router, ) {
    }

    /**
     * function invoke when component was invoked
     */
    ngOnInit() {
        this.registerEvents();
    }

    /**
     * function invoke when component was destroyed
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * function register event and subcribe
     */
    private registerEvents(): void {
        this.subscription.add(this.sanbox.PopOverData$.subscribe(_buttons => {
            if (!isNullOrUndefined(_buttons) && _buttons.length > 0) {
                this.buttons = this.mergeButtons(_buttons, this.DisplayModules);
            }
        }));
    }

    /**
     * function show popup
     * @param {Array} _displayModules display module property
     */
    showPopup(_displayModules, baPersonID = null) {
        this.selectedBaPersonID = baPersonID;
        this.getButtons(baPersonID);
        if (_displayModules) { this.DisplayModules = _displayModules; }
        this.popover.instance.show();
    }
    /**
     * function hide popup
     */
    hidePopup() {
        this.popover.instance.hide();
    }
    /**
     * functions get buttons from API
     */
    getButtons(baPersonID) {
        this.sanbox.getButtons({
            BaPersonID: baPersonID
        });
    }
    /**
     * function compare buttons from API and Button from properties
     * @param apiButtons buttons from API
     * @param configButton buttons from config
     * @return display button
     */
    mergeButtons(apiButtons: Button[], configButton: any[]): Button[] {
        let displayButtons: Button[] = [];
        apiButtons.map((button: Button) => {
            button.imagePath = this.assetPath + button.iconID + this.imgSuffix;
            if (configButton.indexOf(button.modulID) >= 0) {
                displayButtons.push(button);
            }
        });
        // if configButton = null or undefined or didnt match with API
        if (displayButtons.length <= 0) {
            displayButtons = apiButtons;
        }
        return displayButtons;
    }

    /**
    * function occurred when click on button
    */
    onButtonClick(event) {
        if (!event || !event.itemData) {
            return;
        }
        if (!event.itemData.isEnabled) {
            return;
        }
        const kissModule = event.itemData;
        switch (kissModule.modulID) {
            case CommonConstant.KISS_MODULE.B.moduleID:
            case CommonConstant.KISS_MODULE.F.moduleID:
            case CommonConstant.KISS_MODULE.S.moduleID:
                this.router.navigateByUrl(`app/fallbearbeitung/${CommonConstant.KISS_MODULE[kissModule.shortName].url}${this.selectedBaPersonID}`);
                break;
            case CommonConstant.KISS_MODULE.I.moduleID:
            case CommonConstant.KISS_MODULE.M.moduleID:
            case CommonConstant.KISS_MODULE.A.moduleID:
            case CommonConstant.KISS_MODULE.K.moduleID:
                this.showDiaglogConfirm('This function is under construction!');
                break;
            default:
        }
    }
    public showDiaglogConfirm(message, buttonConfirm: string = 'OK') {
        this.popupData.visible = true;
        this.popupData.ok = buttonConfirm;
        this.popupData.title = 'Information';
        this.popupData.message = message;
    }
    buttonClicked() {
        this.hidePopup();
        this.popupData.visible = false;
    }
}
