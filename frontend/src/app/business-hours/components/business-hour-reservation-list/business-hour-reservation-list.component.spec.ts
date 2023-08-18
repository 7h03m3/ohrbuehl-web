import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHourReservationListComponent } from './business-hour-reservation-list.component';

describe('BusinessHourReservationListComponent', () => {
  let component: BusinessHourReservationListComponent;
  let fixture: ComponentFixture<BusinessHourReservationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessHourReservationListComponent]
    });
    fixture = TestBed.createComponent(BusinessHourReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
