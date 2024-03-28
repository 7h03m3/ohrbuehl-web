import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
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
import { DateHelper } from '../../shared/classes/date-helper';

@Injectable()
export class EventsShiftService {
  constructor(
    @InjectRepository(EventShiftEntity) private shiftRepository: Repository<EventShiftEntity>,
    private categoryService: EventsShiftCategoryService,
    private eventService: EventsService,
    private organizationService: OrganizationsService,
    private memberService: OrganizationMemberService,
  ) {}

  public getById(id: number): Promise<EventShiftEntity> {
    return this.shiftRepository.findOne({ where: { id: id } });
  }

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

  public findByOrganizationId(organizationId: number): Promise<EventShiftEntity[]> {
    return this.shiftRepository.find({
      where: { organizationId: organizationId },
      order: { start: 'DESC' },
      relations: {
        category: true,
        organization: true,
        assignedStaff: true,
      },
    });
  }

  public findByOrganizationMemberId(organizationMemberId: number, year: number): Promise<EventShiftEntity[]> {
    const timeStart = DateHelper.getYearStart(year).getTime();
    const timeEnd = DateHelper.getYearEnd(year).getTime();

    return this.shiftRepository.find({
      where: { assignedStaffId: organizationMemberId, start: Between(timeStart, timeEnd) },
      order: { start: 'DESC' },
      relations: {
        event: true,
        category: true,
        organization: true,
        assignedStaff: true,
      },
    });
  }

  public findByEventIdAndOrganizationId(eventId: number, organizationId: number): Promise<EventShiftEntity[]> {
    return this.shiftRepository.find({
      where: { eventId: eventId, organizationId: organizationId },
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

  public async updateAssignedStaff(dto: EventShiftDto): Promise<any> {
    if (dto.assignedStaffId != undefined || dto.assignedStaffId != 0) {
      await this.clearExistingAssignment(dto.assignedStaffId, dto.eventId);
    }

    const queryBuilder = this.shiftRepository
      .createQueryBuilder()
      .update(EventShiftEntity)
      .where('id = :id', { id: dto.id });

    if (dto.assignedStaffId != undefined && dto.assignedStaffId != 0) {
      queryBuilder.set({ assignedStaffId: dto.assignedStaffId });
    } else {
      queryBuilder.set({ assignedStaffId: null, assignedStaff: null });
    }

    return await queryBuilder.execute();
  }

  public async delete(id: string): Promise<void> {
    await this.shiftRepository.delete(id);
  }

  public async clearAllAssignments(memberId: number): Promise<void> {
    await this.shiftRepository
      .createQueryBuilder()
      .update(EventShiftEntity)
      .set({ assignedStaff: null, assignedStaffId: null, done: false, locked: false, present: false })
      .where('assignedStaffId = :memberId', { memberId: memberId })
      .execute();
  }

  public async clearAllAssignmentsByEventId(staffId: number, eventId: number): Promise<void> {
    await this.shiftRepository
      .createQueryBuilder()
      .update(EventShiftEntity)
      .set({ assignedStaff: null, assignedStaffId: null, done: false, locked: false, present: false })
      .where('assignedStaffId = :staffId', { staffId: staffId })
      .andWhere('eventId = :eventId', { eventId: eventId })
      .execute();
  }

  public async countAssignmentsByEventId(staffId: number, eventId: number) {
    return await this.shiftRepository.count({ where: { eventId: eventId, assignedStaffId: staffId } });
  }

  public async deleteByEventId(id: number): Promise<void> {
    await this.shiftRepository.delete({ eventId: id });
  }

  private async checkIfLockedOrDoneByEventId(staffId: number, eventId: number) {
    const lockCount = await this.getLockedCount(staffId, eventId);
    const doneCount = await this.getDoneCount(staffId, eventId);

    if (lockCount != 0 || doneCount != 0) {
      const errorMessage = "it's not allowed, because shift entry is locked/done";
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  private async getLockedCount(staffId: number, eventId: number): Promise<number> {
    return await this.shiftRepository.count({
      where: {
        assignedStaffId: staffId,
        eventId: eventId,
        locked: true,
      },
    });
  }

  private async getDoneCount(staffId: number, eventId: number): Promise<number> {
    return await this.shiftRepository.count({
      where: {
        assignedStaffId: staffId,
        eventId: eventId,
        done: true,
      },
    });
  }

  private async clearExistingAssignment(staffId: number, eventId: number) {
    const assignmentCount = await this.countAssignmentsByEventId(staffId, eventId);

    if (assignmentCount > 0) {
      await this.checkIfLockedOrDoneByEventId(staffId, eventId);
      await this.clearAllAssignmentsByEventId(staffId, eventId);
    }
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
