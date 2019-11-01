import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kiss-kennzahlen-remaining',
  templateUrl: './kennzahlen-remaining.component.html',
  styleUrls: ['./kennzahlen-remaining.component.scss']
})
export class KennzahlenRemainingComponent implements OnInit {

  constructor() { }

  @Input() messageErr = '';
  @Output() clearMessage = new EventEmitter();

  // #region component life cycle functions
  ngOnInit() {
  }
  // #endregion

  // #region utility functions
  onCloseError() {
    this.messageErr = '';
    this.clearMessage.next(null);
  }
  // #endregion

}
