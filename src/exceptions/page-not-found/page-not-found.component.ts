import { Component, OnInit, Injector, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'kiss-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  constructor(private location: Location, private injector: Injector) {
    const routerService = this.injector.get(Router);
    const ngZone = this.injector.get(NgZone);
    ngZone.run(() => {
      routerService.navigate(['/exception/404'], { skipLocationChange: true });
    });
  }

  ngOnInit() {
  }

  public goBack() {
    this.location.back();
  }

}
