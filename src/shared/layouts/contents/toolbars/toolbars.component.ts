import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ActionHandler } from '@shared/models';

@Component({
  selector: 'kiss-toolbars',
  templateUrl: './toolbars.component.html',
  styleUrls: ['./toolbars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarsComponent {
  // actionHandler
  @Input() actionNew: ActionHandler = new ActionHandler();
  @Input() actionCancel: ActionHandler = new ActionHandler();
  @Input() actionSave: ActionHandler = new ActionHandler();
  @Input() actionDelete: ActionHandler = new ActionHandler();
  @Input() titlePage = '';
  @Input() isBack = false;

  @Output() newEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() backEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public goBack(e): void {
    this.backEvent.emit(e);
  }
}
