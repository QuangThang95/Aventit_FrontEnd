import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SozialhilfeComponent } from './sozialhilfe.component';

describe('SozialhilfeComponent', () => {
  let component: SozialhilfeComponent;
  let fixture: ComponentFixture<SozialhilfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SozialhilfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SozialhilfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
