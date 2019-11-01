import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostleitzahlenAktualisierenListComponent } from './postleitzahlen-aktualisieren-list.component';

describe('PostleitzahlenAktualisierenListComponent', () => {
  let component: PostleitzahlenAktualisierenListComponent;
  let fixture: ComponentFixture<PostleitzahlenAktualisierenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostleitzahlenAktualisierenListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostleitzahlenAktualisierenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
