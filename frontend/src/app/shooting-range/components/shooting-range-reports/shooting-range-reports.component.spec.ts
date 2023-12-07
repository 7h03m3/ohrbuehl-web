import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeReportsComponent } from './shooting-range-reports.component';

describe('ShootingRangeReportsComponent', () => {
  let component: ShootingRangeReportsComponent;
  let fixture: ComponentFixture<ShootingRangeReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShootingRangeReportsComponent]
    });
    fixture = TestBed.createComponent(ShootingRangeReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
