import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss']
})
/**
 * @description ReportViewerComponent
 *
 * @param displayText Name display for button
 * @param queryName Name report
 * @param displayStyle Style for button
 * @param ClickEvent Event click handle
 */
export class ReportViewerComponent {

  @Input() contextValues: any;
  @Input() displayText = '';
  @Input() displayStyle: any = 'btn btn-default';
  @Input() queryName: any;
  @Output() ClickEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  onDocClick(report) {
    if (report === undefined || !report) { return; }
    // console.log('documents log: ', documents);
    this.ClickEvent.emit(report);
  }
}
