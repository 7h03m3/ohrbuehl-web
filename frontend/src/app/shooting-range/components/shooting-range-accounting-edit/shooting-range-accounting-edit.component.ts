import { Component, OnInit, ViewChild } from '@angular/core';
import { StringHelper } from '../../../shared/classes/string-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api/api.service';
import { AccountingApi } from '../../../api/classes/accounting-api';
import { ShootingRangeAccountingDto } from '../../../shared/dtos/shooting-range-accounting.dto';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { ShootingRangePriceDto } from '../../../shared/dtos/shooting-range-price.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { ShootingRangePriceApi } from '../../../api/classes/shooting-range-price-api';
import { EnterDateAndTimeComponent } from '../daily-accounting/components/shooting-range-accounting-step-enter-date-and-time/enter-date-and-time.component';

@Component({
  selector: 'app-shooting-range-accounting-edit',
  templateUrl: './shooting-range-accounting-edit.component.html',
  styleUrls: ['./shooting-range-accounting-edit.component.css'],
})
export class ShootingRangeAccountingEditComponent implements OnInit {
  public accountingData = new ShootingRangeAccountingDto();
  public organizations = new Array<OrganizationDto>();
  public prices = new Array<ShootingRangePriceDto>();
  public minTrack = '0';
  public maxTrack = '0';
  private dateFormComponent: any;
  private accountingApi: AccountingApi;
  private organizationApi: OrganizationApi;
  private priceApi: ShootingRangePriceApi;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private stringHelper: StringHelper,
  ) {
    this.accountingApi = this.apiService.getAccounting();
    this.organizationApi = this.apiService.getOrganization();
    this.priceApi = this.apiService.getShootingRangePrice();
  }

  @ViewChild(EnterDateAndTimeComponent)
  set appShark(child: EnterDateAndTimeComponent) {
    this.dateFormComponent = child;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      const idString = data.get('id');
      if (idString != null) {
        const id = Number(idString);
        this.accountingApi.getById(id).subscribe((response) => {
          this.accountingData = response;
          this.updateTrackCount();

          this.dateFormComponent.fetch(this.accountingData);

          this.organizationApi.getByAccountingType(this.accountingData.type).subscribe((response) => {
            this.organizations = response;
          });
        });
      }
    });

    this.priceApi.getAll().subscribe((response) => {
      this.prices = response;
    });
  }

  public onSave() {
    this.accountingApi.update(this.accountingData).subscribe((response) => {
      this.openSnackBar('Schusszahlen gespeichert');
    });
  }

  public onDateChanged() {
    this.accountingApi.update(this.accountingData).subscribe((response) => {
      this.openSnackBar('Datum gespeichert', false);
    });
  }

  public getDateTimeString(element: ShootingRangeAccountingDto): string {
    return this.stringHelper.getStartEndDateTimeString(element.start, element.end);
  }

  private openSnackBar(message: string, redirect = true) {
    const ref = this.snackBar.open(message, 'Verbergen', {
      duration: 3000,
      verticalPosition: 'bottom',
    });

    if (redirect) {
      ref.afterDismissed().subscribe((data) => {
        this.router.navigate(['/shooting-range/accounting-list']);
      });
    }
  }

  private updateTrackCount() {
    let maxTrack = 0;
    let minTrack = 0;
    this.accountingData.items.forEach((element) => {
      if (maxTrack == 0 && minTrack == 0) {
        maxTrack = element.track;
        minTrack = element.track;
      }

      if (maxTrack < element.track) {
        maxTrack = element.track;
      }

      if (minTrack > element.track) {
        minTrack = element.track;
      }
    });

    this.minTrack = minTrack.toString();
    this.maxTrack = maxTrack.toString();
  }
}
