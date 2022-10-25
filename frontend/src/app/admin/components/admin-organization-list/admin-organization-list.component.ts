import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../api/api.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {
  AdminOrganizationDeleteDialogComponent
} from "../admin-organization-delete-dialog/admin-organization-delete-dialog.component";

@Component({
  selector: 'app-admin-organization-list',
  templateUrl: './admin-organization-list.component.html',
  styleUrls: ['./admin-organization-list.component.css']
})
export class AdminOrganizationListComponent implements OnInit {
  organizationList$: any;
  displayedColumns: string[] = ['id', 'name', 'abbreviation', 'native', 'action'];

  constructor(private apiService: ApiService, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.organizationList$ = this.apiService.getAllOrganization();
  }

  deleteOrganization(id: string, name: string) {
    let dialogRef = this.dialog.open(AdminOrganizationDeleteDialogComponent, {
      data: {
        name: name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteOrganization(id).subscribe(data => this.fetch());
      }
    })
  }

  editOrganization(id: number) {
    this.router.navigate(['/admin/organization-edit', {id: id}]);
  }
}
