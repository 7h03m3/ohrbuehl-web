export class StatisticEventShiftTableColumn {
  def: string;
  header: string;
  organizationId: number;
  dataMap: Map<number, number>;
  total: number;

  constructor() {
    this.def = '';
    this.header = '';
    this.organizationId = 0;
    this.dataMap = new Map<number, number>();
    this.total = 0;
  }
}
