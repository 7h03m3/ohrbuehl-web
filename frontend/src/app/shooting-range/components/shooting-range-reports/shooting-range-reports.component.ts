import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShootingRangeReportYearOrganizationDialogComponent } from './components/shooting-range-report-year-organization-dialog/shooting-range-report-year-organization-dialog.component';
import { ReportApi } from '../../../api/report-api';
import { DownloadHelper } from '../../../shared/classes/download-helper';
import { ShootingRangReportYearDialogComponent } from './components/shooting-rang-report-year-dialog/shooting-rang-report-year-dialog.component';

enum ShootingRangeReportType {
  AccountingOverview = 'AccountingOverview',
  AccountingOrganization = 'AccountingOrganization',
}

@Component({
  selector: 'app-shooting-range-reports',
  templateUrl: './shooting-range-reports.component.html',
  styleUrls: ['./shooting-range-reports.component.css'],
})
export class ShootingRangeReportsComponent {
  public reportTypes = Object.values(ShootingRangeReportType);
  public selectedType = ShootingRangeReportType.AccountingOrganization;

  constructor(private reportApi: ReportApi, private dialog: MatDialog, private downloadHelper: DownloadHelper) {}

  public onSubmit() {
    switch (this.selectedType) {
      case ShootingRangeReportType.AccountingOrganization:
        this.getReportOrganizationAccounting();
        break;
      case ShootingRangeReportType.AccountingOverview:
        this.getReportOverviewAccounting();
        break;
    }
  }

  public getReportString(type: ShootingRangeReportType): string {
    switch (type) {
      case ShootingRangeReportType.AccountingOverview:
        return 'Schusszahlen Übersicht (300m)';
      case ShootingRangeReportType.AccountingOrganization:
        return 'Schusszahlen Verein (300m)';
      default:
        return '';
    }
  }

  private getReportOverviewAccounting() {
    const dialogRef = this.dialog.open(ShootingRangReportYearDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reportApi.getShootingRangeAccountingOverview(result.year).subscribe((response) => {
          this.downloadHelper.downloadPdfFile(response);
        });
      }
    });
  }

  private getReportOrganizationAccounting() {
    const dialogRef = this.dialog.open(ShootingRangeReportYearOrganizationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reportApi
          .getShootingRangeAccountingByOrganization(result.organizationId, result.year)
          .subscribe((response) => {
            this.downloadHelper.downloadPdfFile(response);
          });
      }
    });
  }
}
