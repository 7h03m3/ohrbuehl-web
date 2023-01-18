import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from '../../database/events/events.service';

import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { EventCreateDto } from '../../shared/dtos/event-create.dto';
import { EventEntity } from '../../database/entities/event.entity';
import { EventDto } from '../../shared/dtos/event.dto';
import { EventsShiftService } from '../../database/events/events-shift.service';
import { EventsStaffPoolService } from '../../database/events/events-staff-pool.service';
import { EventReportPdfService } from '../../pdf/events/event-report-pdf/event-report-pdf.service';
import { EventOrganizationReportPdfService } from '../../pdf/events/event-organization-report-pdf/event-organization-report-pdf.service';
import { OrganizationsService } from '../../database/organizations/organizations.service';
import { OrganizationMemberEntity } from '../../database/entities/organization-member.entity';
import { SortHelper } from '../../shared/classes/sort-helper';

@Controller('events/')
export class EventsController {
  constructor(
    private readonly eventService: EventsService,
    private readonly shiftService: EventsShiftService,
    private readonly eventStaffPoolService: EventsStaffPoolService,
    private readonly organizationService: OrganizationsService,
    private readonly eventReportPdfService: EventReportPdfService,
    private readonly eventOrganizationReportPdfService: EventOrganizationReportPdfService,
    private sortHelper: SortHelper,
  ) {}

  @Get()
  async getAll(): Promise<EventEntity[]> {
    return await this.eventService.findAll();
  }

  @Get('byId/:id')
  getById(@Param('id') id: number): Promise<EventEntity> {
    return this.eventService.getById(id);
  }

  @Roles(Role.Admin, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('withShifts')
  async getAllWithShifts(): Promise<EventEntity[]> {
    return await this.eventService.findAllWithShifts();
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('withShiftsByOrganization/:organizationId')
  async getAllWithShiftsByOrganizationId(@Param('organizationId') organizationId: number): Promise<EventEntity[]> {
    const eventList = await this.eventService.findAllWithShifts();

    this.filterShiftsByOrganization(eventList, organizationId);

    return eventList;
  }

  @Roles(Role.Admin, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async create(@Body() dto: EventCreateDto): Promise<EventEntity> {
    return await this.eventService.create(dto);
  }

  @Roles(Role.Admin, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() dto: EventDto): Promise<EventEntity> {
    return this.eventService.update(dto);
  }

  @Roles(Role.Admin, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    await this.shiftService.deleteByEventId(id);
    await this.eventStaffPoolService.deleteByEventId(id);
    return this.eventService.delete(id);
  }

  @Roles(Role.Admin, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('report/:id')
  async downloadReport(@Param('id') id: number, @Res() response): Promise<any> {
    const eventData: EventEntity = await this.eventService.getByIdDetailed(id);
    if (!eventData) {
      const errorMessage = 'event with id ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    eventData.shifts = await this.shiftService.findByEventId(eventData.id);

    this.sortHelper.sortShiftList(eventData.shifts);

    await this.eventReportPdfService.generatePdf(eventData, response);
  }

  @Roles(Role.Admin, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('report/organization/:organizationId')
  async downloadOrganizationReport(@Param('organizationId') organizationId: number, @Res() response): Promise<any> {
    const organization = await this.organizationService.findOne(organizationId);

    if (organization == undefined) {
      const errorMessage = 'organization with id ' + organizationId + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const eventList = await this.eventService.findAll();
    if (eventList.length == 0) {
      const errorMessage = 'no events found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    this.sortHelper.sortEventsByDate(eventList);

    const staffPool = await this.eventStaffPoolService.findAllByOrganization(organizationId);
    const shiftList = await this.shiftService.findByOrganizationId(organizationId);

    const memberMap = new Map<number, OrganizationMemberEntity>();

    shiftList.forEach((shift) => {
      if (shift.assignedStaff != undefined) {
        memberMap.set(shift.assignedStaff.id, shift.assignedStaff);
      }
    });

    staffPool.forEach((poolEntry) => {
      memberMap.set(poolEntry.memberId, poolEntry.member);
    });

    const userList = Array.from(memberMap.values());
    this.sortHelper.sortOrganizationMemberByName(userList);

    await this.eventOrganizationReportPdfService.generatePdf(
      organization,
      userList,
      eventList,
      shiftList,
      staffPool,
      response,
    );
  }

  private filterShiftsByOrganization(eventList: EventEntity[], organizationId: number) {
    eventList.forEach((event) => {
      event.shifts = event.shifts.filter((shift) => {
        return shift.organizationId == organizationId;
      });
    });

    eventList.forEach((event, index, list) => {
      if (event.shifts.length == 0) {
        list.splice(index, 1);
      }
    });
  }
}
