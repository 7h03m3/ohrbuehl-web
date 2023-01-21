import { EventDto } from '../../../../shared/dtos/event.dto';

export class EventShiftListItemDto {
  event: EventDto;
  totalShifts: number;
  assignedShifts: number;
  totalInPool: number;

  constructor() {
    this.event = new EventDto();
    this.totalShifts = 0;
    this.assignedShifts = 0;
    this.totalInPool = 0;
  }
}
