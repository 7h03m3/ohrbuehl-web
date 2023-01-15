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

@Controller('events/')
export class EventsController {
  constructor(
    private readonly eventService: EventsService,
    private readonly shiftService: EventsShiftService,
    private readonly eventStaffPoolService: EventsStaffPoolService,
    private readonly eventReportPdfService: EventReportPdfService,
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

    eventData.shifts.sort((a, b) => {
      if (a.category.position > b.category.position) {
        return 1;
      }

      if (a.category.position < b.category.position) {
        return -1;
      }

      if (a.start > b.start) {
        return 1;
      }

      if (a.start < b.start) {
        return -1;
      }

      if (a.organizationId > b.organizationId) {
        return 1;
      }

      if (a.organizationId < b.organizationId) {
        return -1;
      }

      return 0;
    });

    await this.eventReportPdfService.generatePdf(eventData, response);
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
