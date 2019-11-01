import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BgUebersichtComponent } from './bg-uebersicht.component/bg-uebersicht.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

const Components: any[] = [
  BgUebersichtComponent
];

const routes: Routes = [
  {
    path: '',
    component: BgUebersichtComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [...Components],
})
export class BgUebersichtModule { }
