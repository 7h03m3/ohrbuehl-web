import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventShiftEntity } from '../entities/event-shift.entity';
import { EventsShiftCategoryService } from './events-shift-category.service';
import { EventShiftCreateDto } from '../../shared/dtos/event-shift-create.dto';
import { EventShiftDto } from '../../shared/dtos/event-shift.dto';
import { EventShiftCategoryEntity } from '../entities/event-shift-category.entity';
import { EventsService } from './events.service';
import { EventEntity } from '../entities/event.entity';
import { OrganizationsService } from '../organizations/organizations.service';
import { OrganizationEntity } from '../entities/organization.entity';
import { OrganizationMemberService } from '../organizations/organization-member.service';
import { OrganizationMemberEntity } from '../entities/organization-member.entity';

@Injectable()
export class EventsShiftService {
  constructor(
    @InjectRepository(EventShiftEntity) private shiftRepository: Repository<EventShiftEntity>,
    private categoryService: EventsShiftCategoryService,
    private eventService: EventsService,
    private organizationService: OrganizationsService,
    private memberService: OrganizationMemberService,
  ) {}

  public findByEventId(eventId: number): Promise<EventShiftEntity[]> {
    return this.shiftRepository.find({
      where: { eventId: eventId },
      order: { start: 'DESC' },
      relations: {
        category: true,
        organization: true,
        assignedStaff: true,
      },
    });
  }

  public async create(createDto: EventShiftCreateDto): Promise<EventShiftEntity> {
    const category = await this.getCategory(createDto.categoryId);
    const event = await this.getEvent(createDto.eventId);
    const organization = await this.getOrganization(createDto.organizationId);
    const member = await this.getMember(createDto.assignedStaffId);

    const entity = new EventShiftEntity();
    entity.loadFromCreateDto(createDto);
    entity.category = category;
    entity.event = event;
    entity.organization = organization;
    entity.assignedStaff = member;

    await this.shiftRepository.save(entity);

    return entity;
  }

  public async update(dto: EventShiftDto): Promise<EventShiftEntity> {
    const category = await this.getCategory(dto.categoryId);
    const event = await this.getEvent(dto.eventId);
    const organization = await this.getOrganization(dto.organizationId);
    const staff = await this.getMember(dto.assignedStaffId);

    const entity = new EventShiftEntity();
    entity.loadFromDto(dto);
    entity.category = category;
    entity.event = event;
    entity.organization = organization;
    entity.assignedStaff = staff;

    await this.shiftRepository.update({ id: entity.id }, entity);

    return entity;
  }

  public async delete(id: string): Promise<void> {
    await this.shiftRepository.delete(id);
  }

  public async deleteByEventId(id: number): Promise<void> {
    await this.shiftRepository.delete({ eventId: id });
  }

  private async getCategory(id: number): Promise<EventShiftCategoryEntity> {
    const category = await this.categoryService.getById(id);

    if (category == null) {
      const errorMessage = 'event shift category with id ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return category;
  }

  private async getEvent(id: number): Promise<EventEntity> {
    const event = await this.eventService.getById(id);

    if (event == null) {
      const errorMessage = 'event with id ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return event;
  }

  private async getOrganization(id: number): Promise<OrganizationEntity> {
    if (id == null || id == 0) {
      return null;
    }

    return await this.organizationService.findOne(id);
  }

  private async getMember(id: number): Promise<OrganizationMemberEntity> {
    if (id == null || id == 0) {
      return null;
    }

    return await this.memberService.getById(id);
  }
}
