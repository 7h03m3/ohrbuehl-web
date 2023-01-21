import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticEventShiftsTableComponent } from './statistic-event-shifts-table.component';

describe('StatisticEventShiftsComponent', () => {
  let component: StatisticEventShiftsTableComponent;
  let fixture: ComponentFixture<StatisticEventShiftsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticEventShiftsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticEventShiftsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
