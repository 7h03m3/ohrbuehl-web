import {Component, OnInit} from '@angular/core';
import {CsvRecord} from "./csv-record";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {Organization} from "./organization";
import {ShotNumberBilling} from "./shot-number-billing";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-shot-numbers',
  templateUrl: './shot-numbers.component.html',
  styleUrls: ['./shot-numbers.component.css']
})

export class ShotNumbersComponent implements OnInit {

  public dateForm: FormGroup = new FormGroup({});
  public shotNumberBilling: ShotNumberBilling = new ShotNumberBilling();
  public organizations: Organization[] = [
    {id: 1, fullName: "Feldschützen Gesellschaft Winterthur", abbreviation: "FSGW"},
    {id: 2, fullName: "Militärschiessverein Winterthur", abbreviation: "MSVW"},
    {id: 3, fullName: "Arbeiterschiessverein Winterthur", abbreviation: "ASVW"},
  ];
  public nextButtonDisabled: boolean = true;
  public minTrack: string = "0";
  public maxTrack: string = "0";

  constructor(private fb: FormBuilder, public datepipe: DatePipe) {
  }

  ngOnInit(): void {
    this.dateForm = this.fb.group({
      date: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
    });
  }

  saveDateTime(stepper: MatStepper) {
    this.shotNumberBilling.date = Date.parse(this.dateForm.controls['date'].value);
    this.shotNumberBilling.dateString = this.datepipe.transform(this.shotNumberBilling.date, 'dd.MM.yyyy');
    this.shotNumberBilling.startTime = this.dateForm.controls['startTime'].value;
    this.shotNumberBilling.endTime = this.dateForm.controls['endTime'].value;

    stepper.next();
  }

  onFileSelected(stepper: MatStepper) {
    const input: any = document.querySelector('#csv-file');

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.shotNumberBilling.trackShots = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

        let maxTrack: number = 0;
        let minTrack: number = 0;
        this.shotNumberBilling.trackShots.forEach(element => {
          if ((maxTrack == 0) && (minTrack == 0)) {
            maxTrack = element.track;
            minTrack = element.track;
          }

          if (maxTrack < element.track) {
            maxTrack = element.track;
          }

          if (minTrack > element.track) {
            minTrack = element.track;
          }
        })

        this.minTrack = minTrack.toString();
        this.maxTrack = maxTrack.toString();

        stepper.next();
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    }
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(';');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: number) {
    let csvArr: CsvRecord[] = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currentRecord = (<string>csvRecordsArray[i]).split(';');
      if (currentRecord.length == headerLength) {
        let csvRecord: CsvRecord = new CsvRecord();
        csvRecord.track = Number(currentRecord[0].trim().replace('"', ""));
        csvRecord.shots = Number(currentRecord[1].trim());
        csvRecord.shotPrice = 0.30;

        if ((Number.isNaN(csvRecord.track) == false) && (csvRecord.track != 0) && (csvRecord.shots != 0)) {
          csvArr.push(csvRecord);
        }
      }
    }
    return csvArr;
  }

  checkIfAllFilledIn() {
    let allFilledIn = true;
    this.shotNumberBilling.trackShots.forEach(element => {
      if (Number.isNaN(element.organizationId)) {
        allFilledIn = false;
      }
    })

    this.nextButtonDisabled = !allFilledIn;
  }
}
