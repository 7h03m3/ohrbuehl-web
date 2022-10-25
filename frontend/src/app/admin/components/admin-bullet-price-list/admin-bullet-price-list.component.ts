import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../api/api.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {
  AdminBulletPriceDeleteDialogComponent
} from "../admin-bullet-price-delete-dialog/admin-bullet-price-delete-dialog.component";

@Component({
  selector: 'app-admin-bullet-price-list',
  templateUrl: './admin-bullet-price-list.component.html',
  styleUrls: ['./admin-bullet-price-list.component.css']
})
export class AdminBulletPriceListComponent implements OnInit {

  bulletPriceList$: any;
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'action'];

  constructor(private apiService: ApiService, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.bulletPriceList$ = this.apiService.getAllBulletPrices();
  }

  deleteBulletPrice(id: string, name: string) {
    let dialogRef = this.dialog.open(AdminBulletPriceDeleteDialogComponent, {
      data: {
        name: name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteBulletPrice(id).subscribe(data => this.fetch());
      }
    })
  }

  editBulletPrice(id: number) {
    this.router.navigate(['/admin/bullet-price-edit', {id: id}]);
  }
}
