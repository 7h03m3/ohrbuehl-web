import { EventDto } from './event.dto';
import { OrganizationMemberDto } from './organization-member.dto';

export class EventStaffPoolDto {
  id: number;
  event: EventDto;
  eventId: number;
  member: OrganizationMemberDto;
  memberId: number;
  organizationId: number;

  constructor() {
    this.id = 0;
    this.event = new EventDto();
    this.eventId = 0;
    this.member = new OrganizationMemberDto();
    this.memberId = 0;
    this.organizationId = 0;
  }
}
