import { ReservationFacilityType } from '../../../../shared/enums/reservation-facility-type.enum';

export class BusinessHourFacilityTypeSelectionItem {
  public name = '';
  public full = false;
  public type: ReservationFacilityType = ReservationFacilityType.Distance25mBlockManuel;
  public count = 0;
  public max = 0;
}
