import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemografieHistoryComponent } from './demografie-history-form/demografie-history.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
const routes: Routes = [
    {
      path: '',
      component: DemografieHistoryComponent,
      data: {
        title: 'Demografie',
        name: 'demografie'
      }
    },
    { path: '**', redirectTo: '/exception/404' }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DemografieRoutingModule { }
