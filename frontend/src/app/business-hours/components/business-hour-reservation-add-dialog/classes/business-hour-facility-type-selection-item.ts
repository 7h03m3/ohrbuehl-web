import { ReservationFacilityType } from '../../../../shared/enums/reservation-facility-type.enum';

export class BusinessHourFacilityTypeSelectionItem {
  public label: string;
  public disabled: boolean;
  public type: ReservationFacilityType;

  constructor() {
    this.label = '';
    this.disabled = false;
    this.type = ReservationFacilityType.Distance25mBlockManuel;
  }
}
