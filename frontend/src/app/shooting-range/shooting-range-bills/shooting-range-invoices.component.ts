import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { InvoiceItemDto } from '../../shared/dtos/invoice-item.dto';
import { InvoiceDebtorDto } from '../../shared/dtos/invoice-debtor.dto';
import { MatStepper } from '@angular/material/stepper';
import { InvoiceCreateDto } from '../../shared/dtos/invoice-create.dto';
import { InvoiceDto } from '../../shared/dtos/invoice.dto';

@Component({
  selector: 'app-shooting-range-bills',
  templateUrl: './shooting-range-invoices.component.html',
  styleUrls: ['./shooting-range-invoices.component.css'],
})
export class ShootingRangeInvoicesComponent implements OnInit {
  public invoiceData: InvoiceDto = new InvoiceDto();
  public formTitle: string = 'Rechnung erstellen';
  public formValid: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.formValid = true;
    this.invoiceData = new InvoiceDto();

    this.invoiceData.id = 1;
    this.invoiceData.date = 1667641445 * 1000;
    this.invoiceData.title = 'Testrechnung Thomas II';
    this.invoiceData.filename = 'testrechnung_angular.pdf';

    this.invoiceData.debtor = new InvoiceDebtorDto();
    this.invoiceData.debtor.name = 'Thomas Stanger';
    this.invoiceData.debtor.address = 'Schlossmühlestrasse';
    this.invoiceData.debtor.buildingNumber = '64';
    this.invoiceData.debtor.city = 'Winterthur';
    this.invoiceData.debtor.zip = 8408;

    this.invoiceData.creditor.name = 'Schützenverband Ohrbühl Winterthur';
    this.invoiceData.creditor.address = 'Seenerstrasse';
    this.invoiceData.creditor.buildingNumber = '139';
    this.invoiceData.creditor.city = 'Winterthur';
    this.invoiceData.creditor.zip = 8404;
    this.invoiceData.creditor.account = 'CH8109000000907847005'; // Thomas

    let item: InvoiceItemDto = new InvoiceItemDto();
    item.amount = 2;
    item.description = 'Implementierung Webseite (h)';
    item.price = 510.25;
    item.position = 1;
    this.invoiceData.items.push(item);

    let item2: InvoiceItemDto = new InvoiceItemDto();
    item2.amount = 1;
    item2.description = 'Mittagessen';
    item2.price = 31.2;
    item2.position = 2;
    this.invoiceData.items.push(item2);

    let item3: InvoiceItemDto = new InvoiceItemDto();
    item3.amount = 100;
    item3.description = 'Spielzeug';
    item3.price = 10.3;
    item3.position = 3;
    this.invoiceData.items.push(item3);
  }

  public onSubmit() {}

  public onStepSubmit(stepper: MatStepper) {
    stepper.next();
  }

  public onSave() {
    let createDto = new InvoiceCreateDto();

    createDto.date = this.invoiceData.date;
    createDto.title = this.invoiceData.title;
    createDto.filename = this.invoiceData.filename;
    createDto.creditor = this.invoiceData.creditor;
    createDto.debtor = this.invoiceData.debtor;
    createDto.items = this.invoiceData.items;
    createDto.payed = this.invoiceData.payed;

    this.apiService.createInvoice(createDto).subscribe((response) => {
      console.log(response);
    });
  }

  public downloadInvoice() {
    /*
    this.apiService.getInvoicePdf(this.invoiceData).subscribe((response) => {
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename: string = 'rechnung.pdf';
      if (contentDisposition) {
        filename = contentDisposition.substring(21, contentDisposition.length);
      }

      if (response.body) {
        const blob = new Blob([response.body], { type: 'application/pdf' });
        let url = window.URL.createObjectURL(blob);
        let anchor = document.createElement('a');
        anchor.download = filename;
        anchor.href = url;
        anchor.click();
      }
    });*/
  }
}
