import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../api/api.service';
import { StringHelper } from '../../../shared/classes/string-helper';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ShootingRangeAccountingDto } from '../../../shared/dtos/shooting-range-accounting.dto';
import { AccountingApi } from '../../../api/classes/accounting-api';
import { DownloadHelper } from '../../../shared/classes/download-helper';

@Component({
  selector: 'app-shooting-range-accounting-list',
  templateUrl: './shooting-range-accounting-list.component.html',
  styleUrls: ['./shooting-range-accounting-list.component.css'],
})
export class ShootingRangeAccountingListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'time', 'day', 'type', 'total', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild('table') table!: MatTable<any>;
  private accountingApi: AccountingApi;

  constructor(
    private router: Router,
    private apiService: ApiService,
    public dialog: MatDialog,
    private stringHelper: StringHelper,
    private userData: UserLocalData,
    private downloadHelper: DownloadHelper,
  ) {
    this.accountingApi = this.apiService.getAccounting();
  }

  ngOnInit(): void {
    this.fetch();
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
    const dateString =
      this.stringHelper.getDateString(+element.date) + ' ' + element.startTime + ' - ' + element.endTime;
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: { itemName: 'Schusszahlen vom ' + dateString },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.accountingApi.delete(element.id).subscribe((data) => this.fetch());
      }
    });
  }

  public getDateString(dateNumber: string): string {
    return this.stringHelper.getDateString(+dateNumber);
  }

  public getTypeString(typeString: string): string {
    return this.userData.convertAccountingTypeText(typeString);
  }

  public getDayString(dateNumber: string): string {
    return this.stringHelper.getDayOfWeekShort(+dateNumber);
  }

  private fetch() {
    this.accountingApi.getList().subscribe((result) => {
      this.table.renderRows();
      this.table.dataSource = result;
    });
  }
}
