import { BusinessHourOccupancyDto } from './business-hour-occupancy.dto';
import { BusinessHoursCreateDto } from './business-hours-create.dto';

export class BusinessHoursDto extends BusinessHoursCreateDto {
  public distance25mBlockManualOccupancy: BusinessHourOccupancyDto;
  public distance25mBlockElectronicOccupancy: BusinessHourOccupancyDto;
  public distance50mBManualOccupancy: BusinessHourOccupancyDto;
  public distance50mElectronicOccupancy: BusinessHourOccupancyDto;
  public distance100mOccupancy: BusinessHourOccupancyDto;
  public distance300mOccupancy: BusinessHourOccupancyDto;

  constructor() {
    super();
    this.distance25mBlockManualOccupancy = new BusinessHourOccupancyDto();
    this.distance25mBlockElectronicOccupancy = new BusinessHourOccupancyDto();
    this.distance50mBManualOccupancy = new BusinessHourOccupancyDto();
    this.distance50mElectronicOccupancy = new BusinessHourOccupancyDto();
    this.distance100mOccupancy = new BusinessHourOccupancyDto();
    this.distance300mOccupancy = new BusinessHourOccupancyDto();
  }
}
