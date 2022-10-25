import {Component, OnInit} from '@angular/core';
import {Role} from "../../../shared/enums/role.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrganizationDto} from "../../../shared/dtos/organization.dto";

@Component({
  selector: 'app-admin-organization-edit',
  templateUrl: './admin-organization-edit.component.html',
  styleUrls: ['./admin-organization-edit.component.css']
})
export class AdminOrganizationEditComponent implements OnInit {
  public formValid: boolean = true;
  public organization: OrganizationDto = new OrganizationDto();
  public userRoles = Object.values(Role);

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.organization.id = Number(data.get('id'));
      this.apiService.getOrganization(this.organization.id).subscribe(data => {
        this.organization.name = data.name;
        this.organization.abbreviation = data.abbreviation;
        this.organization.native = data.native;
      })
    });
  }

  onSubmit(): void {
    this.apiService.updateOrganization(this.organization).subscribe(data => {
      this.openSnackBar(this.organization.name + " gespeichert");
    })
  }

  private openSnackBar(message: string) {
    let ref = this.snackBar.open(message, "Verbergen", {
      duration: 3000,
      verticalPosition: 'bottom'
    });

    ref.afterDismissed().subscribe(data => {
      this.router.navigate(['/admin/organization-list']);
    })
  }
}
