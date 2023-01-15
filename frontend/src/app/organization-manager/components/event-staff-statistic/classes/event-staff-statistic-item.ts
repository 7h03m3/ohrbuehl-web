export class EventStaffStatisticItem {
  public name: string;
  public shiftCount: number;
  public presentCount: number;
  public notPresentCount: number;

  constructor() {
    this.name = '';
    this.shiftCount = 0;
    this.presentCount = 0;
    this.notPresentCount = 0;
  }
}
