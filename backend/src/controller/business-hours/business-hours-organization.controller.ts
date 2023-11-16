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
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { BusinessHoursHelperService } from './helpers/business-hours-helper.service';
import { BusinessHourReservationEntity } from '../../database/entities/business-hour-reservation.entity';
import { UsersService } from '../../database/users/users.service';
import { BusinessHourEntity } from '../../database/entities/business-hour.entity';
import { BusinessHourReservationDto } from '../../shared/dtos/business-hour-reservation.dto';

@Controller('business-hours/organization/')
export class BusinessHoursOrganizationController {
  constructor(private businessHours: BusinessHoursHelperService, private userService: UsersService) {}

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('reservation-dates/')
  public async getReservationDates(): Promise<BusinessHourEntity[]> {
    return this.businessHours.getReservationDates();
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('next/:organizationId')
  public async getNextReservations(
    @Param('organizationId') organizationId: number,
    @Request() req: any,
  ): Promise<BusinessHourReservationEntity[]> {
    await this.checkAccess(organizationId, req);
    return this.businessHours.getNextReservationsByOrganization(organizationId);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('list/:organizationId/:year')
  public async getAllReservationsOfYear(
    @Param('organizationId') organizationId: number,
    @Param('year') year: number,
    @Request() req: any,
  ): Promise<BusinessHourReservationEntity[]> {
    await this.checkAccess(organizationId, req);
    return this.businessHours.getReservationsByOrganization(organizationId, year);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: number, @Request() req: any): Promise<any> {
    const entity = await this.businessHours.getReservationById(id);
    await this.checkAccess(entity.organizationId, req);
    await this.checkTime(entity.businessHour);
    return this.businessHours.deleteReservation(id);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post('')
  public async addReservation(
    @Body() dto: BusinessHourReservationDto,
    @Request() req: any,
  ): Promise<BusinessHourReservationEntity> {
    if (dto.ownerId == 0) {
      dto.ownerId = req.user.id;
    }

    const businessHourEntity = await this.businessHours.getById(dto.businessHourId);
    await this.checkAccess(dto.organizationId, req);
    await this.checkTime(businessHourEntity);

    return this.businessHours.addReservation(dto);
  }

  @Roles(Role.Admin, Role.OrganizationManager)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put('')
  public async updateReservation(
    @Body() dto: BusinessHourReservationDto,
    @Request() req: any,
  ): Promise<BusinessHourReservationEntity> {
    const businessHourEntity = await this.businessHours.getById(dto.businessHourId);
    await this.checkAccess(dto.organizationId, req);
    await this.checkTime(businessHourEntity);

    return this.businessHours.updateReservation(dto);
  }

  private async checkAccess(organizationId: number, req: any) {
    if (req.user.roles != Role.OrganizationManager) {
      return;
    }

    const user = await this.userService.findOne(req.user.id);

    if (user == null || user.assignedOrganizationId != organizationId) {
      const errorMessage = 'access denied to organization with id ' + organizationId.toString();
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  private async checkTime(businessHour: BusinessHourEntity) {
    if (!this.businessHours.is24HoursBefore(businessHour.start)) {
      const errorMessage = "reservation action can't performed, because time limit reached";
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }
}
