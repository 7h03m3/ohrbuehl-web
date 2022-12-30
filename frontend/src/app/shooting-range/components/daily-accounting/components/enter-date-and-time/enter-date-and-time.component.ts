import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShootingRangeAccountingDto } from '../../../../../shared/dtos/shooting-range-accounting.dto';

@Component({
  selector: 'app-enter-date-and-time',
  templateUrl: './enter-date-and-time.component.html',
  styleUrls: ['./enter-date-and-time.component.css'],
})
export class EnterDateAndTimeComponent implements OnInit {
  public dateForm: FormGroup = new FormGroup({});

  @Input() accountingData!: ShootingRangeAccountingDto;
  @Output() accountingDataChange = new EventEmitter<ShootingRangeAccountingDto>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dateForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
    });
  }

  public onSubmit() {
    this.accountingData.date = Date.parse(this.dateForm.controls['date'].value);
    this.accountingData.startTime = this.dateForm.controls['startTime'].value;
    this.accountingData.endTime = this.dateForm.controls['endTime'].value;
    this.accountingDataChange.emit(this.accountingData);
  }
}
