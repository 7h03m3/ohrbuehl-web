import { InvoiceDto } from '../../shared/dtos/invoice.dto';

export class InvoiceTemplates {
  public getEmpty(): InvoiceDto {
    const invoiceData = new InvoiceDto();

    invoiceData.date = new Date().getTime();

    invoiceData.creditor.name = 'Schützenverband Ohrbühl Winterthur';
    invoiceData.creditor.address = 'Seenerstrasse';
    invoiceData.creditor.buildingNumber = '139';
    invoiceData.creditor.city = 'Winterthur';
    invoiceData.creditor.zip = 8404;
    invoiceData.creditor.account = 'CH5000784297813352001';

    return invoiceData;
  }
}
