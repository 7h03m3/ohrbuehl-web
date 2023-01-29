import { EventShiftDto } from './event-shift.dto';

export class EventShiftCategoryCreateDto {
  name: string;
  abbreviation: string;
  position: number;
  requiresRangeOfficer: boolean;
  shifts: EventShiftDto[];

  constructor() {
    this.name = '';
    this.abbreviation = '';
    this.position = 0;
    this.requiresRangeOfficer = false;
    this.shifts = new Array<EventShiftDto>();
  }
}
