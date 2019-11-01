import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';

@Component({
  selector: 'kiss-tab-fallbearbeitung',
  templateUrl: './tab-fallbearbeitung.component.html',
  styleUrls: ['./tab-fallbearbeitung.component.scss']
})
export class TabFallbearbeitungComponent extends BaseComponent implements OnInit {
  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
  }
}
