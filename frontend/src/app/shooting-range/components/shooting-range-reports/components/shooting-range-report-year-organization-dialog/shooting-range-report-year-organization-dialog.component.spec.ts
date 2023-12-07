import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeReportYearOrganizationDialogComponent } from './shooting-range-report-year-organization-dialog.component';

describe('ShootingRangeReportYearOrganizationDialogComponent', () => {
  let component: ShootingRangeReportYearOrganizationDialogComponent;
  let fixture: ComponentFixture<ShootingRangeReportYearOrganizationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShootingRangeReportYearOrganizationDialogComponent]
    });
    fixture = TestBed.createComponent(ShootingRangeReportYearOrganizationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
