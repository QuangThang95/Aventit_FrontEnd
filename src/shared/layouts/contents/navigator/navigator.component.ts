import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { Dialog } from '../../../utilites/index';
import { MenuDossiersModel, MenuTreeModel } from '@shared/models';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { GridFunctionModel } from '../../../models';
import { BroadcasterEvent } from '../../../events/event.broadcaster';
import { DxToolbarComponent } from 'devextreme-angular';
import { isNullOrUndefined } from 'util';
@Component({
    selector: 'app-navigator',
    templateUrl: './navigator.component.html',
    styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {

    // tslint:disable-next-line:no-output-on-prefix
    @Output('onCustomizeBtnFn') onCustomizeBtnFn = new EventEmitter<any>();
    @Input('optionOthers') optionOthers: any;
    @Input('selectedDossiers') selectedDossiers: MenuDossiersModel; // = new MenuDossiersModel;
    @Input('titleHeader') titleHeader: string;
    @Input('customizeBtn') customizeBtn: any;
    @Input('listBtn') listBtn: any;
    @Input('isCard') isCard: Boolean;
    @ViewChild('treeToolbar') treeToolbar: DxToolbarComponent;

    items = [];
    currentUrl: any;
    showDefault = ['pendenzen', 'versicherungen', 'scenario4', 'senario2', 'ubernahme', 'scenario1'];
    selectedTree = new MenuTreeModel({ 'ID': null, 'name': null });
    detailBlank = false;
    pageName = 'Übersicht';

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private event: BroadcasterEvent) {
        this.currentUrl = this.router.url;
        this.router.events.subscribe(x => {
            if (x instanceof NavigationEnd) {
                if (this.router.url.toLocaleLowerCase().indexOf('blank') > -1) {
                    this.detailBlank = true;
                } else {
                    this.detailBlank = false;
                }
                this.pageName = this.activatedRoute.snapshot.queryParams['page'] ? this.activatedRoute.snapshot.queryParams['page'] : 'Übersicht';
            }
        });
        this.event.on<any>('onClickSearchToolbar').subscribe(data => {
            // setTimeout(_ => {
            this.selectedDossiers = JSON.parse(localStorage.getItem('selectedDossiers'));
            // });
        });
    }
    private forIndexOfRouter(array: Array<string> = this.showDefault, key: string = this.router.url): boolean {
        console.log(array, key);
        let check = false;
        if (array) {
            array.forEach(element => {
                const index = key.indexOf(element);
                if (index > -1) {
                    check = true;
                    return;
                }
            });
        } else {
            check = true;
        }
        return check;
    }

    onItemClick(e) {
        if (typeof e.itemData.options.click === 'function') {
            e.itemData.options.click();
        }
    }
    ngOnInit() {
        if (localStorage.getItem('selectedDossiers') !== null) {
            this.selectedDossiers = JSON.parse(localStorage.getItem('selectedDossiers'));
        } else {
            if (!this.selectedDossiers) {
                this.selectedDossiers = new MenuDossiersModel();
                this.selectedDossiers.Name = 'Muster Frau';
                this.selectedDossiers.Age = 35;
                this.selectedDossiers.Sex = 'w';
                this.selectedDossiers.ID = 65201;
            }
        }
        if (localStorage.getItem('selectedTree') !== undefined && localStorage.getItem('selectedTree') !== null) {
            this.selectedTree = JSON.parse(localStorage.getItem('selectedTree'));
        } else {
            localStorage.setItem('selectedTree', JSON.stringify(this.selectedTree));
        }

        const tmp = document.getElementsByTagName('body');
        if (this.router.url.toLocaleLowerCase().indexOf('scenario1') > -1) {
            tmp[0].classList.add('hide-widgets-menu');
        } else {
            tmp[0].classList.remove('hide-widgets-menu');
        }
    }
    onHideWidgetsMenu(event) {
        event.preventDefault();
        const tmp = document.getElementsByTagName('body');
        const checkIsShowMenu = tmp[0].classList.contains('hide-widgets-menu');
        if (checkIsShowMenu) {
            tmp[0].classList.remove('hide-widgets-menu');
        } else {
            tmp[0].classList.add('hide-widgets-menu');
        }
    }

    toolBarOnItemClickTopGrd(event) {
        this.onCustomizeBtnFn.emit(event);
    }

}
