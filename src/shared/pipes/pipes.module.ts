import { NgModule } from '@angular/core';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';

const PIPES = [
  SanitizeHtmlPipe
];
@NgModule({
  imports: [],
  declarations: [PIPES],
  exports: [PIPES]
})
export class PipesModule { }
