import { Controller, Get, Res } from "@nestjs/common";
import { InvoiceService } from "../../invoice/invoice.service";
import { InvoiceDto } from "../../shared/dtos/invoice.dto";
import { InvoiceItemDto } from "../../shared/dtos/invoice-item.dto";
import { InvoiceDebtorDto } from "../../shared/dtos/invoice-debtor.dto";

@Controller("invoice")
export class InvoiceController {

  constructor(private invoiceService: InvoiceService) {
  }

  @Get()
  async getInvoice(@Res() response) {
    let invoiceData: InvoiceDto = new InvoiceDto();

    invoiceData.date = 1667170800 * 1000;
    invoiceData.title = "Testrechnung Thomas";
    invoiceData.filename = "testrechnung.pdf";

    invoiceData.debtor = new InvoiceDebtorDto();
    invoiceData.debtor.name = "Thomas Stanger";
    invoiceData.debtor.address = "Schlossmühlestrasse";
    invoiceData.debtor.buildingNumber = "64";
    invoiceData.debtor.city = "Winterthur";
    invoiceData.debtor.zip = 8408;

    invoiceData.creditor.name = "Schützenverband Ohrbühl";
    invoiceData.creditor.address = "Seenerstrasse";
    invoiceData.creditor.buildingNumber = "139";
    invoiceData.creditor.city = "Winterthur";
    invoiceData.creditor.zip = 8404;
    invoiceData.creditor.account = "CH8109000000907847005"; // Thomas

    let item: InvoiceItemDto = new InvoiceItemDto();
    item.amount = 2;
    item.description = "Implementierung Webseite (h)";
    item.price = 510.25;
    item.position = 1;
    invoiceData.items.push(item);

    let item2: InvoiceItemDto = new InvoiceItemDto();
    item2.amount = 1;
    item2.description = "Mittagessen";
    item2.price = 31.20;
    item2.position = 2;
    invoiceData.items.push(item2);

    await this.invoiceService.generateDummy(invoiceData, response);
  }
}
