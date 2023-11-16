import { Component, ViewChild } from '@angular/core';
import { EventApi } from '../../../api/classes/event-api';
import { ApiService } from '../../../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { Router } from '@angular/router';
import { StringHelper } from '../../../shared/classes/string-helper';
import { EventShiftDto } from '../../../shared/dtos/event-shift.dto';
import { EventShiftListItemDto } from './dtos/event-shift-list-item.dto';
import { DownloadHelper } from '../../../shared/classes/download-helper';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventCategoryApi } from '../../../api/classes/event-category-api';
import { EventCategoryDto } from '../../../shared/dtos/event-category.dto';
import { SidenavService } from '../../../shared/services/sidenav.service';
import { EventHelper } from '../../classes/event-helper';

@Component({
  selector: 'app-event-shift-list',
  templateUrl: './event-shift-list.component.html',
  styleUrls: ['./event-shift-list.component.css'],
})
export class EventShiftListComponent {
  public dataSource = new MatTableDataSource<EventShiftListItemDto>();
  public displayedColumns: string[] = ['time', 'title', 'category', 'organization', 'shift', 'action'];
  public categoryList = new Array<EventCategoryDto>();
  public selectedCategory = 0;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  private eventApi: EventApi;
  private categoryApi: EventCategoryApi;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private userLocalData: UserLocalData,
    private router: Router,
    private downloadHelper: DownloadHelper,
    private sidenavService: SidenavService,
    private helper: EventHelper,
  ) {
    this.eventApi = this.apiService.getEvent();
    this.categoryApi = this.apiService.getEventCategory();
  }

  public ngOnInit(): void {
    this.selectedCategory = this.userLocalData.getEventCategory();
    this.fetch();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onCategoryChange(categoryId: number) {
    this.userLocalData.setEventCategory(categoryId);
    this.selectedCategory = categoryId;
    this.fetchEvents();
  }

  public onShiftPlaning(element: EventShiftListItemDto) {
    this.sidenavService.setSmallView(true);
    this.router.navigate(['/event-manager/event-shift-edit', { eventId: element.event.id }]);
  }

  public onDownload(element: EventShiftListItemDto) {
    this.eventApi.getEventReport(element.event.id).subscribe((response) => {
      this.downloadHelper.downloadPdfFile(response);
    });
  }

  public getTimeString(element: EventShiftListItemDto): string {
    return StringHelper.getStartEndDateTimeString(element.event.start, element.event.end);
  }

  public isShiftAssignmentOkay(element: EventShiftListItemDto): boolean {
    return element.totalShifts == element.assignedShifts;
  }

  public isOrganizationAssignmentOkay(element: EventShiftListItemDto): boolean {
    return element.totalShifts == element.assignedOrganization;
  }

  public onTimeRangeChange() {
    this.fetchEvents();
  }

  private isOrganizationAssigned(shift: EventShiftDto): boolean {
    return shift.organizationId != null && shift.organizationId != 0;
  }

  private isAssigned(shift: EventShiftDto): boolean {
    return shift.assignedStaffId != null && shift.assignedStaffId != 0 && this.isOrganizationAssigned(shift);
  }

  private fetch() {
    this.fetchEvents();
    this.categoryApi.getAll().subscribe((response) => {
      this.categoryList = new Array<EventCategoryDto>();

      const allCategory = new EventCategoryDto();
      allCategory.name = 'Alle';
      this.categoryList.push(allCategory);

      response.forEach((category) => {
        this.categoryList.push(category);
      });
    });
  }

  private fetchEvents() {
    if (this.selectedCategory != 0) {
      this.displayedColumns = ['time', 'title', 'organization', 'shift', 'action'];
    } else {
      this.displayedColumns = ['time', 'title', 'category', 'organization', 'shift', 'action'];
    }

    const year = this.userLocalData.getCurrentYear();
    this.eventApi.getAllWithShiftsOfYear(year).subscribe((response) => {
      response = this.helper.filterEventList(response);

      const shiftList = new Array<EventShiftListItemDto>();

      response.forEach((event) => {
        if (this.selectedCategory == 0 || event.categoryId == this.selectedCategory) {
          const element = new EventShiftListItemDto();
          element.start = event.start;
          element.categoryId = event.categoryId;
          element.title = event.title;
          element.event = event;

          if (event.shifts != undefined) {
            element.totalShifts = event.shifts.length;

            event.shifts.forEach((shift) => {
              if (this.isOrganizationAssigned(shift)) {
                element.assignedOrganization = element.assignedOrganization + 1;
              }
              if (this.isAssigned(shift)) {
                element.assignedShifts = element.assignedShifts + 1;
              }
            });
          }

          shiftList.push(element);
        }
      });

      this.dataSource.data = shiftList;
    });
  }
}
