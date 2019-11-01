import { Component, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { BarPerSon } from '../../models';
import { ArbeitConstant } from '@shared/common/arbeit.common';

@Component({
  selector: 'app-arbeit-view',
  templateUrl: './arbeit-view.component.html',
  styleUrls: ['./arbeit-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArbeitViewComponent {
  // Datasouce
  @Input() arbeitModel: BarPerSon;

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
  getSizeQualifier(width) {
    if (width < ArbeitConstant.screenLargeWidth) {
      return 'xs';
    }
    return 'lg';
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    // to fix form rerender item when resize
  }
}
