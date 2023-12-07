import { Component, ViewChild } from '@angular/core';
import { EventDto } from '../../../shared/dtos/event.dto';
import { EventApi } from '../../../api/event-api';
import { MatDialog } from '@angular/material/dialog';
import { StringHelper } from '../../../shared/classes/string-helper';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { EventCategoryApi } from '../../../api/event-category-api';
import { InfoDialogComponent } from '../../../shared/components/info-dialog/info-dialog.component';

@Component({
  selector: 'app-public-event-list',
  templateUrl: './public-event-list.component.html',
  styleUrls: ['./public-event-list.component.css'],
})
export class PublicEventListComponent {
  public dataSource = new MatTableDataSource<EventDto>();
  public displayedColumns: string[] = ['date', 'title', 'category', 'action'];
  public title = 'Anlässe';
  public displayPaginator = false;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    private route: ActivatedRoute,
    private eventApi: EventApi,
    private eventCategoryApi: EventCategoryApi,
    public dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    const date = new Date();
    date.setHours(0, 0, 0);

    this.route.paramMap.subscribe((data) => {
      const categoryString = data.get('category');

      if (categoryString != null) {
        this.eventCategoryApi.getByAbbreviation(categoryString).subscribe((category) => {
          this.title = category.name;
          this.displayedColumns = ['date', 'title', 'action'];
          this.eventApi.getAllPublicByCategory(date.getTime(), category.id).subscribe((response) => {
            this.dataSource.data = response;
            this.updateDisplayPaginator();
          });
        });
      } else {
        this.title = 'Alle Anlässe';
        this.displayedColumns = ['date', 'title', 'category', 'action'];
        this.eventApi.getAllPublic(date.getTime()).subscribe((response) => {
          this.dataSource.data = response;
          this.updateDisplayPaginator();
        });
      }
    });
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onInfo(element: EventDto): void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        text: element.publicInformation,
      },
    });
  }

  public getDateString(event: EventDto): string {
    return StringHelper.getStartEndDateTimeString(event.start, event.end);
  }

  public getTimeString(event: EventDto): string {
    return StringHelper.getStartEndTimeString(event.start, event.end);
  }

  public getDayString(event: EventDto): string {
    return StringHelper.getDayOfWeekShort(event.start);
  }

  private updateDisplayPaginator() {
    this.displayPaginator = this.dataSource.data.length > 10;
  }
}
