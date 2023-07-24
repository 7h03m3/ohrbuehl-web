import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BusinessHourEntity } from '../../../database/entities/business-hour.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { BusinessHourReservationEntity } from '../../../database/entities/business-hour-reservation.entity';
import { OrganizationEntity } from '../../../database/entities/organization.entity';
import { BusinessHoursService } from '../../../database/business-hours/business-hours.service';
import { BusinessHoursReservationService } from '../../../database/business-hours/business-hours-reservation.service';
import { UsersService } from '../../../database/users/users.service';
import { OrganizationsService } from '../../../database/organizations/organizations.service';
import { BusinessHoursConfigService } from './business-hours-config.service';
import { BusinessHoursCreateDto } from '../../../shared/dtos/business-hours-create.dto';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { ReservationFacilityType } from '../../../shared/enums/reservation-facility-type.enum';
import { BusinessHourOccupancyEntity } from '../../../database/entities/business-hour-occupancy.entity';

@Injectable()
export class BusinessHoursHelperService {
  constructor(
    private businessHoursService: BusinessHoursService,
    private reservationService: BusinessHoursReservationService,
    private userService: UsersService,
    private organizationService: OrganizationsService,
    private config: BusinessHoursConfigService,
  ) {}

  public async getAllOfYear(year: number): Promise<BusinessHourEntity[]> {
    return this.businessHoursService.getAllOfYear(year);
  }

  public async getAllOfDay(time: number): Promise<BusinessHourEntity[]> {
    return this.businessHoursService.getAllOfDay(time);
  }

  public async getById(id: number): Promise<BusinessHourEntity> {
    return this.businessHoursService.getById(id);
  }

  public async create(dto: BusinessHoursCreateDto): Promise<BusinessHourEntity> {
    const entity = new BusinessHourEntity();
    entity.fillFromDto(dto);
    this.config.fillInMaxOccupancy(entity);
    return await this.businessHoursService.create(entity);
  }

  public async update(dto: BusinessHoursDto): Promise<BusinessHourEntity> {
    const entity = await this.getBusinessHourById(dto.id);
    entity.fillFromDto(dto);

    return this.businessHoursService.update(entity);
  }

  public async delete(id: number): Promise<any> {
    await this.reservationService.deleteByBusinessHours(id);
    return this.businessHoursService.deleteById(id);
  }

  public async addReservation(dto: BusinessHourReservationDto): Promise<BusinessHourReservationEntity> {
    const businessHourEntity = await this.getBusinessHourById(dto.businessHourId);
    const userEntity = await this.getUserById(dto.ownerId);
    const organizationEntity = dto.organizationId != 0 ? await this.getOrganizationById(dto.organizationId) : null;

    if (!businessHourEntity.enableReservation) {
      const errorMessage = 'reservations not enable of business hour with id ' + businessHourEntity.id.toString();
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    this.incrementOccupancy(dto.facilityType, dto.count, businessHourEntity);
    await this.businessHoursService.update(businessHourEntity);

    const entity = new BusinessHourReservationEntity();
    entity.fillFromDto(dto);

    await this.reservationService.add(entity);
    return entity;
  }

  public async updateReservation(dto: BusinessHourReservationDto): Promise<BusinessHourReservationEntity> {
    const entity = await this.getReservationById(dto.id);

    if (entity.locked) {
      const errorMessage = 'entity with id ' + entity.id.toString() + ' is locked';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const businessHourEntity = await this.getBusinessHourById(entity.businessHourId);
    this.decrementOccupancy(entity.facilityType, entity.count, businessHourEntity);
    entity.fillFromDto(dto);
    this.incrementOccupancy(entity.facilityType, entity.count, businessHourEntity);
    await this.businessHoursService.update(businessHourEntity);

    return this.reservationService.update(entity);
  }

  public async deleteReservation(id: number): Promise<any> {
    const entity = await this.getReservationById(id);

    if (entity.locked) {
      const errorMessage = 'entity with id ' + entity.id.toString() + ' is locked';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const businessHourEntity = await this.getBusinessHourById(entity.businessHourId);
    this.decrementOccupancy(entity.facilityType, entity.count, businessHourEntity);
    await this.businessHoursService.update(businessHourEntity);

    return this.reservationService.deleteById(id);
  }

  public async setReservationLock(id: number, isLocked: boolean): Promise<BusinessHourReservationEntity> {
    const entity = await this.getReservationById(id);
    entity.locked = isLocked;
    return this.reservationService.update(entity);
  }

  private incrementOccupancy(type: ReservationFacilityType, count: number, businessHours: BusinessHourEntity) {
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
  }

  private decrementOccupancy(type: ReservationFacilityType, count: number, businessHours: BusinessHourEntity) {
    const occupancy = this.getOccupancy(type, businessHours);
    occupancy.current -= count;
    if (occupancy.current < 0) {
      occupancy.current = 0;
    }
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

  private async getBusinessHourById(id: number): Promise<BusinessHourEntity> {
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

  private async getReservationById(id: number): Promise<BusinessHourReservationEntity> {
    const entity = await this.reservationService.getById(id);

    if (!entity) {
      const errorMessage = 'business hours reservation with id ' + id.toString() + ' not found';
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
}
