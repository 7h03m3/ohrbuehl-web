import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { EventStaffPoolEntity } from '../../database/entities/event-staff-pool.entity';
import { EventStaffPoolDto } from '../../shared/dtos/event-staff-pool.dto';
import { EventsStaffPoolService } from '../../database/events/events-staff-pool.service';
import { AuthService } from '../../auth/auth.service';

@Controller('events/staff-pool')
export class EventsStaffPoolController {
  constructor(private readonly eventStaffPoolService: EventsStaffPoolService, private authService: AuthService) {}

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('/:organizationId/:eventId')
  async getStaffPollByOrganizationAndEvent(
    @Param('organizationId') organizationId: number,
    @Param('eventId') eventId: number,
    @Request() req: any,
  ): Promise<EventStaffPoolEntity[]> {
    await this.authService.checkOrganizationAccess(organizationId, req);
    return this.eventStaffPoolService.findAllByOrganizationAndEvent(organizationId, eventId);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async addToStaffPool(@Body() dto: EventStaffPoolDto, @Request() req: any): Promise<EventStaffPoolEntity> {
    await this.authService.checkOrganizationAccess(dto.organizationId, req);
    return await this.eventStaffPoolService.addToPool(dto);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete('/:organizationId/:eventId/:memberId')
  async removeFromStaffPool(
    @Param('organizationId') organizationId: number,
    @Param('eventId') eventId: number,
    @Param('memberId') memberId: number,
    @Request() req: any,
  ): Promise<any> {
    await this.authService.checkOrganizationAccess(organizationId, req);
    return await this.eventStaffPoolService.removeFromPool(memberId, eventId);
  }
}
