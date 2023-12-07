import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShootingRangePriceDto } from '../../../shared/dtos/shooting-range-price.dto';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { ShootingRangePriceTypeEnum } from '../../../shared/enums/shooting-range-price-type.enum';
import { ShootingRangePriceApi } from '../../../api/shooting-range-price-api';

@Component({
  selector: 'app-admin-shooting-range-price-edit',
  templateUrl: './admin-shooting-range-price-edit.component.html',
  styleUrls: ['./admin-shooting-range-price-edit.component.css'],
})
export class AdminShootingRangePriceEditComponent implements OnInit {
  public formValid = true;
  public types = Object.values(ShootingRangePriceTypeEnum);
  public bulletPrice: ShootingRangePriceDto = new ShootingRangePriceDto();

  constructor(
    private route: ActivatedRoute,
    private userLocalData: UserLocalData,
    private router: Router,
    private priceApi: ShootingRangePriceApi,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      this.bulletPrice.id = Number(data.get('id'));
      this.priceApi.getById(this.bulletPrice.id).subscribe((data) => {
        this.bulletPrice = data;
      });
    });
  }

  onSubmit(): void {
    this.priceApi.update(this.bulletPrice).subscribe((data) => {
      this.openSnackBar(this.bulletPrice.name + ' gespeichert');
    });
  }

  public getTypeText(type: string): string {
    return this.userLocalData.convertPriceTypeText(type);
  }

  private openSnackBar(message: string) {
    const ref = this.snackBar.open(message, 'Verbergen', {
      duration: 3000,
      verticalPosition: 'bottom',
    });

    ref.afterDismissed().subscribe((data) => {
      this.router.navigate(['/admin/price-list']);
    });
  }
}
