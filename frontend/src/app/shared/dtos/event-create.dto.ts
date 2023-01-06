import { EventCategoryDto } from './event-category.dto';
import { EventShiftDto } from './event-shift.dto';

export class EventCreateDto {
  title: string;
  start: number;
  end: number;
  category: EventCategoryDto;
  categoryId: number;
  shifts: EventShiftDto[];

  constructor() {
    this.title = '';
    this.start = Date.now();
    this.end = Date.now();
    this.category = new EventCategoryDto();
    this.categoryId = 0;
    this.shifts = new Array<EventShiftDto>();
  }
}
