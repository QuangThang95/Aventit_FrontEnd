import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
import { LayoutsComponent } from '@shared/layouts/layouts.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      { path: '', redirectTo: '/app/fall-navigator', pathMatch: 'full' },
      {
        path: 'app/pendenzenverwaltung',
        loadChildren: './app/kiss4-pendenzverwaltung/pendenzen/pendenzen.module#PendenzenModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'app/fall-navigator',
        loadChildren: './app/kiss4-main/fall-navigator/fall-navigator.module#FallNavigatorModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'app/asv-export',
        loadChildren: './app/kiss4-sozialhilfe/asvexport/asvexport.module#AsvexportModule',
        canLoad: [AuthGuard]
      },
      {
        // Berater
        path: 'app/externe-berater',
        loadChildren: './app/kiss4-basis/berater/berater.module#BeraterModule',
        canLoad: [AuthGuard]
      },
      {
        // Uber
        path: 'app/uber',
        loadChildren: './app/kiss4-main/uber/uber.module#UberModule',
        canLoad: [AuthGuard]
      },
      {
        // modul-konfiguration
        path: 'app/modul-konfiguration',
        loadChildren: './app/kiss4-modul-konfiguration/modul-konfiguration.module#ModulKonfiguration',
        canLoad: [AuthGuard]
      },
      {
        // sostat
        path: 'app/sostat',
        loadChildren: './app/kiss4-sostat/sostat.module#SostatModule',
        canLoad: [AuthGuard]
      },
      {
        // vorlagen
        path: 'app/vorlagenverwaltung',
        loadChildren: './app/kiss4-administration/administration.module#AdministrationModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'app/fallbearbeitung',
        loadChildren: './app/kiss4-main/fallbearbeitung/fallbearbeitung.module#FallbearbeitungModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'exception',
        loadChildren: './exceptions/exceptions.module#ExceptionsModule', // lazy load exception module
        data: { preload: true }
      }
    ]
  },
  {
    path: 'login',
    loadChildren: './app/auth/auth.module#AuthModule', // Lazy load auth module
    data: { preload: true }
  },
  { path: '**', redirectTo: '/exception/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard, CanDeactivateGuard]
})
export class RootRoutingModule { }
