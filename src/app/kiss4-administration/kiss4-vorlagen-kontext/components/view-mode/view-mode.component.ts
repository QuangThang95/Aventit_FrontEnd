import { Component, Input } from '@angular/core';
import { XDocContext } from '@app/kiss4-administration/kiss4-vorlagen-kontext/models';

@Component({
    selector: 'kiss-vorlagen-kontext-view-mode',
    templateUrl: './view-mode.component.html',
    styleUrls: ['./view-mode.component.scss']
})

export class DetailViewComponent {
    @Input() vorlagenkontextModel: XDocContext;
}
