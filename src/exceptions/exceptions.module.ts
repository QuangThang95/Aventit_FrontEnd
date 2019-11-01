import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExceptionsRoutingModule } from './exceptions-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageBadGateWayComponent } from './page-bad-gate-way/page-bad-gate-way.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ExceptionsRoutingModule
  ],
  declarations: [PageNotFoundComponent, PageBadGateWayComponent]
})
export class ExceptionsModule { }
