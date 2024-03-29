import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../api/api.service';
import { StringHelper } from '../../../shared/classes/string-helper';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ShootingRangeAccountingDto } from '../../../shared/dtos/shooting-range-accounting.dto';
import { AccountingApi } from '../../../api/classes/accounting-api';
import { DownloadHelper } from '../../../shared/classes/download-helper';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-shooting-range-accounting-list',
  templateUrl: './shooting-range-accounting-list.component.html',
  styleUrls: ['./shooting-range-accounting-list.component.css'],
})
export class ShootingRangeAccountingListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'type', 'total', 'action'];
  dataSource = new MatTableDataSource<ShootingRangeAccountingDto>();
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  private accountingApi: AccountingApi;

  constructor(
    private router: Router,
    private apiService: ApiService,
    public dialog: MatDialog,
    private userData: UserLocalData,
    private downloadHelper: DownloadHelper,
  ) {
    this.accountingApi = this.apiService.getAccounting();
  }

  public ngOnInit(): void {
    this.fetch();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onView(id: number) {
    this.router.navigate(['/shooting-range/accounting-view', { id: id }]);
  }

  public onDownload(id: number) {
    this.accountingApi.getPdf(id).subscribe((response) => {
      this.downloadHelper.downloadPdfFile(response);
    });
  }

  public onEdit(id: number) {
    this.router.navigate(['/shooting-range/accounting-edit', { id: id }]);
  }

  public onDelete(element: ShootingRangeAccountingDto) {
    const dateString = StringHelper.getStartEndDateTimeString(element.start, element.end);
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: { itemName: 'Schusszahlen vom ' + dateString },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.accountingApi.delete(element.id).subscribe(() => this.fetch());
      }
    });
  }

  public getDateString(element: ShootingRangeAccountingDto): string {
    return (
      StringHelper.getDayOfWeekShort(element.start) +
      ', ' +
      StringHelper.getStartEndDateTimeString(element.start, element.end)
    );
  }

  public getTypeString(typeString: string): string {
    return this.userData.convertAccountingTypeText(typeString);
  }

  private fetch() {
    this.accountingApi.getList().subscribe((result) => {
      this.dataSource.data = result;
    });
  }
}
