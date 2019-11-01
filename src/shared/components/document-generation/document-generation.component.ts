import { DocumentsHelper } from './doc-helper';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-generation',
  templateUrl: './document-generation.component.html',
  styleUrls: ['./document-generation.component.css']
})
export class DocumentGenerationComponent implements OnInit {

  @Input() contextValues: any;
  @Input() displayText: string;
  @Input() displayStyle: any = 'btn btn-default';
  @Input() templateId: any;
  @Output() ClickEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onDocClick(documents) {
    if (documents === undefined || !documents) { return; }
    // console.log('documents log: ', documents);
    this.ClickEvent.emit(documents);
  }
}
