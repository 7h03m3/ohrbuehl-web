export class PdfTableRowItemOptions {
  fontSize: number;
  backgroundColor: string;
  backgroundOpacity: number;

  constructor() {
    this.fontSize = 10;
    this.backgroundColor = '';
    this.backgroundOpacity = 1;
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
