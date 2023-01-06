import { Component } from '@angular/core';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { ApiService } from '../../../api/api.service';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { UserLocalData } from '../../../shared/classes/user-local-data';

@Component({
  selector: 'app-organization-information',
  templateUrl: './organization-information.component.html',
  styleUrls: ['./organization-information.component.css'],
})
export class OrganizationInformationComponent {
  public organizationData = new OrganizationDto();
  private organizationApi: OrganizationApi;

  constructor(private apiService: ApiService, private userData: UserLocalData) {
    this.organizationApi = this.apiService.getOrganization();
  }

  ngOnInit(): void {
    this.organizationApi.getByManagerId(this.userData.getUserId()).subscribe((response) => {
      this.organizationData = response;
    });
  }
}
