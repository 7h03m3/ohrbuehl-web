import { EventShiftCategoryDto } from './event-shift-category.dto';
import { EventDto } from './event.dto';
import { OrganizationDto } from './organization.dto';
import { OrganizationMemberDto } from './organization-member.dto';

export class EventShiftCreateDto {
  start: number;
  end: number;
  category: EventShiftCategoryDto;
  categoryId: number;
  event: EventDto;
  eventId: number;
  organization: OrganizationDto;
  organizationId: number;
  assignedStaff: OrganizationMemberDto;
  assignedStaffId: number;

  constructor() {
    this.start = Date.now();
    this.end = Date.now();
    this.category = new EventShiftCategoryDto();
    this.categoryId = 0;
    this.event = new EventDto();
    this.eventId = 0;
    this.organization = new OrganizationDto();
    this.organizationId = 0;
    this.assignedStaff = new OrganizationMemberDto();
    this.assignedStaffId = 0;
  }
}
