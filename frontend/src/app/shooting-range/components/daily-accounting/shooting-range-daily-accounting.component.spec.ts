import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeDailyAccountingComponent } from './shooting-range-daily-accounting.component';

describe('ShotNumbersComponent', () => {
  let component: ShootingRangeDailyAccountingComponent;
  let fixture: ComponentFixture<ShootingRangeDailyAccountingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShootingRangeDailyAccountingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingRangeDailyAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
