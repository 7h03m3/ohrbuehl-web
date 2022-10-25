import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../api/api.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BulletPriceCreateDto} from "../../../shared/dtos/bullet-price-create.dto";

@Component({
  selector: 'app-admin-bullet-price-create',
  templateUrl: './admin-bullet-price-create.component.html',
  styleUrls: ['./admin-bullet-price-create.component.css']
})
export class AdminBulletPriceCreateComponent implements OnInit {
  public formValid: boolean = true;
  public bulletPriceCreateDto: BulletPriceCreateDto = new BulletPriceCreateDto();

  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.bulletPriceCreateDto.price = 0.05;
  }

  onSubmit(): void {
    this.apiService.createBulletPrice(this.bulletPriceCreateDto).subscribe(() => {
      this.openSnackBar(this.bulletPriceCreateDto.name + " wurde erstellt");
      this.bulletPriceCreateDto = new BulletPriceCreateDto();
    });
  }

  public openSnackBar(message: string) {
    let ref = this.snackBar.open(message, "Verbergen", {
      duration: 3000,
      verticalPosition: 'bottom'
    });

    ref.afterDismissed().subscribe(data => {
      this.router.navigate(['/admin/bullet-price-list']);
    })
  }
}
