import { EventShiftCreateDto } from './event-shift-create.dto';

export class EventShiftDto extends EventShiftCreateDto {
  id: number;

  constructor() {
    super();
    this.id = 0;
  }
}
