import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'kiss-basis-textmarken-search',
    templateUrl: './basis-textmarken-search.component.html',
    styleUrls: ['./basis-textmarken-search.component.scss']
})
export class BasisTextmarkenSearchComponent implements OnChanges {
    @Output() objectSearch: EventEmitter<any> = new EventEmitter();
    @Input() isDisable: boolean;
    @Input() typData: any;
    @Input() tableNameData: any;
    @Input() modulNameData: any;
    @Input() alwaysVisible: boolean;
    @Input() system = false;
    @Input() nichtSystem: boolean;

    dataSuchen: any = {
        alwaysVisible: false,
        system: false,
        nichtSystem: false
    };
    suchens: any = null;
    isSearch = false;
    languageCode: number;
    queryDataSearch: any;

    ngOnChanges(changes: SimpleChanges): void {
        if (!isNullOrUndefined(changes.dataInitSearch) && changes.dataInitSearch.currentValue) {
            this.handleDataInitSearch(changes.dataInitSearch.currentValue);
        }
    }
    handleDataInitSearch(dataInitSearch) {
        if (!isNullOrUndefined(dataInitSearch.katalogVersion)) {
            this.objectSearch.emit(this.dataSuchen);
        }
        if (!isNullOrUndefined(dataInitSearch.suchen)) {
            this.suchens = dataInitSearch.suchen;
        }
    }
    onSearch() {
        this.objectSearch.emit(this.dataSuchen);
    }
}
