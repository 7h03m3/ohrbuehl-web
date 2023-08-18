import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHourReservationAddDialogComponent } from './business-hour-reservation-add-dialog.component';

describe('BusinessHourReservationAddDialogComponent', () => {
  let component: BusinessHourReservationAddDialogComponent;
  let fixture: ComponentFixture<BusinessHourReservationAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessHourReservationAddDialogComponent]
    });
    fixture = TestBed.createComponent(BusinessHourReservationAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
