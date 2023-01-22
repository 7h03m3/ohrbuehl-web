import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ShootingRangeAccountingDto } from '../../../../../shared/dtos/shooting-range-accounting.dto';
import { StringHelper } from '../../../../../shared/classes/string-helper';

@Component({
  selector: 'app-shooting-range-accounting-step-enter-date-and-time',
  templateUrl: './enter-date-and-time.component.html',
  styleUrls: ['./enter-date-and-time.component.css'],
})
export class EnterDateAndTimeComponent implements OnInit {
  public dateForm: UntypedFormGroup = new UntypedFormGroup({});

  @Input() buttonText = 'Weiter';
  @Input() accountingData!: ShootingRangeAccountingDto;
  @Output() accountingDataChange = new EventEmitter<ShootingRangeAccountingDto>();

  constructor(private formBuilder: UntypedFormBuilder, private stringHelper: StringHelper) {}

  ngOnInit(): void {
    this.dateForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
    });

    this.fetch(this.accountingData);
  }

  public fetch(accountingData: ShootingRangeAccountingDto) {
    this.accountingData = accountingData;
    if (this.accountingData.id != 0) {
      const date = new Date(+this.accountingData.start);
      date.setUTCHours(0, 0, 0, 0);

      this.dateForm.controls['date'].setValue(date.toISOString());
      this.dateForm.controls['startTime'].setValue(this.stringHelper.getTimeString(this.accountingData.start));
      this.dateForm.controls['endTime'].setValue(this.stringHelper.getTimeString(this.accountingData.end));
    } else {
      this.dateForm.controls['date'].setValue('');
      this.dateForm.controls['startTime'].setValue('');
      this.dateForm.controls['endTime'].setValue('');
    }
  }

  public onSubmit() {
    const date = this.dateForm.controls['date'].value;
    const startTime = this.dateForm.controls['startTime'].value;
    const endTime = this.dateForm.controls['endTime'].value;
    this.accountingData.start = this.stringHelper.getDate(date, startTime);
    this.accountingData.end = this.stringHelper.getDate(date, endTime);
    this.accountingDataChange.emit(this.accountingData);
  }
}
