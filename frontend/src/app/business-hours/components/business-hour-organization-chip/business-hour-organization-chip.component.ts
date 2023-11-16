import { Component, Input, OnInit } from '@angular/core';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BusinessHourOrganizationChipBottomSheetComponent } from './components/business-hour-organization-chip-bottom-sheet/business-hour-organization-chip-bottom-sheet.component';

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
    if (this.reservation.organizationId != undefined) {
      const organization = this.reservation.organization;
      this.label = organization.abbreviation;
      this.icon = 'groups';
      this.color = organization.color;
    } else {
      const owner = this.reservation.owner;
      this.label = owner.firstName + ' ' + owner.lastName;
      this.icon = 'person';
    }
  }

  public onShowInformation() {
    this.bottomSheet.open(BusinessHourOrganizationChipBottomSheetComponent, { data: this.reservation });
  }
}
