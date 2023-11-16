import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { UserLocalData } from '../../classes/user-local-data';
import { ListTimeRange } from '../../enums/list-time-range';

@Component({
  selector: 'app-time-range-selector',
  templateUrl: './time-range-selector.component.html',
  styleUrls: ['./time-range-selector.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TimeRangeSelectorComponent {
  public selectedTimeRange = ListTimeRange.All;
  public timeRanges = Object.values(ListTimeRange);
  @Output() changeEvent = new EventEmitter();
  @Output() yearChangeEvent = new EventEmitter<number>();
  @Output() timeRangeChangeEvent = new EventEmitter<ListTimeRange>();

  constructor(private userLocalDate: UserLocalData) {}

  public getTimeRangeString(timeRange: string): string {
    switch (timeRange as ListTimeRange) {
      default:
      case ListTimeRange.All:
        return 'Alle';
      case ListTimeRange.FutureItems:
        return 'Zukünftige';
      case ListTimeRange.PastItems:
        return 'Vergangene';
    }
  }

  public ngOnInit() {
    this.selectedTimeRange = this.userLocalDate.getCurrentListItemRange();
  }

  public onYearChange(year: number) {
    this.yearChangeEvent.emit(+year);
    this.changeEvent.emit();
  }

  public onTimeRangeChange(timeRangeString: string) {
    const itemRange = timeRangeString as ListTimeRange;
    this.userLocalDate.setCurrentListItemRange(itemRange);
    this.timeRangeChangeEvent.emit(itemRange);
    this.changeEvent.emit();
  }
}
