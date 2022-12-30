import { CsvRecord } from './helpers/csv-record';

export class ShotNumberBilling {
  public date = 0;
  public dateString: string | null = '';
  public startTime = 0;
  public endTime = 0;
  public trackShots: CsvRecord[] = [];
}
