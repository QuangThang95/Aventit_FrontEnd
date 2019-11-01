import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'kiss-page-bad-gate-way',
  templateUrl: './page-bad-gate-way.component.html',
  styleUrls: ['./page-bad-gate-way.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageBadGateWayComponent implements OnInit {

  constructor(
    private location: Location,
    private route: ActivatedRoute) { }

  messager: any;

  ngOnInit() {
    this.messager = this.route.snapshot.paramMap.get('roles');
    console.log(this.messager);
  }

  public goBack() {
    this.location.back();
  }
}
