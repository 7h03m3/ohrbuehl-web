import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangReportYearDialogComponent } from './shooting-rang-report-year-dialog.component';

describe('ShootingRangReportYearDialogComponent', () => {
  let component: ShootingRangReportYearDialogComponent;
  let fixture: ComponentFixture<ShootingRangReportYearDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShootingRangReportYearDialogComponent]
    });
    fixture = TestBed.createComponent(ShootingRangReportYearDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
