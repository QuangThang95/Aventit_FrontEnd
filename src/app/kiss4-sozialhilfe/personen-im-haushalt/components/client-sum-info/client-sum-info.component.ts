import {Component, Input, OnInit} from '@angular/core';
import {IViewWhKennzahlenData} from '@app/kiss4-sozialhilfe/personen-im-haushalt/models';

@Component({
  selector: 'kiss-client-sum-info',
  templateUrl: './client-sum-info.component.html',
  styleUrls: ['./client-sum-info.component.scss']
})
export class ClientSumInfoComponent implements OnInit {

  constructor() {
  }

  @Input() title = '';
  @Input() data: IViewWhKennzahlenData = null;

  ngOnInit() {
  }
}
