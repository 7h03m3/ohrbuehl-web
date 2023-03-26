import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { InvoiceListItemDto } from '../../../shared/dtos/invoice-list-item.dto';
import { StringHelper } from '../../../shared/classes/string-helper';
import { Router } from '@angular/router';
import { DownloadHelper } from '../../../shared/classes/download-helper';
import { InvoiceApi } from '../../../api/classes/invoice-api';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent implements OnInit {
  public dataSource = new MatTableDataSource<InvoiceListItemDto>();
  public displayedColumns: string[] = ['id', 'title', 'date', 'payed', 'creator', 'action'];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  private invoiceApi: InvoiceApi;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router,
    private downloadHelper: DownloadHelper,
  ) {
    this.invoiceApi = this.apiService.getInvoice();
  }

  public ngOnInit(): void {
    this.loadTable();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onView(id: number) {
    this.router.navigate(['/shooting-range/invoice-view', { id: id }]);
  }

  public onDownload(id: number) {
    this.invoiceApi.getPdf(id).subscribe((response) => {
      this.downloadHelper.downloadPdfFile(response);
    });
  }

  public onEdit(id: number) {
    this.router.navigate(['/shooting-range/invoice-edit', { id: id }]);
  }

  public onDelete(element: InvoiceListItemDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: { itemName: 'Rechnung ' + element.title + ' (' + StringHelper.getDateString(+element.date) + ')' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.invoiceApi.delete(element.id).subscribe((result) => {
          this.loadTable();
        });
      }
    });
  }

  public getDateString(dateNumber: string): string {
    return StringHelper.getDateString(Number(dateNumber));
  }

  public getPayedString(payedString: string): string {
    if (payedString == 'true') {
      return 'Ja';
    } else {
      return 'Nein';
    }
  }

  private loadTable() {
    this.invoiceApi.getAll().subscribe((result) => {
      this.dataSource.data = result;
    });
  }
}
