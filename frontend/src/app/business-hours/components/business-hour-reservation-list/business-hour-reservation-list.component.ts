import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StringHelper } from '../../../shared/classes/string-helper';
import { MatSort } from '@angular/material/sort';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'business-hour-reservation-list',
  templateUrl: './business-hour-reservation-list.component.html',
  styleUrls: ['./business-hour-reservation-list.component.css'],
})
export class BusinessHourReservationListComponent implements OnChanges, AfterViewInit {
  static DayOffset = 86400000;
  @Input() reservationList!: BusinessHourReservationDto[];
  @Input() dateList!: BusinessHoursDto[];
  @Output() editEvent = new EventEmitter<BusinessHourReservationDto>();
  @Output() deleteEvent = new EventEmitter<BusinessHourReservationDto>();
  public dataSource = new MatTableDataSource<BusinessHourReservationDto>();
  public displayedColumns: string[] = ['date', 'distance', 'count', 'type', 'action'];

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(private dialog: MatDialog) {}

  public ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = this.reservationList;
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId): string | number => {
      switch (sortHeaderId) {
        case 'start':
          return data.businessHour.start;
        case 'facilityType':
          return data.facilityType;
        case 'count':
          return data.count;
        case 'eventType':
          return data.eventType;
      }

      return '';
    };
  }

  public onEdit(element: BusinessHourReservationDto) {
    this.editEvent.emit(element);
  }

  public onDelete(element: BusinessHourReservationDto) {
    this.deleteEvent.emit(element);
  }

  public isReservationLocked(element: BusinessHourReservationDto): boolean {
    return element.locked;
  }

  public isReservationEditable(element: BusinessHourReservationDto): boolean {
    const limitDate = new Date(Date.now() + BusinessHourReservationListComponent.DayOffset);
    const limitTime = limitDate.getTime();

    const isInTime = element.businessHour.start > limitTime;
    return !this.isReservationLocked(element) && isInTime;
  }

  public getDateString(element: BusinessHourReservationDto): string {
    return StringHelper.getStartEndDateTimeString(element.businessHour.start, element.businessHour.end);
  }

  public getEventTypeString(element: BusinessHourReservationDto): string {
    let eventTypeString = StringHelper.getEventTypeSimpleString(element.eventType);

    if (element.comment.length != 0) {
      eventTypeString += ' (' + element.comment + ')';
    }

    return eventTypeString;
  }

  public getFacilityTypeString(element: BusinessHourReservationDto): string {
    return StringHelper.getReservationFacilityTypeSimpleString(element.facilityType);
  }

  public getCountString(element: BusinessHourReservationDto): string {
    return StringHelper.getReservationCountString(element);
  }
}
