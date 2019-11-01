import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KostenartenComponent } from './kostenarten.component';

describe('KostenartenComponent', () => {
  let component: KostenartenComponent;
  let fixture: ComponentFixture<KostenartenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KostenartenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KostenartenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
