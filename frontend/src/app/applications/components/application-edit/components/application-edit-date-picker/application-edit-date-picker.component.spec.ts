import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationEditDatePickerComponent } from './application-edit-date-picker.component';

describe('ApplicationEditDatePickerComponent', () => {
  let component: ApplicationEditDatePickerComponent;
  let fixture: ComponentFixture<ApplicationEditDatePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationEditDatePickerComponent]
    });
    fixture = TestBed.createComponent(ApplicationEditDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
