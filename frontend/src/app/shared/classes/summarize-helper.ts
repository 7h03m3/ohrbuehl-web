import { ShootingRangeAccountingUnitDto } from '../dtos/shooting-range-accounting-unit.dto';
import { SortHelper } from './sort-helper';

export class SummarizeHelper {
  public static summarizeShootingRangeAccounting(
    source: ShootingRangeAccountingUnitDto[],
  ): ShootingRangeAccountingUnitDto[] {
    const resultArray = new Array<ShootingRangeAccountingUnitDto>();

    source.forEach((item) => {
      const existingItem = resultArray.find((searchItem: ShootingRangeAccountingUnitDto) => {
        return (
          searchItem.organization.id == item.organization.id &&
          searchItem.price.id == item.price.id &&
          searchItem.comment == item.comment
        );
      });

      if (existingItem != undefined) {
        existingItem.amount = existingItem.amount + item.amount;
      } else {
        const newItem = structuredClone(item);
        newItem.track = 0;
        resultArray.push(newItem);
      }
    });

    SortHelper.sortAccountingUnitsByOrganization(resultArray);

    return resultArray;
  }
}
