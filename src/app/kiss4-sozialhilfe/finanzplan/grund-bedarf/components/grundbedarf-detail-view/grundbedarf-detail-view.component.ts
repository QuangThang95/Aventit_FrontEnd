import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DPLSelectboxModel, GrundBedarfFormDataModel } from '../../models';

@Component({
  selector: 'kiss-grundbedarf-detail-view',
  templateUrl: './grundbedarf-detail-view.component.html',
  styleUrls: ['./grundbedarf-detail-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GrundBedarfDetailViewComponent {
  // Datasource
  @Input()
  grundBedarfFormData: GrundBedarfFormDataModel;
  @Input()
  dataSourceSelectboxes: DPLSelectboxModel[] = [];
  @Input()
  readOnlySettingComponents: any;
  @Input()
  visibleGroup: any;
  onSearchByEnter() {
  }
}
