import { Component, OnInit } from '@angular/core';
import { Role } from '../../../shared/enums/role.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { OrganizationApi } from '../../../api/classes/organization-api';

@Component({
  selector: 'app-admin-organization-edit',
  templateUrl: './admin-organization-edit.component.html',
  styleUrls: ['./admin-organization-edit.component.css'],
})
export class AdminOrganizationEditComponent implements OnInit {
  public formValid = true;
  public organization: OrganizationDto = new OrganizationDto();
  public userRoles = Object.values(Role);
  private organizationApi: OrganizationApi;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) {
    this.organizationApi = this.apiService.getOrganization();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      this.organization.id = Number(data.get('id'));
      this.organizationApi.getById(this.organization.id).subscribe((data) => {
        this.organization = data;
      });
    });
  }

  onSubmit(): void {
    this.organizationApi.update(this.organization).subscribe((data) => {
      this.openSnackBar(this.organization.name + ' gespeichert');
    });
  }

  private openSnackBar(message: string) {
    const ref = this.snackBar.open(message, 'Verbergen', {
      duration: 3000,
      verticalPosition: 'bottom',
    });

    ref.afterDismissed().subscribe((data) => {
      this.router.navigate(['/admin/organization-list']);
    });
  }
}
