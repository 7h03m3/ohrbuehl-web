import { ReservationFacilityType } from '../enums/reservation-facility-type.enum';
import { ReservationEventType } from '../enums/reservation-event-type.enum';

export class StringHelper {
  public static getReservationFacilityTypeString(type: ReservationFacilityType): string {
    switch (type) {
      case ReservationFacilityType.Distance300m:
        return '300m';
      case ReservationFacilityType.Distance100m:
        return '100m';
      case ReservationFacilityType.Distance50mElectronic:
        return '50m (elektronisch)';
      case ReservationFacilityType.Distance50mManuel:
        return '50m (manuell)';
      case ReservationFacilityType.Distance25mBlockManuel:
        return '25m (Block manuell)';
      case ReservationFacilityType.Distance25mBlockElectronic:
        return '25m (Block elektronisch)';
    }
  }

  public static getEventTypeString(type: ReservationEventType): string {
    switch (type) {
      case ReservationEventType.BU:
        return 'Bundesübung';
      case ReservationEventType.FS:
        return 'Feldschiessen';
      case ReservationEventType.JS:
        return 'Jungschützenkurs';
      case ReservationEventType.FU:
        return 'Freie Übung';
      case ReservationEventType.Event:
        return 'Anlass';
      case ReservationEventType.Other:
        return 'Anderes';
    }
  }
}
