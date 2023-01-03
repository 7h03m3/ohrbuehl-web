import { EventCategoryDto } from './event-category.dto';

export class EventCreateDto {
  category: EventCategoryDto;
  date: number;
  startTime: string;
  endTime: string;

  constructor() {
    this.category = new EventCategoryDto();
    this.date = Date.now();
    this.startTime = '';
    this.endTime = '';
  }
}
