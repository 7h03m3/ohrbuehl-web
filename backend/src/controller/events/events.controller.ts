import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
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
import { AuthService } from '../../auth/auth.service';

@Controller('events/')
export class EventsController {
  constructor(
    private readonly eventService: EventsService,
    private readonly shiftService: EventsShiftService,
    private readonly eventStaffPoolService: EventsStaffPoolService,
    private readonly authService: AuthService,
  ) {}

  @Get('public/:startDate')
  async getAllPublic(@Param('startDate') startDate: number): Promise<EventEntity[]> {
    return await this.eventService.findAllPublic(startDate);
  }

  @Get('public/:startDate/:categoryId')
  async getAllPublicByCategory(
    @Param('startDate') startDate: number,
    @Param('categoryId') categoryId: number,
  ): Promise<EventEntity[]> {
    return await this.eventService.findAllPublicByCategory(startDate, categoryId);
  }

  @Roles(Role.Admin, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('byYear/:year')
  async getAllOfYear(@Param('year') year: number): Promise<EventEntity[]> {
    return await this.eventService.findAllByYear(year);
  }

  @Roles(Role.Admin, Role.EventOrganizer, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('byId/:id')
  getById(@Param('id') id: number): Promise<EventEntity> {
    return this.eventService.getById(id);
  }

  @Roles(Role.Admin, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('withShifts/:year')
  async getAllWithShifts(@Param('year') year: number): Promise<EventEntity[]> {
    return await this.eventService.findAllWithShifts(year);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('withShiftsByOrganization/:organizationId/:year')
  async getAllWithShiftsByOrganizationId(
    @Param('organizationId') organizationId: number,
    @Param('year') year: number,
    @Request() req: any,
  ): Promise<EventEntity[]> {
    await this.authService.checkOrganizationAccess(organizationId, req);
    const eventList = await this.eventService.findAllWithShifts(year);

    this.filterShiftsByOrganization(eventList, organizationId);

    return eventList;
  }

  @Roles(Role.Admin, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('withShiftsByCategoryId/:categoryId/:year')
  async getAllWithShiftsByCategoryId(
    @Param('categoryId') categoryId: number,
    @Param('year') year: number,
  ): Promise<EventEntity[]> {
    return await this.eventService.findAllWithShiftsByCategoryId(categoryId, year);
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
