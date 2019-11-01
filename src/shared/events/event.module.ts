import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadPanelEvent } from './event.load-panel';
import { BroadcasterEvent } from './event.broadcaster';
const PROVIDERS = [
  { provide: LoadPanelEvent, useClass: LoadPanelEvent },
  { provide: BroadcasterEvent, useClass: BroadcasterEvent },
];
@NgModule({
  imports: [CommonModule]
})
export class EventModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: EventModule,
      providers: [...PROVIDERS]
    };
  }
}
