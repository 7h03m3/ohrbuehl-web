import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { Router } from '@angular/router';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { EventDto } from '../../../shared/dtos/event.dto';
import { EventApi } from '../../../api/event-api';
import { StringHelper } from '../../../shared/classes/string-helper';
import { InfoDialogComponent } from '../../../shared/components/info-dialog/info-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventHelper } from '../../classes/event-helper';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent {
  public dataSource = new MatTableDataSource<EventDto>();
  public displayedColumns: string[] = ['date', 'title', 'category', 'public', 'shifts', 'action'];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    private eventApi: EventApi,
    public dialog: MatDialog,
    private userLocalData: UserLocalData,
    private router: Router,
    private helper: EventHelper,
  ) {}

  public ngOnInit(): void {
    this.fetch();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onInfo(element: EventDto) {
    this.dialog.open(InfoDialogComponent, {
      data: {
        text: element.publicInformation,
      },
    });
  }

  public onDelete(element: EventDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        itemName:
          element.title +
          ' (' +
          StringHelper.getDateString(element.start) +
          ' ' +
          StringHelper.getTimeString(element.start) +
          ')',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eventApi.delete(element.id).subscribe((data) => this.fetch());
      }
    });
  }

  public onEdit(element: EventDto) {
    this.router.navigate(['/event-manager/event-edit', { id: element.id }]);
  }

  public onCreate() {
    this.router.navigate(['/event-manager/event-edit']);
  }

  public onTimeRangeChange() {
    this.fetch();
  }

  public getDateString(event: EventDto): string {
    return StringHelper.getStartEndDateTimeString(event.start, event.end);
  }

  public getDayString(event: EventDto): string {
    return StringHelper.getDayOfWeekShort(event.start);
  }

  private fetch() {
    const year = this.userLocalData.getCurrentYear();
    this.eventApi.getAllOfYear(year).subscribe((response) => {
      this.dataSource.data = this.helper.filterEventList(response);
    });
  }
}
