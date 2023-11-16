import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { BusinessHoursDto } from '../../../../../shared/dtos/business-hours.dto';
import { ReservationFacilityType } from '../../../../../shared/enums/reservation-facility-type.enum';
import { StringHelper } from '../../../../../shared/classes/string-helper';
import { BusinessHourOccupancyDto } from '../../../../../shared/dtos/business-hour-occupancy.dto';

export interface BottomSheetData {
  facilityString: string;
  current: number;
  max: number;
  unit: string;
}

@Component({
  selector: 'app-public-business-hour-list-occupancy-info',
  templateUrl: './public-business-hour-list-occupancy-info.component.html',
  styleUrls: ['./public-business-hour-list-occupancy-info.component.css'],
})
export class PublicBusinessHourListOccupancyInfoComponent {
  public sheetData = new Array<BottomSheetData>();

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: BusinessHoursDto) {}

  public ngOnInit() {
    const facilityTypes = Object.values(ReservationFacilityType);

    this.sheetData = facilityTypes.map((current) => {
      const occupancy = this.getOccupancy(current);
      return {
        facilityString: StringHelper.getReservationFacilityTypeString(current),
        current: occupancy.current,
        max: occupancy.max,
        unit: StringHelper.getOccupancyUnitString(current, occupancy.max),
      };
    });
  }

  private getOccupancy(type: ReservationFacilityType): BusinessHourOccupancyDto {
    switch (type) {
      case ReservationFacilityType.Distance25mBlockManuel:
        return this.data.distance25mBlockManualOccupancy;
      case ReservationFacilityType.Distance25mBlockElectronic:
        return this.data.distance25mBlockElectronicOccupancy;
      case ReservationFacilityType.Distance50mManuel:
        return this.data.distance50mManualOccupancy;
      case ReservationFacilityType.Distance50mElectronic:
        return this.data.distance50mElectronicOccupancy;
      case ReservationFacilityType.Distance100m:
        return this.data.distance100mOccupancy;
      case ReservationFacilityType.Distance300m:
        return this.data.distance300mOccupancy;
      default:
        return new BusinessHourOccupancyDto();
    }
  }
}
