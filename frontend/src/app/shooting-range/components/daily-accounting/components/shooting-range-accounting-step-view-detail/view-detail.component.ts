import { Component, Input, OnInit } from '@angular/core';
import { ShootingRangeAccountingDto } from '../../../../../shared/dtos/shooting-range-accounting.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountingApi } from '../../../../../api/accounting-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shooting-range-accounting-step-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.css'],
})
export class ViewDetailComponent implements OnInit {
  @Input() accountingData!: ShootingRangeAccountingDto;
  @Input() summarizedAccountingData!: ShootingRangeAccountingDto;
  public buttonDisabled = false;

  constructor(private router: Router, private accountingApi: AccountingApi, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  public onSave() {
    this.buttonDisabled = true;
    this.accountingApi.create(this.accountingData).subscribe((response) => {
      this.openSnackBar('Schusszahlen gespeichert');
    });
  }

  private openSnackBar(message: string) {
    const ref = this.snackBar.open(message, 'Verbergen', {
      duration: 3000,
      verticalPosition: 'bottom',
    });

    ref.afterDismissed().subscribe((data) => {
      this.router.navigate(['/shooting-range/accounting-list']);
    });
  }
}
