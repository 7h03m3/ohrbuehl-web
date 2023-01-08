import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventsService } from '../../database/events/events.service';

import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { EventCreateDto } from '../../shared/dtos/event-create.dto';
import { EventEntity } from '../../database/entities/event.entity';
import { EventDto } from '../../shared/dtos/event.dto';
import { EventsShiftService } from '../../database/events/events-shift.service';
import { EventsMemberPoolService } from '../../database/events/events-member-pool.service';
import { EventStaffPoolEntity } from '../../database/entities/event-staff-pool.entity';

@Controller('events/')
export class EventsController {
  constructor(
    private readonly eventService: EventsService,
    private readonly shiftService: EventsShiftService,
    private eventMemberPoolService: EventsMemberPoolService,
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
    await this.eventMemberPoolService.deleteByEventId(id);
    return this.eventService.delete(id);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post('/staff-pool/:eventId/:memberId')
  async addToStaffPool(
    @Param('eventId') eventId: number,
    @Param('memberId') memberId: number,
  ): Promise<EventStaffPoolEntity> {
    return await this.eventMemberPoolService.addToPool(memberId, eventId);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete('/staff-pool/:eventId/:memberId')
  async removeFromStaffPool(@Param('eventId') eventId: number, @Param('memberId') memberId: number): Promise<any> {
    return await this.eventMemberPoolService.removeFromPool(memberId, eventId);
  }

  private filterShiftsByOrganization(eventList: EventEntity[], organizationId: number) {
    eventList.forEach((event) => {
      event.shifts = event.shifts.filter((shift) => {
        return shift.organizationId == organizationId;
      });
    });
  }
}
