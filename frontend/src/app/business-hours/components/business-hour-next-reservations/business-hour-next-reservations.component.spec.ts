import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHourNextReservationsComponent } from './business-hour-next-reservations.component';

describe('BusinessHourNextReservationsComponent', () => {
  let component: BusinessHourNextReservationsComponent;
  let fixture: ComponentFixture<BusinessHourNextReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessHourNextReservationsComponent]
    });
    fixture = TestBed.createComponent(BusinessHourNextReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
