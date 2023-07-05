import { ReservationFacilityType } from '../../shared/enums/reservation-facility-type.enum';
import { ReservationEventType } from '../../shared/enums/reservation-event-type.enum';
import { UserDto } from './user.dto';
import { OrganizationDto } from './organization.dto';
import { BusinessHoursDto } from './business-hours.dto';

export class BusinessHourReservationDto {
  id: number;
  owner: UserDto;
  ownerId: number;
  organization: OrganizationDto;
  organizationId: number;
  businessHour: BusinessHoursDto;
  businessHourId: number;
  facilityType: ReservationFacilityType;
  eventType: ReservationEventType;
  count: number;
  comment: string;
  locked: boolean;

  constructor() {
    this.id = 0;
    this.owner = new UserDto();
    this.ownerId = 0;
    this.organization = new OrganizationDto();
    this.organizationId = 0;
    this.businessHour = new BusinessHoursDto();
    this.businessHourId = 0;
    this.facilityType = ReservationFacilityType.Distance25mBlockManuel;
    this.eventType = ReservationEventType.Other;
    this.count = 0;
    this.comment = '';
    this.locked = true;
  }
}
