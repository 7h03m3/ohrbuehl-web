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
  private organizationApi: OrganizationApi;

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.organizationApi = this.apiService.getOrganization();
  }

  async ngOnInit(): Promise<void> {
    const organizationId = await this.authService.getManagingOrganizationId();
    if (organizationId != 0) {
      this.organizationApi.getById(organizationId).subscribe((response) => {
        this.organizationData = response;
      });
    }
  }
}
