import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventStaffPoolEntity } from '../entities/event-staff-pool.entity';
import { EventsService } from './events.service';
import { OrganizationMemberService } from '../organizations/organization-member.service';

@Injectable()
export class EventsMemberPoolService {
  constructor(
    @InjectRepository(EventStaffPoolEntity) private repository: Repository<EventStaffPoolEntity>,
    private eventService: EventsService,
    private memberService: OrganizationMemberService,
  ) {}

  public async addToPool(memberId: number, eventId: number): Promise<EventStaffPoolEntity> {
    const entryCount = await this.getEntryCount(memberId, eventId);
    if (entryCount != 0) {
      const errorMessage =
        'event staff pool entry with member id ' + memberId + ' and event id ' + eventId + ' does exist';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const event = await this.eventService.getById(eventId);
    if (event == undefined) {
      const errorMessage = 'event with id ' + eventId + ' does not exist';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const member = await this.memberService.getById(memberId);
    if (member == undefined) {
      const errorMessage = 'organization member with id ' + memberId + ' does not exist';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const entity = new EventStaffPoolEntity();
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
