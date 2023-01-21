import { EventCreateDto } from './event-create.dto';

export class EventDto extends EventCreateDto {
  id: number;

  constructor() {
    super();
    this.id = 0;
  }
}
