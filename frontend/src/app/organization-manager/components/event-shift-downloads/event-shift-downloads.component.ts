import { Component } from '@angular/core';
import { EventCategoryDto } from '../../../shared/dtos/event-category.dto';
import { EventCategoryApi } from '../../../api/event-category-api';
import { EventApi } from '../../../api/event-api';
import { DownloadHelper } from '../../../shared/classes/download-helper';
import { AuthService } from '../../../auth/auth.service';
import { catchError, EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLocalData } from '../../../shared/classes/user-local-data';

@Component({
  selector: 'app-event-shift-downloads',
  templateUrl: './event-shift-downloads.component.html',
  styleUrls: ['./event-shift-downloads.component.css'],
})
export class EventShiftDownloadsComponent {
  public categoryList: EventCategoryDto[] = new Array<EventCategoryDto>();
  public shiftReportSelect = 0;
  private organizationId = 0;

  constructor(
    private categoryApi: EventCategoryApi,
    private eventApi: EventApi,
    private downloadHelper: DownloadHelper,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private useLocalData: UserLocalData,
  ) {}

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
    const year = this.useLocalData.getCurrentYear();
    if (this.shiftReportSelect == 0) {
      this.eventApi
        .getOrganizationEventReport(this.organizationId, year)
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
        .getOrganizationEventReportByCategory(this.organizationId, this.shiftReportSelect, year)
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
      .getOrganizationShiftReport(this.organizationId, this.useLocalData.getCurrentYear())
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
