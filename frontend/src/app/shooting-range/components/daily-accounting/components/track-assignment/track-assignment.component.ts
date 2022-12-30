import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShootingRangeAccountingDto } from '../../../../../shared/dtos/shooting-range-accounting.dto';
import { ApiService } from '../../../../../api/api.service';
import { OrganizationDto } from '../../../../../shared/dtos/organization.dto';
import { ShootingRangePriceDto } from '../../../../../shared/dtos/shooting-range-price.dto';
import { OrganizationApi } from '../../../../../api/classes/organization-api';
import { ShootingRangePriceApi } from '../../../../../api/classes/shooting-range-price-api';

@Component({
  selector: 'app-track-assignment',
  templateUrl: './track-assignment.component.html',
  styleUrls: ['./track-assignment.component.css'],
})
export class TrackAssignmentComponent implements OnInit {
  @Input() minTrack = '0';
  @Input() maxTrack = '0';
  @Input() accountingData!: ShootingRangeAccountingDto;
  @Input() buttonText = 'Weiter';
  @Output() accountingDataChange = new EventEmitter<ShootingRangeAccountingDto>();
  public nextButtonDisabled = true;
  public organizations = new Array<OrganizationDto>();
  public prices = new Array<ShootingRangePriceDto>();
  public assignmentTrackStart = '';
  public assignmentTrackEnd = '';
  public assignmentShotPrice = '';
  public assignmentOrganization = '';
  private organizationApi: OrganizationApi;
  private priceApi: ShootingRangePriceApi;

  constructor(private apiService: ApiService) {
    this.organizationApi = this.apiService.getOrganization();
    this.priceApi = this.apiService.getShootingRangePrice();
  }

  ngOnInit(): void {
    this.organizationApi.getByAccountingType(this.accountingData.type).subscribe((response) => {
      this.organizations = response;

      if (this.organizations.length != 0) {
        this.assignmentOrganization = response[0].id.toString();
      }
    });

    this.priceApi.getAll().subscribe((response) => {
      this.prices = response;

      if (this.prices.length != 0) {
        this.assignmentShotPrice = response[0].id.toString();
      }
    });
    this.checkIfAllFilledIn();
  }

  ngOnChanges(): void {
    this.assignmentTrackStart = this.minTrack;
    this.assignmentTrackEnd = this.maxTrack;
  }

  doAssignment() {
    const startTrack = Number(this.assignmentTrackStart);
    const endTrack = Number(this.assignmentTrackEnd);
    const organizationId = Number(this.assignmentOrganization);
    const priceId = Number(this.assignmentShotPrice);

    const organization = this.organizations.filter((x) => x.id == organizationId)[0];
    const price = this.prices.filter((x) => x.id == priceId)[0];

    this.accountingData.items.forEach((element) => {
      if (element.track >= startTrack && element.track <= endTrack) {
        element.organization = organization;
        element.price = price;
      }
    });

    this.checkIfAllFilledIn();
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

    this.nextButtonDisabled = !allFilledIn;
  }

  public onSubmit() {
    this.accountingDataChange.emit(this.accountingData);
  }
}
