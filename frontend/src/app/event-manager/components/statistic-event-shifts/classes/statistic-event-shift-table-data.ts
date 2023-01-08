import { EventDto } from '../../../../shared/dtos/event.dto';

export class StatisticEventShiftTableData {
  event: EventDto;
  totalShifts: number;

  constructor() {
    this.event = new EventDto();
    this.totalShifts = 0;
  }
}
