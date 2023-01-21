import { EventCategoryCreateDto } from './event-category-create.dto';

export class EventCategoryDto extends EventCategoryCreateDto {
  id: number;

  constructor() {
    super();
    this.id = 0;
  }
}
