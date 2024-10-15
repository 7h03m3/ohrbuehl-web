import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-application-edit-date-picker',
  templateUrl: './application-edit-date-picker.component.html',
  styleUrls: ['./application-edit-date-picker.component.css'],
})
export class ApplicationEditDatePickerComponent implements OnChanges {
  @Input()
  public label = 'Datum';

  @Input()
  public width = '';

  @Input()
  public date = 0;

  @Output()
  public dateChange = new EventEmitter<number>();

  public dateValue = new Date(Date.now());

  public ngOnChanges(changes: SimpleChanges): void {
    this.dateValue = new Date(+changes['date'].currentValue);
    this.date = this.dateValue.getTime();
  }

  public onDateSelection(event: MatDatepickerInputEvent<any>) {
    this.dateValue = new Date(event.value._d);
    this.date = this.dateValue.getTime();
    this.dateChange.emit(this.date);
  }
}
