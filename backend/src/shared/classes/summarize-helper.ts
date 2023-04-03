import { SortHelper } from './sort-helper';
import { ShootingRangeAccountingUnitEntity } from '../../database/entities/shooting-range-accounting-unit.entity';

export class SummarizeHelper {
  public static summarizeShootingRangeAccounting(
    source: ShootingRangeAccountingUnitEntity[],
  ): ShootingRangeAccountingUnitEntity[] {
    const resultArray = new Array<ShootingRangeAccountingUnitEntity>();

    source.forEach((item) => {
      if (item.organization.id != 0 && item.price.id != 0) {
        const existingItem = resultArray.find((searchItem: ShootingRangeAccountingUnitEntity) => {
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
      }
    });

    SortHelper.sortAccountingUnitsByOrganization(resultArray);

    return resultArray;
  }
}
