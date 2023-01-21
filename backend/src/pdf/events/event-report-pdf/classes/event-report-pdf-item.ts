import { EventShiftEntity } from '../../../../database/entities/event-shift.entity';
import { DateHelper } from '../../../../shared/classes/date-helper';

export class EventReportPdfItem {
  public category: any;
  public time: any;
  public organization: any;
  public staff: any;

  constructor() {
    this.category = '';
    this.time = '';
    this.organization = '';
    this.staff = '';
  }

  public loadFromEntity(shift: EventShiftEntity, dateHelper: DateHelper) {
    if (shift.assignedStaff != undefined) {
      this.staff = this.setValue(shift.assignedStaff.firstName + ' ' + shift.assignedStaff.lastName);
    }

    if (shift.organization != undefined) {
      this.organization = this.setValueColor(shift.organization.abbreviation, shift.organization.color);
    }

    this.time = this.setValue(dateHelper.getTimeString(shift.start) + ' - ' + dateHelper.getTimeString(shift.end));
    this.category = this.setValue(shift.category.name);
  }

  private setValue(value: string): any {
    if (value == undefined) {
      value = '';
    }
    return { label: ' ' + value, options: { fontSize: 12 } };
  }

  private setValueColor(value: string, color: string): any {
    if (value == undefined) {
      value = '';
    }
    return { label: ' ' + value, options: { fontSize: 12, backgroundColor: color, backgroundOpacity: 1 } };
  }
}
