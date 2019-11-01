import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IPersonenImHaushalt} from '@app/kiss4-sozialhilfe/personen-im-haushalt/models';

@Component({
  selector: 'kiss-staff-info',
  templateUrl: './staff-info.component.html',
  styleUrls: ['./staff-info.component.scss']
})
export class StaffInfoComponent implements OnInit, OnDestroy {
  constructor() {
  }

  personenInfo: IPersonenImHaushalt = null;

  @Input() set personenData(data: IPersonenImHaushalt) {
    if (data) {
      this.personenInfo = data;
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
