import { AuthorizeGuard } from './authorize.guard';
import { AuthorizeDirective } from './authorize.directive';
import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
    imports: [],
    declarations: [AuthorizeDirective],
    exports: [AuthorizeDirective]
})
export class AuthorizeModule {
    static forFeature(): ModuleWithProviders {
        return {
            ngModule: AuthorizeModule,
            providers: [
                AuthorizeGuard
            ]
        };
    }
}
