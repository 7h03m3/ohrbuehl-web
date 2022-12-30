import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationCreateDto } from '../../../shared/dtos/organization-create.dto';
import { OrganizationApi } from '../../../api/classes/organization-api';

@Component({
  selector: 'app-admin-organization-create',
  templateUrl: './admin-organization-create.component.html',
  styleUrls: ['./admin-organization-create.component.css'],
})
export class AdminOrganizationCreateComponent implements OnInit {
  public formValid = true;
  public organizationCreateDto: OrganizationCreateDto = new OrganizationCreateDto();
  private organizationApi: OrganizationApi;

  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) {
    this.organizationApi = this.apiService.getOrganization();
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.organizationApi.create(this.organizationCreateDto).subscribe(() => {
      this.openSnackBar(this.organizationCreateDto.name + ' wurde erstellt');
      this.organizationCreateDto = new OrganizationCreateDto();
    });
  }

  public openSnackBar(message: string) {
    const ref = this.snackBar.open(message, 'Verbergen', {
      duration: 3000,
      verticalPosition: 'bottom',
    });

    ref.afterDismissed().subscribe((data) => {
      this.router.navigate(['/admin/organization-list']);
    });
  }
}
