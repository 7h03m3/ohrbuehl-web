import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { BusinessHourEntity } from '../../database/entities/business-hour.entity';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { BusinessHoursDto } from '../../shared/dtos/business-hours.dto';
import { BusinessHoursCreateDto } from '../../shared/dtos/business-hours-create.dto';
import { BusinessHourReservationDto } from '../../shared/dtos/business-hour-reservation.dto';
import { BusinessHourReservationEntity } from '../../database/entities/business-hour-reservation.entity';
import { BusinessHoursHelperService } from './helpers/business-hours-helper.service';

@Controller('business-hours/admin/')
export class BusinessHoursAdminController {
  constructor(private businessHours: BusinessHoursHelperService) {}

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('list/:year')
  public async getAllOfYear(@Param('year') year: number): Promise<BusinessHourEntity[]> {
    return this.businessHours.getAllOfYear(year);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('list/dates/:year')
  public async getAllDatesOfYear(@Param('year') year: number): Promise<number[]> {
    return this.businessHours.getAllDatesOfYear(year);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('list/day/:time')
  public async getAllOfDay(@Param('time') time: number): Promise<BusinessHourEntity[]> {
    return this.businessHours.getAllOfDay(+time);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get(':id')
  public async getById(@Param('id') id: number): Promise<BusinessHourEntity> {
    return this.businessHours.getById(id);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  public async create(@Body() dto: BusinessHoursCreateDto): Promise<BusinessHourEntity> {
    return this.businessHours.create(dto);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  public async update(@Body() dto: BusinessHoursDto): Promise<BusinessHourEntity> {
    return this.businessHours.update(dto);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put('maxOccupancy/')
  public async updateMaxOccupancy(@Body() dto: BusinessHoursDto): Promise<BusinessHourEntity> {
    return this.businessHours.updateMaxOccupancy(dto);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<any> {
    return this.businessHours.delete(id);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post('reservation/')
  public async addReservation(
    @Body() dto: BusinessHourReservationDto,
    @Request() req: any,
  ): Promise<BusinessHourReservationEntity> {
    if (dto.ownerId == 0) {
      dto.ownerId = req.user.id;
    }

    return this.businessHours.addReservation(dto);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put('reservation/')
  public async updateReservation(@Body() dto: BusinessHourReservationDto): Promise<BusinessHourReservationEntity> {
    return this.businessHours.updateReservation(dto);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete('reservation/:id')
  public async deleteReservation(@Param('id') id: number): Promise<any> {
    return this.businessHours.deleteReservation(id);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.EventOrganizer)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put('reservation/lock/')
  public async lockReservation(@Body() dto: BusinessHourReservationDto): Promise<BusinessHourReservationEntity> {
    return this.businessHours.setReservationLock(dto.id, dto.locked);
  }
}
