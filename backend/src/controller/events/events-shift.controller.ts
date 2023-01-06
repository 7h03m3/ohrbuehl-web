import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { EventsShiftService } from '../../database/events/events-shift.service';
import { EventShiftEntity } from '../../database/entities/event-shift.entity';
import { EventShiftCreateDto } from '../../shared/dtos/event-shift-create.dto';
import { EventShiftDto } from '../../shared/dtos/event-shift.dto';

@Controller('events/shift')
export class EventsShiftController {
  constructor(private shiftService: EventsShiftService) {}

  @Roles(Role.Admin, Role.EventOrganizer, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get(':eventId')
  getAll(@Param('eventId') eventId: number): Promise<EventShiftEntity[]> {
    return this.shiftService.findByEventId(eventId);
  }

  @Roles(Role.Admin, Role.EventOrganizer, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async create(@Body() dto: EventShiftCreateDto): Promise<EventShiftEntity> {
    return this.shiftService.create(dto);
  }

  @Roles(Role.Admin, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() dto: EventShiftDto): Promise<EventShiftEntity> {
    return this.shiftService.update(dto);
  }

  @Roles(Role.Admin, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.shiftService.delete(id);
  }
}
