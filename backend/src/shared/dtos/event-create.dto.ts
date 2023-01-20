import { EventCategoryDto } from './event-category.dto';
import { EventShiftDto } from './event-shift.dto';
import { EventStaffPoolDto } from './event-staff-pool.dto';

export class EventCreateDto {
  title: string;
  start: number;
  end: number;
  category: EventCategoryDto;
  categoryId: number;
  public: boolean;
  shifts: EventShiftDto[];
  staffPool: EventStaffPoolDto[];

  constructor() {
    this.title = '';
    this.start = Date.now();
    this.end = Date.now();
    this.category = new EventCategoryDto();
    this.categoryId = 0;
    this.public = false;
    this.shifts = new Array<EventShiftDto>();
    this.staffPool = new Array<EventStaffPoolDto>();
  }
}
