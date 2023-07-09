import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBusinessHourReservationListComponent } from './admin-business-hour-reservation-list.component';

describe('AdminBusinessHourReservationListComponent', () => {
  let component: AdminBusinessHourReservationListComponent;
  let fixture: ComponentFixture<AdminBusinessHourReservationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBusinessHourReservationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBusinessHourReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
