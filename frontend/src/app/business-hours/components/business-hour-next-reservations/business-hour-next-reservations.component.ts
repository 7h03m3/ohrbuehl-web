import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { StringHelper } from '../../../shared/classes/string-helper';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'business-hour-next-reservations',
  templateUrl: './business-hour-next-reservations.component.html',
  styleUrls: ['./business-hour-next-reservations.component.css'],
})
export class BusinessHourNextReservationsComponent implements OnChanges, AfterViewInit {
  @Input() reservationList!: BusinessHourReservationDto[];
  public dataSource = new MatTableDataSource<BusinessHourReservationDto>();
  public displayedColumns: string[] = ['date', 'distance', 'count', 'type'];

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  public ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = this.reservationList;
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
