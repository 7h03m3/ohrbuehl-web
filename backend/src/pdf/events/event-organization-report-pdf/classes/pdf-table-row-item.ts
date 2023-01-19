export class EventReportPdfRowItemOptions {
  fontSize: number;
  backgroundColor: string;
  backgroundOpacity: number;

  constructor() {
    this.fontSize = 10;
    this.backgroundColor = '';
    this.backgroundOpacity = 1;
  }
}

export class EventReportPdfRowItem {
  public label: string;
  public options: EventReportPdfRowItemOptions;

  constructor() {
    this.label = '';
    this.options = new EventReportPdfRowItemOptions();
  }
}
