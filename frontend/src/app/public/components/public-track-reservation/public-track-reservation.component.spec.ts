import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTrackReservationComponent } from './public-track-reservation.component';

describe('PublicTrackReservationComponent', () => {
  let component: PublicTrackReservationComponent;
  let fixture: ComponentFixture<PublicTrackReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicTrackReservationComponent]
    });
    fixture = TestBed.createComponent(PublicTrackReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
