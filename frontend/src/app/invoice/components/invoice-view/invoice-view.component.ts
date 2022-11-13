import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceDto } from '../../../shared/dtos/invoice.dto';
import { ApiService } from '../../../api/api.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css'],
})
export class InvoiceViewComponent implements OnInit {
  invoiceData: InvoiceDto = new InvoiceDto();

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      this.invoiceData.id = Number(data.get('id'));
      this.apiService.getInvoice(this.invoiceData.id).subscribe((result) => {
        this.invoiceData = result;
      });
    });
  }
}
