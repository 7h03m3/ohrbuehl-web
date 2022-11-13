import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { InvoiceItemDto } from '../../shared/dtos/invoice-item.dto';
import { InvoiceDebtorDto } from '../../shared/dtos/invoice-debtor.dto';
import { MatStepper } from '@angular/material/stepper';
import { InvoiceCreateDto } from '../../shared/dtos/invoice-create.dto';
import { InvoiceDto } from '../../shared/dtos/invoice.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shooting-range-bills',
  templateUrl: './shooting-range-invoices.component.html',
  styleUrls: ['./shooting-range-invoices.component.css'],
})
export class ShootingRangeInvoicesComponent implements OnInit {
  public invoiceData: InvoiceDto = new InvoiceDto();
  public formTitle = 'Rechnung erstellen';
  public formValid = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      const invoiceId = Number(data.get('id'));
      if (!invoiceId) {
        this.invoiceData = new InvoiceDto();

        this.invoiceData.date = new Date().getTime();
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

        const item: InvoiceItemDto = new InvoiceItemDto();
        item.amount = 2;
        item.description = 'Implementierung Webseite (h)';
        item.price = 510.25;
        item.position = 1;
        this.invoiceData.items.push(item);

        const item2: InvoiceItemDto = new InvoiceItemDto();
        item2.amount = 1;
        item2.description = 'Mittagessen';
        item2.price = 31.2;
        item2.position = 2;
        this.invoiceData.items.push(item2);

        const item3: InvoiceItemDto = new InvoiceItemDto();
        item3.amount = 100;
        item3.description = 'Spielzeug';
        item3.price = 10.3;
        item3.position = 3;
        this.invoiceData.items.push(item3);
      } else {
        this.apiService.getInvoice(invoiceId).subscribe((response) => {
          this.invoiceData = response;
          this.invoiceData.date = new Date().getTime();
        });
      }
    });
    this.formValid = true;
  }

  public onStepSubmit(stepper: MatStepper) {
    stepper.next();
  }

  public onSave() {
    if (this.invoiceData.id == 0) {
      const createDto = new InvoiceCreateDto();

      createDto.date = this.invoiceData.date;
      createDto.title = this.invoiceData.title;
      createDto.filename = this.invoiceData.filename;
      createDto.creditor = this.invoiceData.creditor;
      createDto.debtor = this.invoiceData.debtor;
      createDto.items = this.invoiceData.items;
      createDto.payed = this.invoiceData.payed;

      this.apiService.createInvoice(createDto).subscribe();
    } else {
      this.apiService.updateInvoice(this.invoiceData).subscribe();
    }
  }
}
