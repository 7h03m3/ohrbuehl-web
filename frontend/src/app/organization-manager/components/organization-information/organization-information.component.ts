import { Component } from '@angular/core';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { ApiService } from '../../../api/api.service';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-organization-information',
  templateUrl: './organization-information.component.html',
  styleUrls: ['./organization-information.component.css'],
})
export class OrganizationInformationComponent {
  public organizationData = new OrganizationDto();
  public organizationList = new Array<OrganizationDto>();
  public organizationId = 0;
  private organizationApi: OrganizationApi;

  constructor(private apiService: ApiService, public authService: AuthService) {
    this.organizationApi = this.apiService.getOrganization();
  }

  ngOnInit(): void {
    this.loadOrganizationData();
    this.organizationApi.getAllNative().subscribe((response) => {
      this.organizationList = response;
    });
  }

  public onOrganizationChange(organizationId: number) {
    this.authService.setManagingOrganizationId(organizationId);
    this.loadOrganizationData();
  }

  private loadOrganizationData() {
    this.organizationId = this.authService.getManagingOrganizationId();
    if (this.organizationId != 0) {
      this.organizationApi.getById(this.organizationId).subscribe((response) => {
        this.organizationData = response;
      });
    }
  }
}
