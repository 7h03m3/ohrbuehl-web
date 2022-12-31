import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShootingRangeAccountingDto } from '../../../../../shared/dtos/shooting-range-accounting.dto';
import { CsvRecord } from '../../helpers/csv-record';
import { ShootingRangeAccountingUnitDto } from '../../../../../shared/dtos/shooting-range-accounting-unit.dto';

@Component({
  selector: 'app-shooting-range-accounting-step-upload-sius-data',
  templateUrl: './accounting-step-upload-sius-data.component.html',
  styleUrls: ['./accounting-step-upload-sius-data.component.css'],
})
export class AccountingStepUploadSiusDataComponent implements OnInit {
  @Input() accountingData!: ShootingRangeAccountingDto;
  @Input() minTrack!: string;
  @Input() maxTrack!: string;
  @Output() accountingDataChange = new EventEmitter<ShootingRangeAccountingDto>();
  @Output() minTrackChange = new EventEmitter<string>();
  @Output() maxTrackChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onFileSelected() {
    const input: any = document.querySelector('#csv-file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        const headersRow = this.getHeaderArray(csvRecordsArray);

        const records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

        this.accountingData.items = new Array<ShootingRangeAccountingUnitDto>();

        let maxTrack = 0;
        let minTrack = 0;
        records.forEach((element) => {
          const accountingUnit = new ShootingRangeAccountingUnitDto();
          accountingUnit.track = element.track;
          accountingUnit.amount = element.shots;

          this.accountingData.items.push(accountingUnit);

          if (maxTrack == 0 && minTrack == 0) {
            maxTrack = element.track;
            minTrack = element.track;
          }

          if (maxTrack < element.track) {
            maxTrack = element.track;
          }

          if (minTrack > element.track) {
            minTrack = element.track;
          }
        });

        this.minTrack = minTrack.toString();
        this.maxTrack = maxTrack.toString();

        this.maxTrackChange.emit(this.maxTrack);
        this.minTrackChange.emit(this.minTrack);
        this.accountingDataChange.emit(this.accountingData);
      };

      reader.onerror = function () {
        console.log('error is occurred while reading file!');
      };
    }
  }

  public getHeaderArray(csvRecordsArr: any) {
    const headers = (<string>csvRecordsArr[0]).split(';');
    const headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  public getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: number) {
    const csvArr: CsvRecord[] = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const currentRecord = (<string>csvRecordsArray[i]).split(';');
      if (currentRecord.length == headerLength) {
        const csvRecord: CsvRecord = new CsvRecord();
        csvRecord.track = Number(currentRecord[0].trim().replace('"', ''));
        csvRecord.shots = Number(currentRecord[1].trim());

        if (Number.isNaN(csvRecord.track) == false && csvRecord.track != 0 && csvRecord.shots != 0) {
          csvArr.push(csvRecord);
        }
      }
    }
    return csvArr;
  }
}
