import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';

import { DossiersComponent } from './dossiers-form/dossiers.component';

const components: any[] = [
  DossiersComponent,
];
const routes: Routes = [
  {
    path: '',
    component: DossiersComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];
@NgModule({
  imports: [
    CommonModule,
    LayoutContainersModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [components]
})
export class DossiersModule { }
