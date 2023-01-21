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
  Request,
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
import { UsersService } from '../../database/users/users.service';
import { AuthService } from '../../auth/auth.service';
import { EventCategoryEntity } from '../../database/entities/event-category.entity';
import { OrganizationMemberService } from '../../database/organizations/organization-member.service';
import { EventOrganizationStaffReportPdfService } from '../../pdf/events/event-organization-staff-report-pdf/event-organization-staff-report-pdf.service';

@Controller('events/')
export class EventsController {
  constructor(
    private readonly eventService: EventsService,
    private readonly shiftService: EventsShiftService,
    private readonly eventStaffPoolService: EventsStaffPoolService,
    private readonly organizationService: OrganizationsService,
    private readonly organizationMemberService: OrganizationMemberService,
    private readonly eventReportPdfService: EventReportPdfService,
    private readonly eventOrganizationReportPdfService: EventOrganizationReportPdfService,
    private readonly eventOrganizationStaffReportPdfService: EventOrganizationStaffReportPdfService,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
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
  async getAllWithShiftsByOrganizationId(
    @Param('organizationId') organizationId: number,
    @Request() req: any,
  ): Promise<EventEntity[]> {
    await this.authService.checkOrganizationAccess(organizationId, req);
    const eventList = await this.eventService.findAllWithShifts();

    this.filterShiftsByOrganization(eventList, organizationId);

    return eventList;
  }

  @Roles(Role.Admin, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('withShiftsByCategoryId/:categoryId')
  async getAllWithShiftsByCategoryId(
    @Param('categoryId') categoryId: number,
    @Request() req: any,
  ): Promise<EventEntity[]> {
    return await this.eventService.findAllWithShiftsByCategoryId(categoryId);
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

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('report/organization/:organizationId')
  async downloadOrganizationReport(
    @Param('organizationId') organizationId: number,
    @Res() response,
    @Request() req: any,
  ): Promise<any> {
    await this.authService.checkOrganizationAccess(organizationId, req);

    const eventList = await this.eventService.findAll();
    if (eventList.length == 0) {
      const errorMessage = 'no events found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    await this.generateOrganizationReport(organizationId, eventList, undefined, response);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('report/organization/:organizationId/:categoryId')
  async downloadOrganizationReportByCategory(
    @Param('organizationId') organizationId: number,
    @Param('categoryId') categoryId: number,
    @Res() response,
    @Request() req: any,
  ): Promise<any> {
    await this.authService.checkOrganizationAccess(organizationId, req);

    const eventList = await this.eventService.findAllByCategory(categoryId);
    if (eventList.length == 0) {
      const errorMessage = 'no events found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    await this.generateOrganizationReport(organizationId, eventList, eventList[0].category, response);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('report/organization-staff/:organizationId')
  async downloadOrganizationStaffReport(
    @Param('organizationId') organizationId: number,
    @Res() response,
    @Request() req: any,
  ): Promise<any> {
    await this.authService.checkOrganizationAccess(organizationId, req);

    const staffList = await this.organizationMemberService.findAllDetailedByOrganizationId(organizationId);
    if (staffList.length == 0) {
      const errorMessage = 'no staff list found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    for (const staff of staffList) {
      if (staff.eventShifts.length != 0) {
        staff.eventShifts = await this.shiftService.findByOrganizationMemberId(staff.id);
        this.sortHelper.sortShiftByDate(staff.eventShifts);
      }
    }
    await this.eventOrganizationStaffReportPdfService.generatePdf(staffList[0].organization, staffList, response);
  }

  private async generateOrganizationReport(
    organizationId: number,
    eventList: EventEntity[],
    category: EventCategoryEntity | undefined,
    @Res() response,
  ) {
    this.sortHelper.sortEventsByDate(eventList);

    const organization = await this.organizationService.findOne(organizationId);

    if (organization == undefined) {
      const errorMessage = 'organization with id ' + organizationId + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

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
      category,
      response,
    );
  }

  private filterShiftsByOrganization(eventList: EventEntity[], organizationId: number) {
    eventList.forEach((event) => {
      event.shifts = event.shifts.filter((shift) => {
        return shift.organizationId == organizationId;
      });
    });

    const originList = Array.from(eventList);
    originList.forEach((event) => {
      if (event.shifts.length == 0) {
        const index = eventList.indexOf(event);
        eventList.splice(index, 1);
      }
    });
  }
}
