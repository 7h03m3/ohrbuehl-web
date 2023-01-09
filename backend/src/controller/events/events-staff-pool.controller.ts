import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { EventStaffPoolEntity } from '../../database/entities/event-staff-pool.entity';
import { EventStaffPoolDto } from '../../shared/dtos/event-staff-pool.dto';
import { EventsStaffPoolService } from '../../database/events/events-staff-pool.service';
import { OrganizationsService } from '../../database/organizations/organizations.service';

@Controller('events/staff-pool')
export class EventsStaffPoolController {
  constructor(
    private readonly eventStaffPoolService: EventsStaffPoolService,
    private readonly organizationService: OrganizationsService,
  ) {}

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('/:organizationId')
  async getStaffPollByOrganization(
    @Param('organizationId') organizationId: number,
    @Request() req: any,
  ): Promise<EventStaffPoolEntity[]> {
    await this.checkStaffPoolAccess(organizationId, req);
    return this.eventStaffPoolService.findAllByOrganization(organizationId);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('/:organizationId/:eventId')
  async getStaffPollByOrganizationAndEvent(
    @Param('organizationId') organizationId: number,
    @Param('eventId') eventId: number,
    @Request() req: any,
  ): Promise<EventStaffPoolEntity[]> {
    await this.checkStaffPoolAccess(organizationId, req);
    return this.eventStaffPoolService.findAllByOrganizationAndEvent(organizationId, eventId);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async addToStaffPool(@Body() dto: EventStaffPoolDto, @Request() req: any): Promise<EventStaffPoolEntity> {
    await this.checkStaffPoolAccess(dto.organizationId, req);
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
    await this.checkStaffPoolAccess(organizationId, req);
    return await this.eventStaffPoolService.removeFromPool(memberId, eventId);
  }

  private async checkStaffPoolAccess(organizationId: number, req: any) {
    if (req.user.roles != Role.OrganizationManager) {
      return;
    }

    const organization = await this.organizationService.findOne(organizationId);

    if (organization == null || organization.managerId != req.user.id) {
      const errorMessage = 'not allowed to access organization with user id ' + req.user.id;
      throw new HttpException(errorMessage, HttpStatus.FORBIDDEN);
    }
  }
}
