import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


export class OrganizationDeleteDialogData {
  name: string = "";
}

@Component({
  selector: 'app-admin-organization-delete-dialog',
  templateUrl: './admin-organization-delete-dialog.component.html',
  styleUrls: ['./admin-organization-delete-dialog.component.css']
})
export class AdminOrganizationDeleteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: OrganizationDeleteDialogData) {
  }

  ngOnInit(): void {
  }
}
