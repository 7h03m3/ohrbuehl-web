import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminShootingRangePriceDeleteDialogComponent } from '../admin-shooting-range-price-delete-dialog/admin-shooting-range-price-delete-dialog.component';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { ShootingRangePriceApi } from '../../../api/shooting-range-price-api';

@Component({
  selector: 'app-admin-shooting-range-price-list',
  templateUrl: './admin-shooting-range-price-list.component.html',
  styleUrls: ['./admin-shooting-range-price-list.component.css'],
})
export class AdminShootingRangePriceListComponent implements OnInit {
  priceList$: any;
  displayedColumns: string[] = ['id', 'name', 'type', 'description', 'price', 'action'];

  constructor(
    private priceApi: ShootingRangePriceApi,
    private userLocalData: UserLocalData,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.priceList$ = this.priceApi.getAll();
  }

  deleteBulletPrice(id: string, name: string) {
    const dialogRef = this.dialog.open(AdminShootingRangePriceDeleteDialogComponent, {
      data: {
        name: name,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.priceApi.delete(id).subscribe((data) => this.fetch());
      }
    });
  }

  editBulletPrice(id: number) {
    this.router.navigate(['/admin/price-edit', { id: id }]);
  }

  public getTypeText(type: string): string {
    return this.userLocalData.convertPriceTypeText(type);
  }
}
