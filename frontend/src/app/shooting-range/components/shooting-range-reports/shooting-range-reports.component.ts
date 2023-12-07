import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShootingRangeReportYearOrganizationDialogComponent } from './components/shooting-range-report-year-organization-dialog/shooting-range-report-year-organization-dialog.component';
import { ReportApi } from '../../../api/classes/report-api';
import { ApiService } from '../../../api/api.service';
import { DownloadHelper } from '../../../shared/classes/download-helper';

enum ShootingRangeReportType {
  AccountingOrganization = 'AccountingOrganization',
}

@Component({
  selector: 'app-shooting-range-reports',
  templateUrl: './shooting-range-reports.component.html',
  styleUrls: ['./shooting-range-reports.component.css'],
})
export class ShootingRangeReportsComponent {
  public reportTypes = Object.values(ShootingRangeReportType);
  private reportApi: ReportApi;

  constructor(private dialog: MatDialog, private apiService: ApiService, private downloadHelper: DownloadHelper) {
    this.reportApi = apiService.getReport();
  }

  public onSubmit() {
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

  public getReportString(type: ShootingRangeReportType): string {
    switch (type) {
      case ShootingRangeReportType.AccountingOrganization:
        return 'Schusszahlen Verein';
      default:
        return '';
    }
  }
}
