import { EventShiftCategoryCreateDto } from './event-shift-category-create.dto';

export class EventShiftCategoryDto extends EventShiftCategoryCreateDto {
  id: number;

  constructor() {
    super();
    this.id = 0;
  }
}
