import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationDto } from '../../../shared/dtos/application.dto';
import { ApplicationAdminApiService } from '../../../api/application-admin-api.service';
import { MatSort } from '@angular/material/sort';
import { ApplicationState } from '../../../shared/enums/appliaction-state.enum';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';
import { ApplicationReasonDialogComponent } from '../application-reason-dialog/application-reason-dialog.component';
import { DownloadHelper } from '../../../shared/classes/download-helper';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css'],
})
export class ApplicationListComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<ApplicationDto>();
  public displayedColumns: string[] = ['lastname', 'firstname', 'state', 'expirationDate', 'timeLeft', 'action'];
  @ViewChild(MatSort) sort: any = MatSort;
  protected readonly ApplicationState = ApplicationState;

  constructor(
    private applicationService: ApplicationAdminApiService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private router: Router,
    private downloadHelper: DownloadHelper,
  ) {}

  public ngOnInit() {
    this.loadData();
  }

  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'expirationDate':
          return item.dates.expiration;
        default:
          const itemWrapper = item as any;
          return itemWrapper[property];
      }
    };
  }

  public onDelete(element: ApplicationDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: { itemName: 'den Antrag von ' + element.firstname + ' ' + element.lastname },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.applicationService.delete(element.id).subscribe(() => this.loadData());
      }
    });
  }

  public onEdit(element: ApplicationDto) {
    this.router.navigate([
      '/applications/edit',
      {
        id: element.id,
      },
    ]);
  }

  public onSetAccept(element: ApplicationDto) {
    this.setState(element, ApplicationState.Accepted);
  }

  public onSetSubmit(element: ApplicationDto) {
    this.setState(element, ApplicationState.Submitted);
  }

  public onSetReject(element: ApplicationDto) {
    const dialogRef = this.dialog.open(ApplicationReasonDialogComponent);

    dialogRef.afterClosed().subscribe((response) => {
      if (response == undefined) {
        return;
      }
      this.setState(element, ApplicationState.Rejected, response);
    });
  }

  public downloadSheet(element: ApplicationDto) {
    this.applicationService.downloadSheet(element).subscribe((response) => {
      this.downloadHelper.downloadPdfFile(response);
    });
  }

  public getStateColor(element: ApplicationDto): string {
    switch (element.state) {
      case ApplicationState.Submitted:
        return 'orange';
      case ApplicationState.Open:
      case ApplicationState.Rejected:
        return 'red';
      case ApplicationState.Accepted:
        return 'green';
      default:
        return 'gray';
    }
  }

  public getStateText(element: ApplicationDto): string {
    switch (element.state) {
      case ApplicationState.Open:
        return 'Offen';
      case ApplicationState.Submitted:
        return 'Eingereicht';
      case ApplicationState.Rejected:
        return 'Abgelehnt';
      case ApplicationState.Accepted:
        return 'Akzeptiert';
      default:
        return 'Unbekannt';
    }
  }

  private setState(element: ApplicationDto, newState: ApplicationState, comment = '') {
    element.state = newState;
    element.comment = comment;
    this.applicationService.setState(element).subscribe(() => {
      this.loadData();
      this.notificationService.update();
    });
  }

  private loadData() {
    this.applicationService.getAll().subscribe((response) => {
      this.dataSource.data = response.sort((a, b) => {
        return a.dates.create == b.dates.create ? 0 : a.dates.create > b.dates.create ? 1 : -1;
      });
    });
  }
}
