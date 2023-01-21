import { EventShiftDto } from '../../../shared/dtos/event-shift.dto';

export interface EventShiftEditDialogData {
  shiftData: EventShiftDto;
  create: boolean;
  amount: number;
  result: boolean;
}
