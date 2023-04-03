import { EventDto } from '../../../../shared/dtos/event.dto';

export class EventShiftListItemDto {
  event: EventDto;
  start: number;
  categoryId: number;
  title: string;
  totalShifts: number;
  assignedOrganization: number;
  assignedShifts: number;

  constructor() {
    this.event = new EventDto();
    this.start = 0;
    this.categoryId = 0;
    this.title = '';
    this.totalShifts = 0;
    this.assignedOrganization = 0;
    this.assignedShifts = 0;
  }
}
