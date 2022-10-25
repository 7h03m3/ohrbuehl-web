import {CsvRecord} from "./csv-record";

export class ShotNumberBilling {
  public date: number = 0;
  public dateString: string | null = "";
  public startTime: number = 0;
  public endTime: number = 0;
  public trackShots: CsvRecord[] = [];
}
