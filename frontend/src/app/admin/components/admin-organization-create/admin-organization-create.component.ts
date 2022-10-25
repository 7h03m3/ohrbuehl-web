import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../api/api.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrganizationCreateDto} from "../../../shared/dtos/organization-create.dto";

@Component({
  selector: 'app-admin-organization-create',
  templateUrl: './admin-organization-create.component.html',
  styleUrls: ['./admin-organization-create.component.css']
})
export class AdminOrganizationCreateComponent implements OnInit {
  public formValid: boolean = true;
  public organizationCreateDto: OrganizationCreateDto = new OrganizationCreateDto();

  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.apiService.createOrganization(this.organizationCreateDto).subscribe(() => {
      this.openSnackBar(this.organizationCreateDto.name + " wurde erstellt");
      this.organizationCreateDto = new OrganizationCreateDto();
    });
  }

  public openSnackBar(message: string) {
    let ref = this.snackBar.open(message, "Verbergen", {
      duration: 3000,
      verticalPosition: 'bottom'
    });

    ref.afterDismissed().subscribe(data => {
      this.router.navigate(['/admin/organization-list']);
    })
  }
}
