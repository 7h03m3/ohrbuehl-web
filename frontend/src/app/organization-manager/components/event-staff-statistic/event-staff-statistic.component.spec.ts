import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStaffStatisticComponent } from './event-staff-statistic.component';

describe('EventStaffStatisticComponent', () => {
  let component: EventStaffStatisticComponent;
  let fixture: ComponentFixture<EventStaffStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventStaffStatisticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventStaffStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
