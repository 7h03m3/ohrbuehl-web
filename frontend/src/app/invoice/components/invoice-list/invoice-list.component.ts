import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { InvoiceListItemDto } from '../../../shared/dtos/invoice-list-item.dto';
import { StringHelper } from '../../../shared/classes/string-helper';
import { Router } from '@angular/router';
import { DownloadHelper } from '../../../shared/classes/download-helper';
import { InvoiceApi } from '../../../api/classes/invoice-api';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent implements OnInit {
  invoiceList$: InvoiceListItemDto[] = [];
  displayedColumns: string[] = ['id', 'title', 'date', 'payed', 'creator', 'action'];
  private invoiceApi: InvoiceApi;

  constructor(
    private apiService: ApiService,
    private stringHelper: StringHelper,
    public dialog: MatDialog,
    private router: Router,
    private downloadHelper: DownloadHelper,
  ) {
    this.invoiceApi = this.apiService.getInvoice();
  }

  ngOnInit(): void {
    this.loadTable();
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
      data: { itemName: 'Rechnung ' + element.title + ' (' + this.stringHelper.getDateString(+element.date) + ')' },
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
    return this.stringHelper.getDateString(Number(dateNumber));
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
      this.invoiceList$ = result;
    });
  }
}
