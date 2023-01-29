import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ShootingRangeAccountingDto } from '../../../shared/dtos/shooting-range-accounting.dto';
import { ApiService } from '../../../api/api.service';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { ShootingRangePriceDto } from '../../../shared/dtos/shooting-range-price.dto';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { ShootingRangePriceApi } from '../../../api/classes/shooting-range-price-api';
import { ShootingRangeAccountingUnitDto } from '../../../shared/dtos/shooting-range-accounting-unit.dto';
import { SortHelper } from '../../../shared/classes/sort-helper';
import { MatDialog } from '@angular/material/dialog';
import { ShootingRangeTrackAssignmentDialogComponent } from './components/shooting-range-track-assignment-dialog/shooting-range-track-assignment-dialog.component';
import { SummarizeHelper } from '../../../shared/classes/summarize-helper';

@Component({
  selector: 'app-shooting-range-track-assignment',
  templateUrl: './track-assignment.component.html',
  styleUrls: ['./track-assignment.component.css'],
})
export class TrackAssignmentComponent implements OnInit {
  @Input() minTrack = '0';
  @Input() maxTrack = '0';
  @Input() accountingData!: ShootingRangeAccountingDto;
  @Input() buttonText = 'Weiter';
  @Input() manualEdit = false;
  @Output() accountingDataChange = new EventEmitter<ShootingRangeAccountingDto>();
  public summarizedAccountingData = new ShootingRangeAccountingDto();
  public nextButtonDisabled = true;
  public organizations = new Array<OrganizationDto>();
  public prices = new Array<ShootingRangePriceDto>();
  private organizationApi: OrganizationApi;
  private priceApi: ShootingRangePriceApi;

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.organizationApi = this.apiService.getOrganization();
    this.priceApi = this.apiService.getShootingRangePrice();
  }

  ngOnInit(): void {
    this.organizationApi.getByAccountingType(this.accountingData.type).subscribe((response) => {
      this.organizations = response;

      SortHelper.sortOrganizationByPosition(this.organizations);
    });

    this.priceApi.getAll().subscribe((response) => {
      this.prices = response;
    });
    this.checkIfAllFilledIn();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  public doAssignmentDialog() {
    const dialogRef = this.dialog.open(ShootingRangeTrackAssignmentDialogComponent, {
      data: {
        editShots: this.manualEdit,
        amount: '',
        maxTrack: this.maxTrack,
        minTrack: this.minTrack,
        trackStart: this.minTrack,
        trackEnd: this.maxTrack,
        priceId: '',
        organizationId: '',
        comment: '',
        organizationList: this.organizations,
        priceList: this.prices,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined && data.trackStart != undefined) {
        const organization = this.organizations.filter((x) => x.id == data.organizationId)[0];
        const price = this.prices.filter((x) => x.id == data.priceId)[0];

        this.accountingData.items.forEach((element) => {
          if (element.track >= data.trackStart && element.track <= data.trackEnd) {
            element.organization = organization;
            element.price = price;
            element.comment = data.comment;

            if (this.manualEdit) {
              element.amount = data.amount;
            }
          }
        });

        this.update();
      }
    });
  }

  public checkIfAllFilledIn() {
    let allFilledIn = true;

    if (this.accountingData.items.length == 0) {
      allFilledIn = false;
    }

    this.accountingData.items.forEach((element) => {
      if (element.organization.id == 0) {
        allFilledIn = false;
      }

      if (element.price.id == 0) {
        allFilledIn = false;
      }
    });

    if (this.manualEdit == true) {
      allFilledIn = true;
    }

    this.nextButtonDisabled = !allFilledIn;
  }

  public onSubmit() {
    if (this.manualEdit == true) {
      const clearedItems = new Array<ShootingRangeAccountingUnitDto>();
      this.accountingData.items.forEach((item) => {
        if (item.amount != 0 && item.price.id != 0 && item.organization.id != 0) {
          clearedItems.push(item);
        }
      });
      this.accountingData.items = clearedItems;
    }
    this.accountingDataChange.emit(this.accountingData);
  }

  public update() {
    this.checkIfAllFilledIn();
    this.summarizedAccountingData.items = SummarizeHelper.summarizeShootingRangeAccounting(this.accountingData.items);
  }
}
