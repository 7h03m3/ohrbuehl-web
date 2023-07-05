import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BusinessHoursService } from '../../database/business-hours/business-hours.service';
import { BusinessHoursReservationService } from '../../database/business-hours/business-hours-reservation.service';
import { BusinessHoursConfigService } from './helpers/business-hours-config.service';
import { BusinessHourEntity } from '../../database/entities/business-hour.entity';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { BusinessHoursDto } from '../../shared/dtos/business-hours.dto';
import { BusinessHoursCreateDto } from '../../shared/dtos/business-hours-create.dto';
import { BusinessHourReservationDto } from '../../shared/dtos/business-hour-reservation.dto';
import { BusinessHourReservationEntity } from '../../database/entities/business-hour-reservation.entity';
import { UsersService } from '../../database/users/users.service';
import { UserEntity } from '../../database/entities/user.entity';
import { OrganizationsService } from '../../database/organizations/organizations.service';
import { OrganizationEntity } from '../../database/entities/organization.entity';
import { ReservationFacilityType } from '../../shared/enums/reservation-facility-type.enum';
import { BusinessHourOccupancyEntity } from '../../database/entities/business-hour-occupancy.entity';

@Controller('business-hours/admin/')
export class BusinessHoursAdminController {
  constructor(
    private businessHoursService: BusinessHoursService,
    private reservationService: BusinessHoursReservationService,
    private userService: UsersService,
    private organizationService: OrganizationsService,
    private config: BusinessHoursConfigService,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get()
  public async getAll(): Promise<BusinessHourEntity[]> {
    return this.businessHoursService.getAll();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  public async create(@Body() dto: BusinessHoursCreateDto): Promise<BusinessHourEntity> {
    const entity = new BusinessHourEntity();
    entity.fillFromDto(dto);
    this.config.fillInMaxOccupancy(entity);
    return await this.businessHoursService.create(entity);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  public async update(@Body() dto: BusinessHoursDto): Promise<BusinessHourEntity> {
    const entity = await this.getById(dto.id);
    entity.fillFromDto(dto);

    return this.businessHoursService.update(entity);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<any> {
    return this.businessHoursService.deleteById(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post('reservation/')
  public async addReservation(@Body() dto: BusinessHourReservationDto): Promise<BusinessHourReservationEntity> {
    const businessHourEntity = await this.getById(dto.businessHourId);
    const userEntity = await this.getUserById(dto.ownerId);
    const organizationEntity = dto.organizationId != 0 ? await this.getOrganizationById(dto.organizationId) : null;

    await this.incrementOccupancy(dto.facilityType, dto.count, businessHourEntity);

    const entity = new BusinessHourReservationEntity();
    entity.fillFromDto(dto);

    await this.reservationService.add(entity);
    return entity;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete('reservation/:id')
  public async deleteReservation(@Param('id') id: number): Promise<any> {
    return this.reservationService.deleteById(id);
  }

  private async getById(id: number): Promise<BusinessHourEntity> {
    const entity = await this.businessHoursService.getById(id);
    if (!entity) {
      const errorMessage = 'business hours with id ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return entity;
  }

  private async getUserById(id: number): Promise<UserEntity> {
    const entity = await this.userService.findOne(id);
    if (!entity) {
      const errorMessage = 'user with id ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return entity;
  }

  private async getOrganizationById(id: number): Promise<OrganizationEntity> {
    const entity = await this.organizationService.findOne(id);
    if (!entity) {
      const errorMessage = 'organization with id ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return entity;
  }

  private async incrementOccupancy(type: ReservationFacilityType, count: number, businessHours: BusinessHourEntity) {
    const occupancy = this.getOccupancy(type, businessHours);
    occupancy.current += count;

    if (occupancy.current > occupancy.max) {
      const errorMessage =
        'occupancy ' +
        occupancy.current +
        ' is greater than ' +
        occupancy.max +
        ' of business hour with id ' +
        businessHours.id;
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    await this.businessHoursService.update(businessHours);
  }

  private getOccupancy(type: ReservationFacilityType, businessHours: BusinessHourEntity): BusinessHourOccupancyEntity {
    switch (type) {
      case ReservationFacilityType.Distance25mBlockManuel:
        return businessHours.distance25mBlockManualOccupancy;
      case ReservationFacilityType.Distance25mBlockElectronic:
        return businessHours.distance25mBlockElectronicOccupancy;
      case ReservationFacilityType.Distance50mManuel:
        return businessHours.distance50mManualOccupancy;
      case ReservationFacilityType.Distance50mElectronic:
        return businessHours.distance50mElectronicOccupancy;
      case ReservationFacilityType.Distance100m:
        return businessHours.distance100mOccupancy;
      case ReservationFacilityType.Distance300m:
        return businessHours.distance300mOccupancy;
      default:
        const errorMessage = 'unknown reservation type: ' + type;
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
        break;
    }
  }
}
