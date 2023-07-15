import { BusinessHourOccupancyDto } from './business-hour-occupancy.dto';
import { BusinessHoursCreateDto } from './business-hours-create.dto';
import { BusinessHourReservationDto } from './business-hour-reservation.dto';

export class BusinessHoursDto extends BusinessHoursCreateDto {
  public distance25mBlockManualOccupancy: BusinessHourOccupancyDto;
  public distance25mBlockElectronicOccupancy: BusinessHourOccupancyDto;
  public distance50mManualOccupancy: BusinessHourOccupancyDto;
  public distance50mElectronicOccupancy: BusinessHourOccupancyDto;
  public distance100mOccupancy: BusinessHourOccupancyDto;
  public distance300mOccupancy: BusinessHourOccupancyDto;
  public reservations: BusinessHourReservationDto[];

  constructor() {
    super();
    this.distance25mBlockManualOccupancy = new BusinessHourOccupancyDto();
    this.distance25mBlockElectronicOccupancy = new BusinessHourOccupancyDto();
    this.distance50mManualOccupancy = new BusinessHourOccupancyDto();
    this.distance50mElectronicOccupancy = new BusinessHourOccupancyDto();
    this.distance100mOccupancy = new BusinessHourOccupancyDto();
    this.distance300mOccupancy = new BusinessHourOccupancyDto();
    this.reservations = new Array<BusinessHourReservationDto>();
  }
}
