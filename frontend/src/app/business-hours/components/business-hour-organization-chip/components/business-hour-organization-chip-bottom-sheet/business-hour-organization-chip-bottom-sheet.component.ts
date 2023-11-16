import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { BusinessHourReservationDto } from '../../../../../shared/dtos/business-hour-reservation.dto';

@Component({
  selector: 'business-hour-organization-chip-bottom-sheet',
  templateUrl: './business-hour-organization-chip-bottom-sheet.component.html',
  styleUrls: ['./business-hour-organization-chip-bottom-sheet.component.css'],
})
export class BusinessHourOrganizationChipBottomSheetComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: BusinessHourReservationDto) {}
}
