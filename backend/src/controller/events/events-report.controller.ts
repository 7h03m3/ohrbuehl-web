import { Controller, Get, HttpException, HttpStatus, Param, Request, Res, UseGuards } from '@nestjs/common';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { EventOrganizationStaffReportPdfService } from '../../pdf/events/event-organization-staff-report-pdf/event-organization-staff-report-pdf.service';
import { OrganizationMemberService } from '../../database/organizations/organization-member.service';
import { AuthService } from '../../auth/auth.service';
import { SortHelper } from '../../shared/classes/sort-helper';
import { EventsService } from '../../database/events/events.service';
import { EventsShiftService } from '../../database/events/events-shift.service';
import { EventEntity } from '../../database/entities/event.entity';
import { EventCategoryEntity } from '../../database/entities/event-category.entity';
import { OrganizationMemberEntity } from '../../database/entities/organization-member.entity';
import { EventOrganizationReportPdfService } from '../../pdf/events/event-organization-report-pdf/event-organization-report-pdf.service';
import { OrganizationsService } from '../../database/organizations/organizations.service';
import { EventsStaffPoolService } from '../../database/events/events-staff-pool.service';
import { EventReportPdfService } from '../../pdf/events/event-report-pdf/event-report-pdf.service';

@Controller('events/report')
export class EventsReportController {
  constructor(
    private readonly eventService: EventsService,
    private readonly eventOrganizationStaffReportPdfService: EventOrganizationStaffReportPdfService,
    private readonly shiftService: EventsShiftService,
    private readonly organizationMemberService: OrganizationMemberService,
    private readonly authService: AuthService,
    private readonly eventOrganizationReportPdfService: EventOrganizationReportPdfService,
    private readonly organizationService: OrganizationsService,
    private readonly eventStaffPoolService: EventsStaffPoolService,
    private readonly eventReportPdfService: EventReportPdfService,
    private sortHelper: SortHelper,
  ) {}

  @Roles(Role.Admin, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get(':id')
  async downloadReport(@Param('id') id: number, @Res() response: any): Promise<any> {
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
  @Get('organization/shifts/table/:organizationId/:year')
  async downloadOrganizationReport(
    @Param('organizationId') organizationId: number,
    @Param('year') year: number,
    @Res() response: any,
    @Request() req: any,
  ): Promise<any> {
    await this.authService.checkOrganizationAccess(organizationId, req);

    const eventList = await this.eventService.findAllShiftsEnabledByYear(year);
    if (eventList.length == 0) {
      const errorMessage = 'no events found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    await this.generateOrganizationReport(organizationId, eventList, undefined, response);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('organization/shifts/table/:organizationId/:year/:categoryId')
  async downloadOrganizationReportByCategory(
    @Param('organizationId') organizationId: number,
    @Param('categoryId') categoryId: number,
    @Param('year') year: number,
    @Res() response: any,
    @Request() req: any,
  ): Promise<any> {
    await this.authService.checkOrganizationAccess(organizationId, req);

    const eventList = await this.eventService.findAllShiftsEnabledByCategory(categoryId, year);
    if (eventList.length == 0) {
      const errorMessage = 'no events found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    await this.generateOrganizationReport(organizationId, eventList, eventList[0].category, response);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('organization/shifts/list/:organizationId/:year')
  async downloadOrganizationStaffReport(
    @Param('organizationId') organizationId: number,
    @Param('year') year: number,
    @Res() response: any,
    @Request() req: any,
  ): Promise<any> {
    await this.authService.checkOrganizationAccess(organizationId, req);

    const staffList = await this.organizationMemberService.findAllDetailedByOrganizationId(organizationId, year);
    if (staffList.length == 0) {
      const errorMessage = 'no staff list found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    for (const staff of staffList) {
      if (staff.eventShifts.length != 0) {
        staff.eventShifts = await this.shiftService.findByOrganizationMemberId(staff.id, year);
        this.sortHelper.sortShiftByDate(staff.eventShifts);
      }
    }

    await this.eventOrganizationStaffReportPdfService.generatePdf(staffList[0].organization, staffList, response);
  }

  private async generateOrganizationReport(
    organizationId: number,
    eventList: EventEntity[],
    category: EventCategoryEntity | undefined,
    @Res() response: any,
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
}
