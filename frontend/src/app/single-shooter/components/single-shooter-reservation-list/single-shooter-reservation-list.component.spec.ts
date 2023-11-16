import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleShooterReservationListComponent } from './single-shooter-reservation-list.component';

describe('SingleShooterReservationListComponent', () => {
  let component: SingleShooterReservationListComponent;
  let fixture: ComponentFixture<SingleShooterReservationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleShooterReservationListComponent]
    });
    fixture = TestBed.createComponent(SingleShooterReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
