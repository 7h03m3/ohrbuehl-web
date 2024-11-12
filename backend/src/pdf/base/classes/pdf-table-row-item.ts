export class PdfTableRowItemOptions {
  fontSize: number;
  fontFamily: string;
  backgroundColor: string;
  backgroundOpacity: number;
  separation: boolean;

  constructor() {
    this.fontSize = 10;
    this.fontFamily = 'Helvetica';
    this.backgroundColor = '';
    this.backgroundOpacity = 1;
    this.separation = true;
  }
}

export class PdfTableRowItem {
  public label: string;
  public options: PdfTableRowItemOptions;

  constructor() {
    this.label = '';
    this.options = new PdfTableRowItemOptions();
  }
}
