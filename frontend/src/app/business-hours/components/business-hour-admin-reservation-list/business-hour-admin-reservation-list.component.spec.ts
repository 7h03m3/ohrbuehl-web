import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHourAdminReservationListComponent } from './business-hour-admin-reservation-list.component';

describe('AdminBusinessHourReservationListComponent', () => {
  let component: BusinessHourAdminReservationListComponent;
  let fixture: ComponentFixture<BusinessHourAdminReservationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessHourAdminReservationListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessHourAdminReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
