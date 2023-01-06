import { EventShiftDto } from './event-shift.dto';

export class EventShiftCategoryCreateDto {
  name: string;
  abbreviation: string;
  position: number;
  shifts: EventShiftDto[];

  constructor() {
    this.name = '';
    this.abbreviation = '';
    this.position = 0;
    this.shifts = new Array<EventShiftDto>();
  }
}
