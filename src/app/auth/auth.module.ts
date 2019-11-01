import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedComponentModule } from '@shared/components/shared-component.module';

import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthApiClientService } from './auth-api-client.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthSandbox } from './auth.sandbox';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@shared/store/effects/auth.effects';
import { TranslateModule } from '@ngx-translate/core';
import { DxPopupModule, DxTextBoxModule ,DxButtonModule, DxFormModule, DxSelectBoxModule} from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    // Third party modules
    TranslateModule,
    SimpleNotificationsModule,
    AuthRoutingModule,
    DxPopupModule,
    DxTextBoxModule,
    DxButtonModule,
    DxFormModule,
    DxSelectBoxModule,

    // Effects Type[]
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService,
    AuthApiClientService,
    AuthSandbox
  ],
})
export class AuthModule { }
