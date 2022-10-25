import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BulletPriceDto} from "../../../shared/dtos/bullet-price.dto";

@Component({
  selector: 'app-admin-bullet-price-edit',
  templateUrl: './admin-bullet-price-edit.component.html',
  styleUrls: ['./admin-bullet-price-edit.component.css']
})
export class AdminBulletPriceEditComponent implements OnInit {
  public formValid: boolean = true;
  public bulletPrice: BulletPriceDto = new BulletPriceDto();

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.bulletPrice.id = Number(data.get('id'));
      this.apiService.getBulletPrice(this.bulletPrice.id).subscribe(data => {
        this.bulletPrice.name = data.name;
        this.bulletPrice.description = data.description;
        this.bulletPrice.price = data.price;
      })
    });
  }

  onSubmit(): void {
    this.apiService.updateBulletPrice(this.bulletPrice).subscribe(data => {
      this.openSnackBar(this.bulletPrice.name + " gespeichert");
    })
  }

  private openSnackBar(message: string) {
    let ref = this.snackBar.open(message, "Verbergen", {
      duration: 3000,
      verticalPosition: 'bottom'
    });

    ref.afterDismissed().subscribe(data => {
      this.router.navigate(['/admin/bullet-price-list']);
    })
  }

}
