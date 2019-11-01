import { Component, Injector, Input } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';

@Component({
    selector: 'kiss-berater-detail-view',
    templateUrl: './berater-detail-view.component.html',
    styleUrls: ['./berater-detail-view.component.scss'],
})

export class BeraterFormDetailViewComponent extends BaseComponent {
  @Input() formData: any;

  editor: any;
  froalaEditorConfig = {
    heightMin: 150,
    height: 300,
    charCounterCount: false,
    events: {
      'froalaEditor.initialized': (e, editor) => {
        this.editor = editor;
        this.editor.edit.off();
      }
    }
  };

  constructor(injector: Injector) {
    super(injector);
  }
}
