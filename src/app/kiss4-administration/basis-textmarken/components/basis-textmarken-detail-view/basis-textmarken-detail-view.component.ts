import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { CommonConstant } from '@shared/common/constant.common';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'kiss-basis-textmarken-detail-view',
    templateUrl: './basis-textmarken-detail-view.component.html',
    styleUrls: ['./basis-textmarken-detail-view.component.scss']
})
export class BasisTextmarkenDetailViewComponent implements OnChanges {
    @Input() dataDetailObject: any;
    @Input() selectedKeys: any;
    @Input() typData: any;
    @Input() tableNameData: any;
    @Input() modulNameData: any;
    @Output() objectView: EventEmitter<boolean> = new EventEmitter();
    @Output() objectDataNew: EventEmitter<any> = new EventEmitter();
    @Output() objectDataDelete: EventEmitter<any> = new EventEmitter();

    CommonBtn = [...CommonConstant.AdditionalButtons];
    listBtn = [[], this.CommonBtn.splice(7, 1)];
    typeFormatNumber = CommonConstant.FormatNumberAllowDelete;
    isViewModel: boolean;
    customizeBtn = [
        {
            text: this.translateService.instant('BasisTextmarken.Button.Add'),
            name: 'neuer',
            icon: 'add',
            type: 'default'
        },
        {
            text: this.translateService.instant('BasisTextmarken.Button.Edit'),
            name: 'bearbeiten',
            icon: 'edit',
            type: 'default'
        },
        {
            text: 'BasisTextmarken.Button.Delete',
            useSubmitBehavior: true,
            locateInMenu: 'always',
            name: 'deleteMenuItemTopGrd'
        }
    ];
    formComponent: any;
    formData: any;
    oldFormData: any;

    constructor(public translateService: TranslateService) { }

    ngOnChanges(event) {
        if (!isNullOrUndefined(event.dataDetailObject)) {
            if (!isNullOrUndefined(event.dataDetailObject.currentValue)) {
                this.formData = this.dataDetailObject;
            }
        }
    }
    toolBarOnItemClick(event) {
        switch (event) {
            case 'neuer':
                this.onNeuer();
                this.objectView.emit(this.isViewModel = true);
                break;
            case 'bearbeiten':
                this.onEdit();
                this.objectView.emit(this.isViewModel = true);
                break;
            case 'deleteMenuItemTopGrd':
                this.onDelete(this.dataDetailObject);
                break;
            default:
        }
    }
    onInitialized(e) {
        this.formComponent = e.component;
    }
    // funtion button click new.
    onNeuer() {
        this.formData = {
            id: 1,
            bookmarkName: null,
            displayName: '',
            displayNameCoppy: '',
            bookmarkNameTID: 0,
            category: '',
            categoryTID: 1,
            bookmarkCode: 1,
            tableName: null,
            description: '',
            descriptionTID: 0,
            sql: 'SELECT NULL',
            modulID: null,
            alwaysVisible: false,
            system: false,
            xBookmarkTS: '',
            modul: '',
            bookmarkCodeText: 'Text',
            isUpdate: false
        };
        if (this.isUserBIAGAdmin()) {
            this.formData.system = true;
        }
        this.objectDataNew.emit({ ...this.formData });
    }
    isUserBIAGAdmin() {
        const xUser = JSON.parse(sessionStorage.getItem('user:Xuser'));
        if (!isNullOrUndefined(xUser)) {
            if (xUser[0].isUserBIAGAdmin) {
                return true;
            } else {
                return false;
            }
        }
    }
    onEdit() {
        this.formData.isUpdate = true;
        this.formData = this.dataDetailObject;
    }
    onDelete(data) {
        this.objectDataDelete.emit(data);
    }
}
