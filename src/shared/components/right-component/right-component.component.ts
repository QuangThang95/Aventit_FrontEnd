import { Component } from '@angular/core';
import { NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'kiss-right-component',
  templateUrl: './right-component.component.html',
  styleUrls: ['./right-component.component.css']
})
export class RightComponentComponent {

  constructor(
    private zone: NgZone,
    private changeDetector: ChangeDetectorRef
  ) {
  }

}
