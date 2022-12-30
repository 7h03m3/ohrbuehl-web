import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceDto } from '../../../shared/dtos/invoice.dto';
import { ApiService } from '../../../api/api.service';
import { InvoiceApi } from '../../../api/classes/invoice-api';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css'],
})
export class InvoiceViewComponent implements OnInit {
  invoiceData: InvoiceDto = new InvoiceDto();
  private invoiceApi: InvoiceApi;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.invoiceApi = this.apiService.getInvoice();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      this.invoiceData.id = Number(data.get('id'));
      this.invoiceApi.getById(this.invoiceData.id).subscribe((result) => {
        this.invoiceData = result;
      });
    });
  }
}
