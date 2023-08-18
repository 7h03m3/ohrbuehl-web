import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHourReservationEditDialogComponent } from './business-hour-reservation-edit-dialog.component';

describe('BusinessHourReservationEditDialogComponent', () => {
  let component: BusinessHourReservationEditDialogComponent;
  let fixture: ComponentFixture<BusinessHourReservationEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessHourReservationEditDialogComponent]
    });
    fixture = TestBed.createComponent(BusinessHourReservationEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
