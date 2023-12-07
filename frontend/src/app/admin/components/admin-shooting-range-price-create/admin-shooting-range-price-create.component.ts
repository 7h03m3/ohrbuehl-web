import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShootingRangePriceCreateDto } from '../../../shared/dtos/shooting-range-price-create.dto';
import { ShootingRangePriceTypeEnum } from '../../../shared/enums/shooting-range-price-type.enum';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { ShootingRangePriceApi } from '../../../api/shooting-range-price-api';

@Component({
  selector: 'app-admin-shooting-range-price-create',
  templateUrl: './admin-shooting-range-price-create.component.html',
  styleUrls: ['./admin-shooting-range-price-create.component.css'],
})
export class AdminShootingRangePriceCreateComponent implements OnInit {
  public formValid = true;
  public types = Object.values(ShootingRangePriceTypeEnum);
  public bulletPriceCreateDto: ShootingRangePriceCreateDto = new ShootingRangePriceCreateDto();

  constructor(
    private priceApi: ShootingRangePriceApi,
    private userLocalData: UserLocalData,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.bulletPriceCreateDto.price = 0.05;
  }

  onSubmit(): void {
    this.priceApi.create(this.bulletPriceCreateDto).subscribe(() => {
      this.openSnackBar(this.bulletPriceCreateDto.name + ' wurde erstellt');
      this.bulletPriceCreateDto = new ShootingRangePriceCreateDto();
    });
  }

  public openSnackBar(message: string) {
    const ref = this.snackBar.open(message, 'Verbergen', {
      duration: 3000,
      verticalPosition: 'bottom',
    });

    ref.afterDismissed().subscribe((data) => {
      this.router.navigate(['/admin/price-list']);
    });
  }

  public getTypeText(type: string): string {
    return this.userLocalData.convertPriceTypeText(type);
  }
}
