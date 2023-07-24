import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHourAdminReservationEditDialogComponent } from './business-hour-admin-reservation-edit-dialog.component';

describe('AdminBusinessHourReservationEditDialogComponent', () => {
  let component: BusinessHourAdminReservationEditDialogComponent;
  let fixture: ComponentFixture<BusinessHourAdminReservationEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessHourAdminReservationEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessHourAdminReservationEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
