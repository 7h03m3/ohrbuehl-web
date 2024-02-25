import { Component, Input, OnInit } from '@angular/core';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BusinessHourOrganizationChipBottomSheetComponent } from './components/business-hour-organization-chip-bottom-sheet/business-hour-organization-chip-bottom-sheet.component';
import { ReservationFacilityType } from '../../../shared/enums/reservation-facility-type.enum';

@Component({
  selector: 'business-hour-organization-chip',
  templateUrl: './business-hour-organization-chip.component.html',
  styleUrls: ['./business-hour-organization-chip.component.css'],
})
export class BusinessHourOrganizationChipComponent implements OnInit {
  @Input() reservation!: BusinessHourReservationDto;
  public label = '';
  public icon = '';
  public color = '';

  constructor(private bottomSheet: MatBottomSheet) {}

  public ngOnInit() {
    this.icon = this.isSingleShooter() ? 'person' : 'groups';

    if (this.reservation.organizationId != undefined) {
      const organization = this.reservation.organization;
      this.label = organization.abbreviation;
      this.color = organization.color;
    } else {
      const owner = this.reservation.owner;
      this.label = owner.firstName + ' ' + owner.lastName;
    }
  }

  public onShowInformation() {
    this.bottomSheet.open(BusinessHourOrganizationChipBottomSheetComponent, { data: this.reservation });
  }

  private isSingleShooter(): boolean {
    if (this.reservation.organizationId == undefined) {
      return true;
    }

    const is25m =
      this.reservation.facilityType == ReservationFacilityType.Distance25mBlockManuel ||
      this.reservation.facilityType == ReservationFacilityType.Distance25mBlockElectronic;

    if (this.reservation.count == 1 && !is25m) {
      return true;
    }

    return false;
  }
}
