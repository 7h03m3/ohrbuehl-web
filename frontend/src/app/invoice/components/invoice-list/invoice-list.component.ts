import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { InvoiceListItemDto } from '../../../shared/dtos/invoice-list-item.dto';
import { StringHelper } from '../../../shared/classes/string-helper';
import { Router } from '@angular/router';
import { DownloadHelper } from '../../../shared/classes/download-helper';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent implements OnInit {
  invoiceList$: InvoiceListItemDto[] = [];
  displayedColumns: string[] = ['id', 'title', 'date', 'payed', 'creator', 'action'];

  constructor(
    private apiService: ApiService,
    private stringHelper: StringHelper,
    private router: Router,
    private downloadHelper: DownloadHelper,
  ) {}

  ngOnInit(): void {
    this.loadTable();
  }

  public onView(id: number) {
    this.router.navigate(['/shooting-range/invoice-view', { id: id }]);
  }

  public onDownload(id: number) {
    this.apiService.getInvoicePdf(id).subscribe((response) => {
      this.downloadHelper.downloadPdfFile(response);
    });
  }

  public onEdit(id: number) {
    this.router.navigate(['/shooting-range/invoice-edit', { id: id }]);
  }

  public onDelete(id: number) {
    this.apiService.deleteInvoice(id).subscribe((result) => {
      this.loadTable();
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
    this.apiService.getInvoiceList().subscribe((result) => {
      this.invoiceList$ = result;
    });
  }
}
