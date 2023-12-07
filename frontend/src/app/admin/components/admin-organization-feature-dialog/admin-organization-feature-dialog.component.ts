import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrganizationFeatureDto } from '../../../shared/dtos/organization-feature.dto';
import { ApiService } from '../../../api/api.service';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { OrganizationApi } from '../../../api/classes/organization-api';

@Component({
  selector: 'app-admin-organization-feature-dialog',
  templateUrl: './admin-organization-feature-dialog.component.html',
  styleUrls: ['./admin-organization-feature-dialog.component.css'],
})
export class AdminOrganizationFeatureDialogComponent implements OnInit {
  public organizationList = new Array<OrganizationDto>();
  private organizationApi: OrganizationApi;

  constructor(
    public dialogRef: MatDialogRef<AdminOrganizationFeatureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrganizationFeatureDto,
    private apiService: ApiService,
  ) {
    this.organizationApi = apiService.getOrganization();
  }

  public ngOnInit() {
    if (this.data.id == 0) {
      this.organizationApi.getAll().subscribe((response) => {
        this.organizationList = response;
      });
    }
  }

  public onCancel() {
    this.dialogRef.close();
  }

  public onSave() {
    this.dialogRef.close(this.data);
  }
}
