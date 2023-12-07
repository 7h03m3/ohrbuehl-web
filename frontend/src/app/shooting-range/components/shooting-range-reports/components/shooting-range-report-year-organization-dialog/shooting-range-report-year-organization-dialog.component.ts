import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../api/api.service';
import { OrganizationApi } from '../../../../../api/classes/organization-api';
import { OrganizationDto } from '../../../../../shared/dtos/organization.dto';
import { SortHelper } from '../../../../../shared/classes/sort-helper';
import { UserLocalData } from '../../../../../shared/classes/user-local-data';
import { MatDialogRef } from '@angular/material/dialog';

export class ShootingRangeReportYearOrganizationDialogData {
  year = 0;
  organizationId = 0;
}

@Component({
  selector: 'app-shooting-range-report-year-organization-dialog',
  templateUrl: './shooting-range-report-year-organization-dialog.component.html',
  styleUrls: ['./shooting-range-report-year-organization-dialog.component.css'],
})
export class ShootingRangeReportYearOrganizationDialogComponent implements OnInit {
  private static YearRange = 10;
  public organizationList = new Array<OrganizationDto>();
  public yearList = new Array<number>();
  public data = new ShootingRangeReportYearOrganizationDialogData();
  private organizationApi: OrganizationApi;

  constructor(
    public dialogRef: MatDialogRef<ShootingRangeReportYearOrganizationDialogComponent>,
    private apiService: ApiService,
    private userLocalData: UserLocalData,
  ) {
    this.organizationApi = apiService.getOrganization();
  }

  public ngOnInit() {
    this.data.year = this.userLocalData.getCurrentYear();
    this.data.organizationId = 0;

    for (
      let i = -1 * ShootingRangeReportYearOrganizationDialogComponent.YearRange;
      i <= ShootingRangeReportYearOrganizationDialogComponent.YearRange;
      i++
    ) {
      this.yearList.push(this.data.year + i);
    }

    this.organizationApi.getAll().subscribe((response) => {
      SortHelper.sortOrganizationByPosition(response);
      this.organizationList = response;
    });
  }

  public onSubmit() {
    this.dialogRef.close(this.data);
  }

  public isValid(): boolean {
    return this.data.organizationId != 0;
  }
}
