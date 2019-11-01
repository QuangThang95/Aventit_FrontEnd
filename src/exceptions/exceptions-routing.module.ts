import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageBadGateWayComponent } from './page-bad-gate-way/page-bad-gate-way.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '502', component: PageBadGateWayComponent },
  { path: '404', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionsRoutingModule { }
