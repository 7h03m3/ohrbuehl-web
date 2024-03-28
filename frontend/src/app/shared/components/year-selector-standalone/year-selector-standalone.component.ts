import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-year-selector-standalone',
  templateUrl: './year-selector-standalone.component.html',
  styleUrls: ['./year-selector-standalone.component.css'],
})
export class YearSelectorStandaloneComponent {
  @Output() yearChangeEvent = new EventEmitter<number>();
  @Input() noSpacer = false;

  public onYearChange(year: number) {
    this.yearChangeEvent.emit(+year);
  }
}
