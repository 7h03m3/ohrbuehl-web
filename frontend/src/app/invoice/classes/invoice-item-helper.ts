import { SummarizeHelper } from '../../shared/classes/summarize-helper';
import { InvoiceItemDto } from '../../shared/dtos/invoice-item.dto';
import { ShootingRangeAccountingUnitDto } from '../../shared/dtos/shooting-range-accounting-unit.dto';

export class InvoiceItemHelper {
  public static addAccountingUnitsByOrganization(
    organizationId: number,
    unitList: ShootingRangeAccountingUnitDto[],
    itemList: InvoiceItemDto[],
  ) {
    const summarizedUnitList = SummarizeHelper.summarizeShootingRangeAccounting(unitList);

    summarizedUnitList.forEach((item) => {
      if (item.organization.id == organizationId) {
        const invoiceItem = new InvoiceItemDto();
        let description = 'Schussgeld (Preiskategorie: ' + item.price.name + ')';
        if (item.comment != '') {
          description += ': ' + item.comment;
        }
        invoiceItem.description = description;
        invoiceItem.price = item.price.price;
        invoiceItem.amount = item.amount;
        invoiceItem.position = itemList.length + 1;
        itemList.push(invoiceItem);
      }
    });
  }
}
