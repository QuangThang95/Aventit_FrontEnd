import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthorizeModule } from '@shared/authorize/authorize.module';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { ScrollEventDirective } from '@shared/directives/scroll.directive';
import { FooterComponent } from '@shared/layouts/footer/footer.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
  DxAutocompleteModule,
  DxBoxModule,
  DxCheckBoxModule,
  DxContextMenuModule,
  DxFormModule,
  DxNumberBoxModule,
  DxPopoverModule,
  DxPopupModule,
  DxScrollViewModule,
  DxTemplateModule,
  DxTextBoxModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxListModule } from 'devextreme-angular/ui/list';
import { DxMenuModule } from 'devextreme-angular/ui/menu';
import { DxiValidationRuleModule } from 'devextreme-angular/ui/nested/validation-rule-dxi';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { BreadCrumbComponent } from './contents/bread-crumb/bread-crumb.component';
import { CardTitleComponent } from './contents/card-title/card-title.component';
import { NavigatorComponent } from './contents/navigator/navigator.component';
import { PageContentComponent } from './contents/page-content/page-content.component';
import { ToolbarsComponent } from './contents/toolbars/toolbars.component';
import { HeadersComponent } from './headers/headers.component';
import { HorizontalNavComponent } from './headers/horizontal-nav/horizontal-nav.component';
import { LanguagesComponent } from './headers/languages/languages.component';
import { NotificationBoxComponent } from './headers/notification-box/notification-box.component';
import { ProfileBarComponent } from './headers/profile-bar/profile-bar.component';
import { SearchBoxComponent } from './headers/search-box/search-box.component';
import { LayoutsComponent } from './layouts.component';
import { LayoutSandbox } from './layouts.sandbox';
import { LayoutsAdapterService } from './layoutsAdapter.service';
import { LayoutsApiClientServices } from './layoutsApiClient.services';
import { LeftSidebarsComponent } from './left-sidebars/left-sidebars.component';
import { ModuleConfigModule } from './left-sidebars/module-config/module-config.module';
import { SelectedActionsComponent } from './left-sidebars/selected-actions/selected-actions.component';
import { PopoverListComponent } from './popoverList/popoverList.component';

const DxUiModule = [
  DxContextMenuModule,
  DxListModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxMenuModule,
  DxToolbarModule,
  DxButtonModule,
  DxPopoverModule,
  DxTemplateModule,
  DxToolbarModule,
  DxDataGridModule,
  DxTextBoxModule,
  DxButtonModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxAutocompleteModule,
  DxFormModule,
  DxPopupModule,
  DxBoxModule,
  DxPopoverModule,
  DxScrollViewModule,
  DxNumberBoxModule,
  DxValidatorModule,
  DxiValidationRuleModule,
  DxValidationGroupModule,
  DxBoxModule
];

const SHARED_LAYOUT_COMPONENTS = [
  LayoutsComponent,
  PageContentComponent,
  NavigatorComponent,
  LeftSidebarsComponent,
  SelectedActionsComponent,
  HeadersComponent,
  FooterComponent,
  LanguagesComponent,
  HorizontalNavComponent,
  NotificationBoxComponent,
  ProfileBarComponent,
  SearchBoxComponent,
  ToolbarsComponent,
  BreadCrumbComponent,
  PopoverListComponent,
  CardTitleComponent,
  ScrollEventDirective
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DxUiModule,
    SimpleNotificationsModule,
    TranslateModule,
    SharedComponentModule,
    AuthorizeModule.forFeature(),
    ModuleConfigModule,
  ],
  declarations: [SHARED_LAYOUT_COMPONENTS, PageContentComponent],
  exports: [SHARED_LAYOUT_COMPONENTS],
})

export class LayoutContainersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LayoutContainersModule,
      providers: [
        LayoutSandbox,
        LayoutsApiClientServices,
        LayoutsAdapterService]
    };
  }
}
