import { Component } from '@angular/core';
import { EventCategoryDto } from '../../../shared/dtos/event-category.dto';
import { EventCategoryApi } from '../../../api/classes/event-category-api';
import { ApiService } from '../../../api/api.service';
import { EventApi } from '../../../api/classes/event-api';
import { DownloadHelper } from '../../../shared/classes/download-helper';
import { AuthService } from '../../../auth/auth.service';
import { catchError, EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-shift-downloads',
  templateUrl: './event-shift-downloads.component.html',
  styleUrls: ['./event-shift-downloads.component.css'],
})
export class EventShiftDownloadsComponent {
  public categoryList: EventCategoryDto[] = new Array<EventCategoryDto>();
  public shiftReportSelect = 0;
  private organizationId = 0;
  private categoryApi: EventCategoryApi;
  private eventApi: EventApi;

  constructor(
    private apiService: ApiService,
    private downloadHelper: DownloadHelper,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.categoryApi = this.apiService.getEventCategory();
    this.eventApi = this.apiService.getEvent();
  }

  public ngOnInit(): void {
    this.organizationId = this.authService.getManagingOrganizationId();

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

  public onShiftReportDownload() {
    if (this.shiftReportSelect == 0) {
      this.eventApi
        .getOrganizationEventReport(this.organizationId)
        .pipe(
          catchError(() => {
            return this.catchReportError();
          }),
        )
        .subscribe((response) => {
          this.downloadHelper.downloadPdfFile(response);
        });
    } else {
      this.eventApi
        .getOrganizationEventReportByCategory(this.organizationId, this.shiftReportSelect)
        .pipe(
          catchError(() => {
            return this.catchReportError();
          }),
        )
        .subscribe((response) => {
          this.downloadHelper.downloadPdfFile(response);
        });
    }
  }

  public onShiftStaffReportDownload() {
    this.eventApi
      .getOrganizationShiftReport(this.organizationId)
      .pipe(
        catchError(() => {
          return this.catchReportError();
        }),
      )
      .subscribe((response) => {
        this.downloadHelper.downloadPdfFile(response);
      });
  }

  private catchReportError() {
    this.openSnackBar('Report nicht vorhanden oder enthält keine Daten');
    return EMPTY;
  }

  private openSnackBar(message: string) {
    const ref = this.snackBar.open(message, 'Verbergen', {
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }
}
