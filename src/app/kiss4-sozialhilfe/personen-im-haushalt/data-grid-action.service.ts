import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DataGridActionService {

  constructor() { }

  leftGrid_Action$ = new Subject<string>();
  rightGrid_Action$ = new Subject<string>();
}
