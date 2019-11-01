import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KennzahlenListComponent } from './kennzahlen-list.component';

describe('GemeindeDatenListComponent', () => {
  let component: KennzahlenListComponent;
  let fixture: ComponentFixture<KennzahlenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KennzahlenListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KennzahlenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
