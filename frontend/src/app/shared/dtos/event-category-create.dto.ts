import { EventDto } from './event.dto';

export class EventCategoryCreateDto {
  name: string;
  abbreviation: string;
  events: EventDto[];

  constructor() {
    this.name = '';
    this.abbreviation = '';
    this.events = new Array<EventDto>();
  }
}
