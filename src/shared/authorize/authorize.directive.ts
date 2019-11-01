import { AppSandbox } from '@app/app.sandbox';
import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';
@Directive({
  selector: '[appAuthorize]'
})
export class AuthorizeDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private appSandbox: AppSandbox
  ) { }

  @Input() set appAuthorize(roles: string[]) {
    this.appSandbox.availableRoles$.subscribe(rights => {
      let allow = false;
      if (roles) {
        let i = 0;
        const length = roles.length;
        while (i < length && !allow) {
          const classRight = roles[i].split('.');
          allow = rights[classRight[0]][classRight[1]] ? true : false;
          i++;
        }
      }
      if (allow) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
