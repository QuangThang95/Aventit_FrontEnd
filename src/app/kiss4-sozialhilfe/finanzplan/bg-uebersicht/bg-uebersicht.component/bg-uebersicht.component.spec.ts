import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgUebersichtComponent } from './bg-uebersicht.component';

describe('BgUebersichtComponent', () => {
  let component: BgUebersichtComponent;
  let fixture: ComponentFixture<BgUebersichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgUebersichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
