import { EventDto } from '../../../../shared/dtos/event.dto';

export class EventShiftListItemDto {
  event: EventDto;
  totalShifts: number;
  assignedShifts: number;
  totalInPool: number;
  totalRangeOfficer: number;
  assignedRangeOfficer: number;

  constructor() {
    this.event = new EventDto();
    this.totalShifts = 0;
    this.assignedShifts = 0;
    this.totalInPool = 0;
    this.totalRangeOfficer = 0;
    this.assignedRangeOfficer = 0;
  }
}
