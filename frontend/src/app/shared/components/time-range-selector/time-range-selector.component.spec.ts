import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRangeSelectorComponent } from './time-range-selector.component';

describe('YearSelectorComponent', () => {
  let component: TimeRangeSelectorComponent;
  let fixture: ComponentFixture<TimeRangeSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeRangeSelectorComponent],
    });
    fixture = TestBed.createComponent(TimeRangeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
