export class PdfTableHeaderItem {
  public label: string;
  public property: string;
  public align: string;
  public width: number;

  constructor() {
    this.label = '';
    this.property = '';
    this.align = 'left';
    this.width = 100;
  }
}
