import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBusinessHourReservationEditDialogComponent } from './admin-business-hour-reservation-edit-dialog.component';

describe('AdminBusinessHourReservationEditDialogComponent', () => {
  let component: AdminBusinessHourReservationEditDialogComponent;
  let fixture: ComponentFixture<AdminBusinessHourReservationEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBusinessHourReservationEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBusinessHourReservationEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
