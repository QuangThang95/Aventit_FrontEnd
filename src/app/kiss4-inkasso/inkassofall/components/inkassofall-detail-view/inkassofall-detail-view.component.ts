import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Inkassofall } from '../../models';

@Component({
    selector: 'kiss-inkassofall-detail-view',
    templateUrl: './inkassofall-detail-view.component.html',
    styleUrls: ['./inkassofall-detail-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InkassofallDetailViewComponent {
    // Input
    @Input()
    sizeQualifier: number;
    @Input()
    isCollapseFormDetail = false;

    // DataSource
    @Input()
    dsInkassofalls: Inkassofall;
}
