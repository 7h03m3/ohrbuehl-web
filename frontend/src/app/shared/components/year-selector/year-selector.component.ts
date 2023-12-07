import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { UserLocalData } from '../../classes/user-local-data';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class YearSelectorComponent {
  private static YearRange = 10;
  public selectedYear = 0;
  public yearList = new Array<number>();
  @Output() yearChangeEvent = new EventEmitter<number>();

  constructor(private userLocalData: UserLocalData) {}

  public ngOnInit() {
    this.selectedYear = this.userLocalData.getCurrentYear();
    for (let i = -1 * YearSelectorComponent.YearRange; i <= YearSelectorComponent.YearRange; i++) {
      this.yearList.push(this.selectedYear + i);
    }
  }

  public onYearChange(year: number) {
    this.selectedYear = +year;
    this.userLocalData.setCurrentYear(this.selectedYear);
    this.yearChangeEvent.emit(this.selectedYear);
  }
}
