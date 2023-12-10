import { SortHelper } from './sort-helper';
import { ShootingRangeAccountingUnitEntity } from '../../database/entities/shooting-range-accounting-unit.entity';
import { BusinessHourReservationEntity } from '../../database/entities/business-hour-reservation.entity';
import { ReservationFacilityType } from '../enums/reservation-facility-type.enum';

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

  public static summarizeShootingRangeDaysAccounting(source: ShootingRangeAccountingUnitEntity[]) {
    const resultArray = new Array<ShootingRangeAccountingUnitEntity>();

    const sortedData = source.sort((a, b) => {
      const accountingA = a.accountingEntry;
      const accountingB = b.accountingEntry;
      if (accountingA.start > accountingB.start) {
        return -1;
      }

      if (accountingA.start < accountingB.start) {
        return 1;
      }
      return 0;
    });

    let currentPriceId = 0;
    let currentComment = '';
    let currentStart = 0;
    for (const current of sortedData) {
      if (
        currentStart != current.accountingEntry.start ||
        current.price.id != currentPriceId ||
        current.comment != currentComment
      ) {
        currentPriceId = current.price.id;
        currentComment = current.comment;
        currentStart = current.accountingEntry.start;
        resultArray.push(current);
      } else {
        resultArray.at(-1).amount += current.amount;
      }
    }

    return resultArray;
  }

  public static summarizeBusinessHoursReservation(source: BusinessHourReservationEntity[]) {
    const resultArray = new Map<ReservationFacilityType, BusinessHourReservationEntity>();

    source.forEach((current) => {
      const existingEntry = resultArray.get(current.facilityType);

      if (existingEntry == undefined) {
        const newEntry = new BusinessHourReservationEntity();
        newEntry.facilityType = current.facilityType;
        newEntry.count = current.count;
        resultArray.set(current.facilityType, newEntry);
      } else {
        existingEntry.count += current.count;
        resultArray.set(current.facilityType, existingEntry);
      }
    });

    return resultArray;
  }
}
