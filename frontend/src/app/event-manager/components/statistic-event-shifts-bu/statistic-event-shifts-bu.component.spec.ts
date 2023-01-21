import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticEventShiftsBuComponent } from './statistic-event-shifts-bu.component';

describe('StatisticEventShiftsBuComponent', () => {
  let component: StatisticEventShiftsBuComponent;
  let fixture: ComponentFixture<StatisticEventShiftsBuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticEventShiftsBuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticEventShiftsBuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
