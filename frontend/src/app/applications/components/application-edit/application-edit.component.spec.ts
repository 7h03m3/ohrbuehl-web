import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationEditComponent } from './application-edit.component';

describe('ApplicationEditComponent', () => {
  let component: ApplicationEditComponent;
  let fixture: ComponentFixture<ApplicationEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationEditComponent]
    });
    fixture = TestBed.createComponent(ApplicationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
