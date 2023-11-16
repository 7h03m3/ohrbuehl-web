import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBusinessHourListOccupancyInfoComponent } from './public-business-hour-list-occupancy-info.component';

describe('PublicBusinessHourListOccupancyInfoComponent', () => {
  let component: PublicBusinessHourListOccupancyInfoComponent;
  let fixture: ComponentFixture<PublicBusinessHourListOccupancyInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicBusinessHourListOccupancyInfoComponent]
    });
    fixture = TestBed.createComponent(PublicBusinessHourListOccupancyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
