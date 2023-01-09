import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventStaffPoolEntity } from '../entities/event-staff-pool.entity';
import { EventsService } from './events.service';
import { OrganizationMemberService } from '../organizations/organization-member.service';
import { EventStaffPoolDto } from '../../shared/dtos/event-staff-pool.dto';

@Injectable()
export class EventsStaffPoolService {
  constructor(
    @InjectRepository(EventStaffPoolEntity) private repository: Repository<EventStaffPoolEntity>,
    private eventService: EventsService,
    private memberService: OrganizationMemberService,
  ) {}

  public async findAllByOrganization(organizationId: number): Promise<EventStaffPoolEntity[]> {
    return this.repository.find({ where: { organizationId: organizationId } });
  }

  public async findAllByOrganizationAndEvent(organizationId: number, eventId: number): Promise<EventStaffPoolEntity[]> {
    return this.repository.find({
      where: { organizationId: organizationId, eventId: eventId },
      relations: {
        member: true,
      },
    });
  }

  public async addToPool(dto: EventStaffPoolDto): Promise<EventStaffPoolEntity> {
    const entryCount = await this.getEntryCount(dto.memberId, dto.eventId);
    if (entryCount != 0) {
      const errorMessage =
        'event staff pool entry with member id ' + dto.memberId + ' and event id ' + dto.eventId + ' does exist';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const event = await this.eventService.getById(dto.eventId);
    if (event == undefined) {
      const errorMessage = 'event with id ' + dto.eventId + ' does not exist';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const member = await this.memberService.getById(dto.memberId);
    if (member == undefined) {
      const errorMessage = 'organization member with id ' + dto.memberId + ' does not exist';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const entity = new EventStaffPoolEntity();
    entity.loadFromDto(dto);
    entity.member = member;
    entity.event = event;

    return this.repository.save(entity);
  }

  public async removeFromPool(memberId: number, eventId: number): Promise<any> {
    return await this.repository.delete({ memberId: memberId, eventId: eventId });
  }

  public async deleteByEventId(eventId: number): Promise<void> {
    await this.repository.delete({ eventId: eventId });
  }

  public async deleteByMemberId(memberId: number): Promise<void> {
    await this.repository.delete({ memberId: memberId });
  }

  private async getEntryCount(memberId: number, eventId: number) {
    return await this.repository.count({ where: { memberId: memberId, eventId: eventId } });
  }
}
